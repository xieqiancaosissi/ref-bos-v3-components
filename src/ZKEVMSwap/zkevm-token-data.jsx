const { tokenId, coinGeckoTokenId } = props;

const accountId = context.accountId;
const debug = props.debug ?? false;

const NETWORK_ETH = "ETH";
const NETWORK_ZKSYNC = "ZKSYNC";
const NETWORK_ZKEVM = "ZKEVM";
const NETWORK_AURORA = "AURORA";
const NETWORK_POLYGON = "POLYGON";

const network = NETWORK_ZKEVM;

if (!tokenId) return;

// ETH *******************************
const getErc20Balance = (tokenId, receiver) => {
  const iface = new ethers.utils.Interface(state.erc20Abi);

  // find out token decimals
  const encodedTokenDecimalsData = iface.encodeFunctionData("decimals", []);

  return Ethers.provider()
    .call({
      to: tokenId,
      data: encodedTokenDecimalsData,
    })
    .then((tokenDecimalsHex) => {
      const tokenDecimals = iface.decodeFunctionResult(
        "decimals",
        tokenDecimalsHex
      );

      // find out token balance
      const encodedBalanceData = iface.encodeFunctionData("balanceOf", [
        receiver,
      ]);

      return Ethers.provider()
        .call({
          to: tokenId,
          data: encodedBalanceData,
        })
        .then((rawBalance) => {
          const receiverBalanceHex = iface.decodeFunctionResult(
            "balanceOf",
            rawBalance
          );

          return {
            decimals: tokenDecimals[0],
            balance: Big(receiverBalanceHex).toFixed(),
          };
        });
    });
};

const getErc20Tokendata = (tokenId) => {
  let dataUrl = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${tokenId}`;
  if (network === NETWORK_AURORA) {
    dataUrl = `https://api.coingecko.com/api/v3/coins/aurora/contract/${tokenId}`;
  }
  const data = fetch(dataUrl);
  console.log("datatokenData111111: ", data);
  if (!data.ok) {
    return "Loading";
  }

  const tokenData = data.body;
  console.log("tokenData111111: ", tokenId, tokenData);
  const metadata = {
    name: tokenData.name,
    symbol: tokenData.symbol,
    icon: tokenData.image.small,
  };

  const price = Number(tokenData.market_data.current_price.usd);

  return { metadata, price };
};

if (state.ethAccountId === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ ethAccountId: accounts[0] });
  }
}

if (state.erc20Abi === undefined) {
  const erc20Abi = fetch(
    "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
  );
  if (!erc20Abi.ok) {
    return "Loading";
  }

  State.update({ erc20Abi: erc20Abi.body });
}

if (state.ethAccountId && state.erc20Abi) {
  getErc20Balance(tokenId, state.ethAccountId).then(({ decimals, balance }) => {
    if (balance !== undefined && balance !== null) {
      State.update({ balance });
    }

    // save decimals to metadata if it is already exists
    if (state.metadata !== undefined) {
      const metadata = state.metadata;
      console.log("metadata: ", metadata);
      metadata.decimals = decimals;
      State.update({ metadata });
    }

    // temp value to update metadata after the coingecko responce
    State.update({ tokenDecimals: decimals });
  });

  let tokenIdForCoingeckoAPI;
  if ([NETWORK_ZKSYNC, NETWORK_ZKEVM, NETWORK_POLYGON].includes(network)) {
    tokenIdForCoingeckoAPI = coinGeckoTokenId;
    console.log("coinGeckoTokenId: ", tokenId, coinGeckoTokenId);
  }

  const { metadata, price } = getErc20Tokendata(tokenIdForCoingeckoAPI);

  if (state.tokenDecimals && metadata && !metadata.decimals) {
    metadata.decimals = state.tokenDecimals;
  }
  State.update({ metadata, price });
}

console.log("state token data", { state }, tokenId);

if (
  state.balance !== undefined &&
  state.balance !== null &&
  state.metadata !== undefined &&
  state.price !== undefined
) {
  const res = {
    balance: state.balance,
    balance_hr: new Big(state?.balance ?? 0)
      .div(new Big(10).pow(state?.metadata?.decimals ?? 1))
      .toFixed(4),
    balance_hr_full: new Big(state?.balance ?? 0)
      .div(new Big(10).pow(state?.metadata?.decimals ?? 1))
      .toFixed(),
    price: state.price,
    metadata: state.metadata,
  };

  if (typeof props.onLoad === "function") {
    props.onLoad(res);
  }
}

return <div />;
