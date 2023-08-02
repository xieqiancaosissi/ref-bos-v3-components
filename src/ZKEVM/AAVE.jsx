const ROUND_DOWN = 0;
const CONTRACT_ABI = {
  wrappedTokenGatewayV3ABI:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/WrappedTokenGatewayV3ABI.json",
  erc20Abi:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/ERC20Permit.json",
  aavePoolV3ABI:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/AAVEPoolV3.json",
  variableDebtTokenABI:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/VariableDebtToken.json",
  walletBalanceProviderABI:
    "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/WalletBalanceProvider.json",
};
const DEFAULT_CHAIN_ID = 1;
const NATIVE_SYMBOL_ADDRESS_MAP_KEY = "0x0";
const ETH_TOKEN = { name: "Ethereum", symbol: "ETH", decimals: 18 };
const WETH_TOKEN = { name: "Wrapped Ether", symbol: "WETH", decimals: 18 };
const MATIC_TOKEN = { name: "Matic", symbol: "MATIC", decimals: 18 };
const WMATIC_TOKEN = { name: "Wrapped Matic", symbol: "WMATIC", decimals: 18 };
const ACTUAL_BORROW_AMOUNT_RATE = 0.99;

// Get AAVE network config by chain id
function getNetworkConfig(chainId) {
  const abis = {
    wrappedTokenGatewayV3ABI: fetch(CONTRACT_ABI.wrappedTokenGatewayV3ABI),
    erc20Abi: fetch(CONTRACT_ABI.erc20Abi),
    aavePoolV3ABI: fetch(CONTRACT_ABI.aavePoolV3ABI),
    variableDebtTokenABI: fetch(CONTRACT_ABI.variableDebtTokenABI),
    walletBalanceProviderABI: fetch(CONTRACT_ABI.walletBalanceProviderABI),
  };

  const constants = {
    FIXED_LIQUIDATION_VALUE: "1.0",
    MAX_UINT_256:
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    AAVE_API_BASE_URL: "https://aave-api.pages.dev",
  };

  switch (chainId) {
    case 1: // ethereum mainnet
      return {
        chainName: "Ethereum Mainnet",
        nativeCurrency: ETH_TOKEN,
        nativeWrapCurrency: WETH_TOKEN,
        rpcUrl: "https://rpc.ankr.com/eth",
        aavePoolV3Address: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
        wrappedTokenGatewayV3Address:
          "0xD322A49006FC828F9B5B37Ab215F99B4E5caB19C",
        balanceProviderAddress: "0xC7be5307ba715ce89b152f3Df0658295b3dbA8E2",
        ...abis,
        ...constants,
      };
    case 42161: // arbitrum one
      return {
        chainName: "Arbitrum Mainnet",
        nativeCurrency: ETH_TOKEN,
        nativeWrapCurrency: WETH_TOKEN,
        rpcUrl: "https://arb1.arbitrum.io/rpc",
        aavePoolV3Address: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        wrappedTokenGatewayV3Address:
          "0xB5Ee21786D28c5Ba61661550879475976B707099",
        balanceProviderAddress: "0xBc790382B3686abffE4be14A030A96aC6154023a",
        ...abis,
        ...constants,
      };
    case 137: // polygon mainnet
      return {
        chainName: "Polygon Mainnet",
        nativeCurrency: MATIC_TOKEN,
        nativeWrapCurrency: WMATIC_TOKEN,
        rpcUrl: "https://rpc.ankr.com/polygon",
        aavePoolV3Address: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        wrappedTokenGatewayV3Address:
          "0x1e4b7A6b903680eab0c5dAbcb8fD429cD2a9598c",
        balanceProviderAddress: "0xBc790382B3686abffE4be14A030A96aC6154023a",
        ...abis,
        ...constants,
      };
    case 1442: // zkevm testnet
      return {
        chainName: "Polygon zkEVM Testnet",
        nativeCurrency: ETH_TOKEN,
        nativeWrapCurrency: WETH_TOKEN,
        rpcUrl: "https://rpc.public.zkevm-test.net",
        aavePoolV3Address: "0x4412c92f6579D9FC542D108382c8D1d6D2Be63d9",
        wrappedTokenGatewayV3Address:
          "0xD82940E16D25aB1349914e1C369eF1b287d457BF",
        balanceProviderAddress: "0x0da6DCAd2bE4801b644AEE679e0AdE008bB4bc6b",
        ...abis,
        ...constants,
      };
    default:
      throw new Error("unknown chain id");
  }
}

function switchEthereumChain(chainId) {
  const chainIdHex = `0x${chainId.toString(16)}`;
  const res = Ethers.send("wallet_switchEthereumChain", [
    { chainId: chainIdHex },
  ]);
  // If `res` === `undefined`, it means switch chain failed, which is very weird but it works.
  // If `res` is `null` the function is either not called or executed successfully.
  if (res === undefined) {
    console.log(
      `Failed to switch chain to ${chainId}. Add the chain to wallet`
    );
    const config = getNetworkConfig(chainId);
    Ethers.send("wallet_addEthereumChain", [
      {
        chainId: chainIdHex,
        chainName: config.chainName,
        nativeCurrency: config.nativeCurrency,
        rpcUrls: [config.rpcUrl],
      },
    ]);
  }
}

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((data) => {
      const chainId = data?.chainId;
      const config = getNetworkConfig(chainId);
      if (!config) {
        console.log(`Unsupport chain, chainId: ${chainId}`);
        State.update({ isChainSupported: false });
        switchEthereumChain(DEFAULT_CHAIN_ID);
      } else {
        State.update({ chainId, isChainSupported: true });
      }
    });
}

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

const GAS_LIMIT_RECOMMENDATIONS = {
  default: {
    limit: "210000",
    recommended: "210000",
  },
  approval: {
    limit: "65000",
    recommended: "65000",
  },
  creditDelegationApproval: {
    limit: "55000",
    recommended: "55000",
  },
  supply: {
    limit: "300000",
    recommended: "300000",
  },
  deposit: {
    limit: "300000",
    recommended: "300000",
  },
  borrow: {
    limit: "400000",
    recommended: "400000",
  },
  withdraw: {
    limit: "230000",
    recommended: "300000",
  },
  liquidationCall: {
    limit: "700000",
    recommended: "700000",
  },
  liquidationFlash: {
    limit: "995000",
    recommended: "995000",
  },
  repay: {
    limit: "300000",
    recommended: "300000",
  },
  borrowETH: {
    limit: "450000",
    recommended: "450000",
  },
  withdrawETH: {
    limit: "640000",
    recommended: "640000",
  },
  swapCollateral: {
    limit: "1000000",
    recommended: "1000000",
  },
  repayCollateral: {
    limit: "700000",
    recommended: "700000",
  },
  migrateV3: {
    limit: "700000",
    recommended: "700000",
  },
  supplyWithPermit: {
    limit: "350000",
    recommended: "350000",
  },
  repayWithPermit: {
    limit: "350000",
    recommended: "350000",
  },
  vote: {
    limit: "125000",
    recommended: "125000",
  },
  stake: {
    limit: "395000",
    recommended: "395000",
  },
  claimRewards: {
    limit: "275000",
    recommended: "275000",
  },
  setUsageAsCollateral: {
    limit: "138000",
    recommended: "138000",
  },
};

function getGasPrice() {
  return Ethers.provider().getGasPrice();
}

function gasEstimation(action) {
  const assetsToSupply = state.assetsToSupply;
  if (!assetsToSupply) {
    return "-";
  }
  const baseAsset = assetsToSupply.find(
    (asset) => asset.symbol === config.nativeCurrency.symbol
  );
  if (!baseAsset) {
    return "-";
  }
  const { marketReferencePriceInUsd, decimals } = baseAsset;
  return getGasPrice().then((gasPrice) => {
    const gasLimit = GAS_LIMIT_RECOMMENDATIONS[action].limit;
    return Big(gasPrice.toString())
      .mul(gasLimit)
      .div(Big(10).pow(decimals))
      .mul(marketReferencePriceInUsd)
      .toFixed(2);
  });
}

function depositETHGas() {
  return gasEstimation("deposit");
}

function depositERC20Gas() {
  return gasEstimation("supplyWithPermit");
}

function withdrawETHGas() {
  return gasEstimation("withdrawETH");
}

function withdrawERC20Gas() {
  return gasEstimation("withdraw");
}

function borrowETHGas() {
  return gasEstimation("borrowETH");
}

function borrowERC20Gas() {
  return gasEstimation("borrow");
}

function repayETHGas() {
  return gasEstimation("repay");
}

function repayERC20Gas() {
  return gasEstimation("repayWithPermit");
}

// interface Market {
//   id: string,
//   underlyingAsset: string,
//   name: string,
//   symbol: string,
//   decimals: number,
//   supplyAPY: string;
//   marketReferencePriceInUsd: string;
//   usageAsCollateralEnabled: boolean;
//   aTokenAddress: string;
//   variableBorrowAPY: string;
// }
// returns Market[]
function getMarkets(chainId) {
  return asyncFetch(`${config.AAVE_API_BASE_URL}/${chainId}/markets`);
}

/**
 * @param {string} account user address
 * @param {string[]} tokens list of token addresses
 */
// interface TokenBalance {
//   token: string,
//   balance: string,
//   decimals: number,
// }
// returns TokenBalance[]
function getUserBalances(chainId, account, tokens) {
  const url = `${
    config.AAVE_API_BASE_URL
  }/${chainId}/balances?account=${account}&tokens=${tokens.join("|")}`;
  return asyncFetch(url);
}

// interface UserDeposit {
//   underlyingAsset: string,
//   name: string,
//   symbol: string,
//   scaledATokenBalance: string,
//   usageAsCollateralEnabledOnUser: boolean,
//   underlyingBalance: string,
//   underlyingBalanceUSD: string,
// }
// returns UserDeposit[]
function getUserDeposits(chainId, address) {
  return asyncFetch(
    `${config.AAVE_API_BASE_URL}/${chainId}/deposits/${address}`
  );
}

// interface UserDebtSummary {
//   healthFactor: string,
//   netWorthUSD: string,
//   availableBorrowsUSD: string,
//   debts: UserDebt[],
// }
// interface UserDebt {
//   underlyingAsset: string;
//   name: string;
//   symbol: string;
//   usageAsCollateralEnabledOnUser: boolean,
//   scaledVariableDebt: string,
//   variableBorrows: string,
//   variableBorrowsUSD: string,
// }
// returns UserDebtSummary
function getUserDebts(chainId, address) {
  return asyncFetch(`${config.AAVE_API_BASE_URL}/${chainId}/debts/${address}`);
}

// App config
function getConfig(network) {
  const chainId = state.chainId;
  switch (network) {
    case "mainnet":
      return {
        ownerId: "aave-v3.near",
        nodeUrl: "https://rpc.mainnet.near.org",
        ipfsPrefix: "https://ipfs.near.social/ipfs",
        ...(chainId ? getNetworkConfig(chainId) : {}),
      };
    case "testnet":
      return {
        ownerId: "aave-v3.testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        ipfsPrefix: "https://ipfs.near.social/ipfs",
        ...(chainId ? getNetworkConfig(chainId) : {}),
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);

// App states
State.init({
  imports: {},
  chainId: undefined, // chainId is undefined in the case of unsupported chains
  isChainSupported: true,
  showWithdrawModal: false,
  showSupplyModal: false,
  showRepayModal: false,
  showBorrowModal: false,
  walletConnected: false,
  assetsToSupply: undefined,
  yourSupplies: undefined,
  assetsToBorrow: undefined,
  yourBorrows: undefined,
  address: undefined,
  baseAssetBalance: undefined,
  selectTab: "supply", // supply | borrow
});

const loading =
  !state.assetsToSupply || !state.yourSupplies || !state.assetsToBorrow;

// Import functions to state.imports
function importFunctions(imports) {
  if (loading) {
    State.update({
      imports,
    });
  }
}

// Define the modules you'd like to import
const modules = {
  number: `${config.ownerId}/widget/Utils.Number`,
  date: `${config.ownerId}/widget/Utils.Date`,
  data: `${config.ownerId}/widget/AAVE.Data`,
};
// Import functions
// const { formatAmount } = state.imports.number;
// const { formatDateTime } = state.imports.date;

function checkProvider() {
  const provider = Ethers.provider();
  if (provider) {
    State.update({ walletConnected: true });
  } else {
    State.update({ walletConnected: false });
  }
}

function calculateAvailableBorrows({
  availableBorrowsUSD,
  marketReferencePriceInUsd,
}) {
  return isValid(availableBorrowsUSD) && isValid(marketReferencePriceInUsd)
    ? Big(availableBorrowsUSD).div(marketReferencePriceInUsd).toFixed()
    : Number(0).toFixed();
}

function bigMin(_a, _b) {
  const a = Big(_a);
  const b = Big(_b);
  return a.gt(b) ? b : a;
}

function formatHealthFactor(healthFactor) {
  if (healthFactor === "∞") return healthFactor;
  if (!healthFactor || !isValid(healthFactor)) return "-";
  if (Number(healthFactor) === -1) return "∞";
  return Big(healthFactor).toFixed(2, ROUND_DOWN);
}

function batchBalanceOf(chainId, userAddress, tokenAddresses, abi) {
  const balanceProvider = new ethers.Contract(
    config.balanceProviderAddress,
    abi.body,
    Ethers.provider().getSigner()
  );

  return balanceProvider.batchBalanceOf([userAddress], tokenAddresses);
}

// update data in async manner
function updateData(refresh) {
  // check abi loaded
  if (
    Object.keys(CONTRACT_ABI)
      .map((key) => config[key])
      .filter((ele) => !!ele).length !== Object.keys(CONTRACT_ABI).length
  ) {
    return;
  }
  const provider = Ethers.provider();
  if (!provider) {
    return;
  }
  provider
    .getSigner()
    ?.getAddress()
    ?.then((address) => {
      State.update({ address });
    });
  provider
    .getSigner()
    ?.getBalance()
    .then((balance) => State.update({ baseAssetBalance: balance }));
  if (!state.address || !state.baseAssetBalance) {
    return;
  }

  getMarkets(state.chainId).then((marketsResponse) => {
    if (!marketsResponse) {
      return;
    }
    const markets = marketsResponse.body;
    const marketsMapping = markets.reduce((prev, cur) => {
      prev[cur.underlyingAsset] = cur;
      return prev;
    }, {});

    const nativeMarket = markets.find(
      (market) => market.symbol === config.nativeWrapCurrency.symbol
    );
    markets.push({
      ...nativeMarket,
      ...{
        ...config.nativeCurrency,
        supportPermit: true,
      },
    });

    // get user balances
    batchBalanceOf(
      state.chainId,
      state.address,
      markets.map((market) => market.underlyingAsset),
      config.walletBalanceProviderABI
    )
      .then((balances) => balances.map((balance) => balance.toString()))
      .then((userBalances) => {
        const assetsToSupply = markets
          .map((market, idx) => {
            const balanceRaw = Big(
              market.symbol === config.nativeCurrency.symbol
                ? state.baseAssetBalance
                : userBalances[idx]
            ).div(Big(10).pow(market.decimals));
            const balance = balanceRaw.toFixed(market.decimals, ROUND_DOWN);
            const balanceInUSD = balanceRaw
              .mul(market.marketReferencePriceInUsd)
              .toFixed(3, ROUND_DOWN);
            return {
              ...market,
              balance,
              balanceInUSD,
            };
          })
          .sort((asset1, asset2) => {
            const balanceInUSD1 = Number(asset1.balanceInUSD);
            const balanceInUSD2 = Number(asset2.balanceInUSD);
            if (balanceInUSD1 !== balanceInUSD2)
              return balanceInUSD2 - balanceInUSD1;
            return asset1.symbol.localeCompare(asset2.symbol);
          });

        State.update({
          assetsToSupply,
        });
        // get user borrow data
        updateUserDebts(marketsMapping, assetsToSupply, refresh);
      });
    // get user supplies
    updateUserSupplies(marketsMapping, refresh);
  });
}

function updateUserSupplies(marketsMapping, refresh) {
  const prevYourSupplies = state.yourSupplies;
  getUserDeposits(state.chainId, state.address).then((userDepositsResponse) => {
    if (!userDepositsResponse) {
      return;
    }
    const userDeposits = userDepositsResponse.body.filter(
      (row) => Number(row.underlyingBalance) !== 0
    );
    const yourSupplies = userDeposits.map((userDeposit) => {
      const market = marketsMapping[userDeposit.underlyingAsset];
      return {
        ...market,
        ...userDeposit,
        ...(market.symbol === config.nativeWrapCurrency.symbol
          ? {
              ...config.nativeCurrency,
              supportPermit: true,
            }
          : {}),
      };
    });

    State.update({
      yourSupplies,
    });

    if (
      refresh &&
      JSON.stringify(prevYourSupplies) === JSON.stringify(yourSupplies) &&
      yourSupplies.length !== 0
    ) {
      console.log("refresh supplies again ...", prevYourSupplies, yourSupplies);
      setTimeout(updateData, 500);
    }
  });
}

function updateUserDebts(marketsMapping, assetsToSupply, refresh) {
  if (!marketsMapping || !assetsToSupply) {
    return;
  }

  const prevYourBorrows = state.yourBorrows;
  // userDebts depends on the balance from assetsToSupply
  const assetsToSupplyMap = assetsToSupply.reduce((prev, cur) => {
    if (cur.symbol !== config.nativeCurrency.symbol) {
      prev[cur.underlyingAsset] = cur;
    } else {
      prev[NATIVE_SYMBOL_ADDRESS_MAP_KEY] = cur;
    }
    return prev;
  }, {});

  getUserDebts(state.chainId, state.address).then((userDebtsResponse) => {
    if (!userDebtsResponse) {
      return;
    }
    const userDebts = userDebtsResponse.body;
    const assetsToBorrow = {
      ...userDebts,
      healthFactor: formatHealthFactor(userDebts.healthFactor),
      debts: userDebts.debts
        .map((userDebt) => {
          const market = marketsMapping[userDebt.underlyingAsset];
          if (!market) {
            return;
          }
          const { availableLiquidityUSD } = market;
          const availableBorrowsUSD = bigMin(
            userDebts.availableBorrowsUSD,
            availableLiquidityUSD
          )
            .times(ACTUAL_BORROW_AMOUNT_RATE)
            .toFixed();
          const assetsToSupplyMapKey =
            market.symbol === config.nativeWrapCurrency.symbol
              ? NATIVE_SYMBOL_ADDRESS_MAP_KEY
              : userDebt.underlyingAsset;
          return {
            ...market,
            ...userDebt,
            ...(market.symbol === config.nativeWrapCurrency.symbol
              ? {
                  ...config.nativeCurrency,
                  supportPermit: true,
                }
              : {}),
            availableBorrows: calculateAvailableBorrows({
              availableBorrowsUSD,
              marketReferencePriceInUsd: market.marketReferencePriceInUsd,
            }),
            availableBorrowsUSD,
            balance: assetsToSupplyMap[assetsToSupplyMapKey].balance,
            balanceInUSD: assetsToSupplyMap[assetsToSupplyMapKey].balanceInUSD,
          };
        })
        .filter((asset) => !!asset)
        .sort((asset1, asset2) => {
          const availableBorrowsUSD1 = Number(asset1.availableBorrowsUSD);
          const availableBorrowsUSD2 = Number(asset2.availableBorrowsUSD);
          if (availableBorrowsUSD1 !== availableBorrowsUSD2)
            return availableBorrowsUSD2 - availableBorrowsUSD1;
          return asset1.symbol.localeCompare(asset2.symbol);
        })
        .filter((asset) => {
          return asset.borrowingEnabled;
        }),
    };
    const yourBorrows = {
      ...assetsToBorrow,
      debts: assetsToBorrow.debts.filter(
        (row) =>
          !isNaN(Number(row.variableBorrowsUSD)) &&
          Number(row.variableBorrowsUSD) > 0
      ),
    };

    State.update({
      yourBorrows,
      assetsToBorrow,
    });

    if (
      refresh &&
      JSON.stringify(prevYourBorrows) === JSON.stringify(yourBorrows)
    ) {
      console.log("refresh borrows again ...", prevYourBorrows, yourBorrows);
      setTimeout(updateData, 500);
    }
  });
}

function onActionSuccess({ msg, callback }) {
  // update data if action finishes
  updateData(true);
  // update UI after data has almost loaded
  setTimeout(() => {
    if (callback) {
      callback();
    }
    if (msg) {
      State.update({ alertModalText: msg });
    }
  }, 5000);
}

checkProvider();
if (state.walletConnected && state.chainId && loading) {
  updateData();
}

const Body = styled.div`
  padding: 24px 15px;
  min-height: 100vh;
  color: white;
  .load{
    margin-top:50%;
    transform:translateY(-50%);
  } 
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AAVEContainer = styled.div`
  width:750px;
  margin:0 auto;
  padding-bottom:50px;
  .tip{
    position:absolute;
    left:0;
    right:0;
    bottom:0;
  }
`;
// Component body
const body = loading ? (
  <>
    <Body>
        <div className="load">
          <Widget
            src={`guessme.near/widget/ZKEVM.AAVE.Loader`}
            props={{
              walletConnected: state.walletConnected,
              isChainSupported: state.isChainSupported,
              chainId: state.chainId,
              DEFAULT_CHAIN_ID,
              getNetworkConfig,
            }}
          />
        </div>
    </Body>
  </>
) : (
  <>
    <Body>
    <Widget
          src={`guessme.near/widget/ZKEVM.AAVE.NetworkSwitcher`}
          props={{
            chainId: state.chainId,
            config,
            switchNetwork: (chainId) => {
              switchEthereumChain(chainId);
            },
          }}
        />
      <TopContainer>
        <Widget
          src={`guessme.near/widget/ZKEVM.AAVE.HeroData`}
          props={{
            config,
            netWorth: `$ ${
              state.assetsToBorrow?.netWorthUSD
                ? Big(state.assetsToBorrow.netWorthUSD).toFixed(2)
                : "-"
            }`,
            netApy: `${
              state.assetsToBorrow?.netAPY
                ? Number(
                    Big(state.assetsToBorrow.netAPY).times(100).toFixed(2)
                  ) === 0
                  ? "0.00"
                  : Big(state.assetsToBorrow.netAPY).times(100).toFixed(2)
                : "-"
            }%`,
            healthFactor: formatHealthFactor(state.assetsToBorrow.healthFactor),
            showHealthFactor:
              state.yourBorrows &&
              state.yourBorrows.debts &&
              state.yourBorrows.debts.length > 0,
          }}
        />
        <Widget
          src={`guessme.near/widget/ZKEVM.AAVE.TabSwitcher`}
          props={{
            config,
            select: state.selectTab,
            setSelect: (tabName) => State.update({ selectTab: tabName }),
          }}
        />
      </TopContainer>
      {state.selectTab === "supply" && (
        <>
          <Widget
            src={`guessme.near/widget/ZKEVM.AAVE.Card.YourSupplies`}
            props={{
              config,
              chainId: state.chainId,
              yourSupplies: state.yourSupplies,
              showWithdrawModal: state.showWithdrawModal,
              setShowWithdrawModal: (isShow) =>
                State.update({ showWithdrawModal: isShow }),
              onActionSuccess,
              healthFactor: formatHealthFactor(
                state.assetsToBorrow.healthFactor
              ),
              formatHealthFactor,
              withdrawETHGas,
              withdrawERC20Gas,
            }}
          />
          <Widget
            src={`guessme.near/widget/ZKEVM.AAVE.Card.AssetsToSupply`}
            props={{
              config,
              chainId: state.chainId,
              assetsToSupply: state.assetsToSupply,
              showSupplyModal: state.showSupplyModal,
              setShowSupplyModal: (isShow) =>
                State.update({ showSupplyModal: isShow }),
              onActionSuccess,
              healthFactor: formatHealthFactor(
                state.assetsToBorrow.healthFactor
              ),
              formatHealthFactor,
              depositETHGas,
              depositERC20Gas,
            }}
          />
        </>
      )}
      {state.selectTab === "borrow" && (
        <>
          <Widget
            src={`guessme.near/widget/ZKEVM.AAVE.Card.YourBorrows`}
            props={{
              config,
              chainId: state.chainId,
              yourBorrows: state.yourBorrows,
              showRepayModal: state.showRepayModal,
              setShowRepayModal: (isShow) =>
                State.update({ showRepayModal: isShow }),
              showBorrowModal: state.showBorrowModal,
              setShowBorrowModal: (isShow) =>
                State.update({ showBorrowModal: isShow }),
              formatHealthFactor,
              onActionSuccess,
              repayETHGas,
              repayERC20Gas,
              borrowETHGas,
              borrowERC20Gas,
            }}
          />
          <Widget
            src={`guessme.near/widget/ZKEVM.AAVE.Card.AssetsToBorrow`}
            props={{
              config,
              chainId: state.chainId,
              assetsToBorrow: state.assetsToBorrow,
              showBorrowModal: state.showBorrowModal,
              yourSupplies: state.yourSupplies,
              setShowBorrowModal: (isShow) =>
                State.update({ showBorrowModal: isShow }),
              formatHealthFactor,
              onActionSuccess,
              borrowETHGas,
              borrowERC20Gas,
            }}
          />
        </>
      )}
      {state.alertModalText && (
        <Widget
          src={`${config.ownerId}/widget/AAVE.Modal.AlertModal`}
          props={{
            config,
            title: "All done!",
            description: state.alertModalText,
            onRequestClose: () => State.update({ alertModalText: false }),
          }}
        />
      )}
    </Body>
  </>
);

return (
  <AAVEContainer>
    {/* Component Head */}
    <Widget
      src={`${config.ownerId}/widget/Utils.Import`}
      props={{ modules, onLoad: importFunctions }}
    />
    {/* Component Body */}
    {body}
    {
      !loading ? <div className="tip"><Widget
      src={`guessme.near/widget/ZKEVM.switch_quest_card`}
    /></div>: null
    }
  </AAVEContainer>
);
