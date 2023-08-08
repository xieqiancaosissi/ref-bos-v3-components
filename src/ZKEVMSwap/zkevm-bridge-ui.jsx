const DeskLayout = styled.div`
  /* height: 100vh; */

  /* The scrollbar track */
`;

const Layout = styled.div`
  position: relative;
  width: 100%;
  background-color: #151718;
  border-radius: 10px;
  border: 1px solid #332c4b;

  color: #8c7ebd;

  background: linear-gradient(0deg, #161825, #161825),
    linear-gradient(0deg, #332c4b, #332c4b);
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
  }

  .container-button {
    position: relative;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    cursor: pointer;
  }

  .separator {
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-left: 8px;
    margin-right: 8px;
  }

  .invalid-balance-tip {
    color: #ff61d3;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    list-style: none;
    padding: 0 8px 0 8px;
    margin: 0;
    display: flex;
    flex-direction: column;
    color: #fff;

    li {
      display: flex;
      justify-content: space-between;
    }

    .value {
      color: #ba90ff;
      font-weight: 600;
    }
  }
`;

const arrowDown = (
  <svg
    width="17"
    height="9"
    viewBox="0 0 17 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L8.5 7.5L16 1"
      stroke="#8C7EBD"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const ContainerNetwork = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ArrowDownWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 18px;
`;

const NetworkList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 12px;
  width: 145px;
  background: #2d2f30;
  z-index: 10;
  box-shadow: inset 0px 0px 0px 1px #999;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 12px;
  }

  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 4px 8px 4px 4px;
    gap: 4px;
    flex: 1;
    width: 100%;
    color: #fff;

    &:hover {
      color: #ccc;
    }
  }
`;

const BridgeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  position: relative;

  width: 100%;

  background: linear-gradient(0deg, #222436, #222436),
    linear-gradient(0deg, #332c4b, #332c4b);

  border-radius: 10px;

  border: 1px solid #332c4b;

  font-style: normal;
  font-size: 16px;

  color: #ffffff;

  :hover {
    cursor: pointer;
  }

  .token-container {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const BridgeName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  line-height: 22px;
`;

const Input = styled.input`
  background: none;
  color: #fff;
  text-align: left;
  border: none;
  outline: none;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 19px;
  padding: 8px 0px 8px 8px;
  width: 100%;
  ::placeholder {
    color: #40435c;
  }
`;

const Seperator = styled.div`
  border: 1px solid #332c4b;
  height: 1px;
  width: 367px;
  position: absolute;
  bottom: 0px;
`;

const ActionButton = styled.button`
  background: #794fdd;
  border-radius: 4px;
  border: 0;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 17px;
  color: #fff;
  padding: 18px 12px;
  :disabled {
    opacity: 0.3;
  }
`;

const alertIcon = (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 1.46643e-06C26.3733 2.28587e-06 34 7.62549 34 17C34 26.3733 26.3733 34 17 34C7.62548 34 -3.0269e-06 26.3745 -2.20736e-06 17C-1.38781e-06 7.62548 7.62548 6.4688e-07 17 1.46643e-06ZM17 31.5606C25.0292 31.5606 31.5606 25.0292 31.5606 17C31.5606 8.97202 25.0292 2.43938 17 2.43938C8.97202 2.43937 2.43937 8.9708 2.43937 17C2.43937 25.0292 8.97202 31.5606 17 31.5606ZM18.8295 24.928C18.8295 24.4427 18.6368 23.9774 18.2937 23.6343C17.9506 23.2912 17.4852 23.0984 17 23.0984C16.5148 23.0984 16.0494 23.2912 15.7063 23.6343C15.3632 23.9774 15.1705 24.4427 15.1705 24.928C15.1705 25.4132 15.3632 25.8785 15.7063 26.2216C16.0494 26.5647 16.5148 26.7575 17 26.7575C17.4852 26.7575 17.9506 26.5647 18.2937 26.2216C18.6368 25.8785 18.8295 25.4132 18.8295 24.928ZM17 7.2425C17.6733 7.2425 18.2197 7.7877 18.2197 8.46219L18.2197 19.4394C18.2197 20.1126 17.6733 20.6591 17 20.6591C16.3267 20.6591 15.7803 20.1126 15.7803 19.4394L15.7803 8.46219C15.7803 7.7877 16.3267 7.2425 17 7.2425Z"
      fill="#FF61D3"
    />
  </svg>
);

const Alert = styled.div`
  position: absolute;
  color: #ff61d3;
  z-index: 120;
  padding: 8px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  width: 334px;
  top: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  left: 50%;
  text-align: center;
  transform: translate(-50%);
  background: #373a53;
  box-shadow: 0px 0px 16px 0px #00000040;
  border-radius: 16px;
  padding: 20px 20px;
  gap: 20px;

  .alert-detail {
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: center;
    color: #ffffff;
  }
  .alert-button {
    width: 268px;
    height: 60px;
    border-radius: 10px;
    background: #794fdd;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Dialog = styled.div`
  position: absolute;
  right: 32px;
  left: 32px;
  top: 25%;
  background: #2d2f30;
  z-index: 10;
  box-shadow: inset 0px 0px 0px 1px #999;
  border-radius: 12px;
  padding: 16px 8px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    color: #fff;

    &:hover {
      color: #ccc;
    }
  }

  .token {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

const DropDownContainer = styled.div`
  display: flex;
  padding: 16px 0px;
  gap: 8px;
  position: absolute;
  width: 100%;
  flex-direction: column;
  background: #373a53;
  border-radius: 16px;
  box-shadow: 0px 0px 16px 0px #00000040;
  top: 36px;
  left: 0px;
  z-index: 100;
  overflow: hidden;
  color: #ffffff;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    position: relative;
    :hover {
      background: rgba(24, 26, 39, 0.3);
    }
  }
`;

const SendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const ReceiveWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .result {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 8px;

    color: #40435c;
  }
`;

const tokens = props.tokens ?? [
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 5,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
];

const curChainTokens = tokens.filter((t) => t.chainId === props.chainId);

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      updateChainId(chainId);
    });
}

const networks = {
  1: "Ethereum Mainnet",
  5: "Ethereum Goerli",
  1101: "Polygon zkEvm",
  1442: "Polygon zkEvm Goerli",
};

const coinsMap = {
  ethereum: "ETH",
  "usd-coin": "USDC",
  "matic-network": "MATIC",
  dai: "DAI",
  uniswap: "UNI",
};

State.init({
  selectedToken: "ETH",
  isNetworkSelectOpen: 0,
  isTokenDialogOpen: false,
  amount: "",
  balances: {},
  prices: {},
  isToastOpen: false,
  add: false,
  onChangeAdd: (add) => {
    State.update({ add });
  },
});

const switchNetwork = (chainId) => {
  Ethers.provider()
    .send("wallet_switchEthereumChain", [
      { chainId: `0x${chainId.toString(16)}` },
    ])
    .catch((err) => {
      console.log("err: ", err);
      if (err.code === 4902) {
        Ethers.provider()
          .send("wallet_addEthereumChain", [walletChains[chainId]])
          .then(() => {
            Ethers.provider().send("wallet_switchEthereumChain", [
              { chainId: `0x${chainId.toString(16)}` },
            ]);
          });
      }
    });
};

const {
  isNetworkSelectOpen,
  selectedToken,
  isTokenDialogOpen,
  amount,
  balances,
  prices,
} = state;
console.log("balances: ", balances, prices, state.amount, selectedToken);

const { chainId, updateChainId } = props;

const selectedNetwork =
  chainId === 1 || chainId === 5
    ? "ethereum"
    : chainId === 1101 || chainId === 1442
    ? "polygon"
    : "ethereum";

const isTestnet = chainId === 5 || chainId === 1442;
const isMainnet = chainId === 1 || chainId === 1101 || !isTestnet;

const walletChains = {
  1442: {
    chainId: `0x5a2`,
    chainName: "zkEVM Testnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.public.zkevm-test.net/"],
    blockExplorerUrls: ["https://testnet-zkevm.polygonscan.com/"],
  },
  1101: {
    chainId: `0x44d`,
    chainName: "zkEVM Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://zkevm-rpc.com"],
    blockExplorerUrls: ["https://zkevm.polygonscan.com/"],
  },
};

const coins = Object.keys(coinsMap);
const pricesUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(
  ","
)}&vs_currencies=usd`;

if (!prices[selectedToken]) {
  asyncFetch(pricesUrl).then((res) => {
    if (!res.ok) return;
    const prices = {};
    coins.forEach((coin) => (prices[coinsMap[coin]] = res.body[coin].usd));
    State.update({ prices });
  });
}

console.log("prices[selectedToken]: ", prices[selectedToken]);

const updateBalance = (token) => {
  const { address, decimals, symbol } = token;

  if (symbol === "ETH") {
    Ethers.provider()
      .getBalance(sender)
      .then((balanceBig) => {
        const adjustedBalance = ethers.utils.formatEther(balanceBig);
        State.update({
          balances: {
            ...state.balances,
            [symbol]: new Big(adjustedBalance || 0).toFixed(),
          },
        });
      });
  } else {
    const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
    const tokenContract = new ethers.Contract(
      address,
      erc20Abi,
      Ethers.provider()
    );
    tokenContract
      .balanceOf(sender)
      .then((balanceBig) => {
        const adjustedBalance = ethers.utils.formatUnits(balanceBig, decimals);
        State.update({
          balances: {
            ...state.balances,
            [symbol]: new Big(adjustedBalance || 0).toFixed(),
          },
        });
      })
      .catch((e) => console.log("error", e));
  }
};

// if (Object.keys(balances).length === 0) {
tokens.filter((t) => t.chainId === chainId).map(updateBalance);
// }

const changeNetwork = (network) => {
  if (isTestnet) {
    if (network === "polygon") {
      switchNetwork(1442);
    } else {
      switchNetwork(5);
    }
  } else {
    if (network === "polygon") {
      switchNetwork(1101);
    } else {
      switchNetwork(1);
    }
  }
  State.update({
    isNetworkSelectOpen: 0,
    selectedNetwork: network,
  });
};

const openNetworkList = (tag) => {
  State.update({ isNetworkSelectOpen: tag, isTokenDialogOpen: false });
};

const isCorrectNetwork =
  Object.keys(networks)
    .map((n) => Number(n))
    .includes(chainId) || chainId === undefined;

const getFromNetworkLabel = () => {
  switch (selectedNetwork) {
    case "ethereum":
      return isMainnet ? networks[1] : networks[5];
    case "polygon":
      return isMainnet ? networks[1101] : networks[1442];
    default:
      return "unknown";
  }
};

const getToNetworkLabel = () => {
  switch (selectedNetwork) {
    case "ethereum":
      return isMainnet ? networks[1101] : networks[1442];
    case "polygon":
      return isMainnet ? networks[1] : networks[5];
    default:
      return "unknown";
  }
};

const getNetworkSrc = (network) => {
  switch (network) {
    case "ethereum":
      return "https://assets.ref.finance/images/eth-bridge.png";
    case "polygon":
      return "https://assets.ref.finance/images/matic-bridge.png";
    default:
      return "";
  }
};

const checkIcon = (
  <svg
    width="17"
    height="12"
    viewBox="0 0 17 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 3.69231L6.21739 9.75L16 1"
      stroke="#794FDD"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

let networkListRender = [
  {
    label: "ethereum",
    src: getNetworkSrc("ethereum"),
    selected: selectedNetwork === "ethereum",
    onSelect: () => changeNetwork("ethereum"),
    name:
      selectedNetwork === "ethereum"
        ? getFromNetworkLabel()
        : getToNetworkLabel(),
  },
  {
    label: "polygon",
    src: getNetworkSrc("polygon"),
    selected: selectedNetwork === "polygon",
    onSelect: () => changeNetwork("polygon"),
    name:
      selectedNetwork === "polygon"
        ? getFromNetworkLabel()
        : getToNetworkLabel(),
  },
];

if (selectedNetwork === "polygon") {
  networkListRender = networkListRender.reverse();
}

const selectNetWorkDropDown = (
  <DropDownContainer>
    <li
      onClick={(e) => {
        networkListRender[0].onSelect();
      }}
      style={{
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img style={{ width: "32px" }} src={networkListRender[0].src} />
        <span>{networkListRender[0].name}</span>

        {networkListRender[0].selected && checkIcon}
      </div>

      <div
        style={{
          position: "relative",
          transform: "rotate(180deg)",
          right: "32px",
          top: "28px",

          zIndex: 101,
        }}
      >
        <ArrowDownWrapper>{arrowDown}</ArrowDownWrapper>
      </div>
    </li>

    <li
      onClick={(e) => {
        networkListRender[1].onSelect();
      }}
      style={{
        position: "relative",
      }}
    >
      <img style={{ width: "32px" }} src={networkListRender[1].src} />
      <span>{networkListRender[1].name}</span>

      {selectedNetwork === networkListRender[1].label && checkIcon}
    </li>
  </DropDownContainer>
);

const selectNetWorkDropDownReverse = (
  <DropDownContainer>
    <li
      onClick={(e) => {
        networkListRender[0].onSelect();
      }}
      style={{
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img style={{ width: "32px" }} src={networkListRender[1].src} />
        <span>{networkListRender[1].name}</span>

        {networkListRender[0].selected && checkIcon}
      </div>

      <div
        style={{
          position: "relative",
          transform: "rotate(180deg)",
          zIndex: 101,

          right: "32px",
          top: "28px",
        }}
      >
        <ArrowDownWrapper>{arrowDown}</ArrowDownWrapper>
      </div>
    </li>
    <li
      onClick={(e) => {
        networkListRender[1].onSelect();
      }}
      style={{
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img style={{ width: "32px" }} src={networkListRender[0].src} />
        <span>{networkListRender[0].name}</span>
        {networkListRender[1].selected && checkIcon}
      </div>
    </li>
  </DropDownContainer>
);

const getToken = (tokenSymbol) =>
  tokens
    .filter(
      (t) =>
        t.chainId ===
        (isMainnet
          ? selectedNetwork === "ethereum"
            ? 1
            : 1101
          : selectedNetwork === "ethereum"
          ? 5
          : 1442)
    )
    .find((t) => t.symbol === tokenSymbol);

const updateToken = (tokenSymbol) => {
  State.update({ selectedToken: tokenSymbol, isTokenDialogOpen: false });

  const { onUpdateToken } = props;
  if (onUpdateToken) {
    const token = getToken(tokenSymbol);

    onUpdateToken({ amount, token, network: selectedNetwork });
  }
};

const openTokenDialog = () => {
  State.update({ isTokenDialogOpen: true });
};

const changeAmount = (e) => {
  const targetValue = e.target.value;
  if (targetValue !== "" && !targetValue.match(/^(0|([1-9]\d*))(\.\d*)?$/)) {
    return;
  }
  let amount = targetValue.replace(/^0+/, "0"); // remove prefix 0

  const curToken = curChainTokens.find((t) => t.symbol === selectedToken);

  if (!curToken) return;

  State.update({ amount });

  const { onChangeAmount } = props;
  if (onChangeAmount) {
    const token = getToken(selectedToken);
    onChangeAmount({ amount, token, network: selectedNetwork });
  }
};

const onOpenChange = (v) => {
  State.update({
    isToastOpen: false,
  });
};

const handleConfirm = () => {
  const isValidAmount = amount > 0 && amount < balances[selectedToken];

  if (!isValidAmount) {
    State.update({
      isToastOpen: true,
      variant: "error",
      title: "Invalid amount",
      description: "Amount should be less than token balance",
    });
    return;
  }

  const isPolygonNetwork = chainId === 1101 || chainId === 1442;
  if (selectedNetwork === "ethereum" && isPolygonNetwork) {
    State.update({
      isToastOpen: true,
      variant: "error",
      title: "Invalid network",
      description: "Please switch to polygon zkevm network",
    });
    return;
  }

  if (selectedNetwork === "polygon" && !isPolygonNetwork) {
    State.update({
      isToastOpen: true,
      variant: "error",
      title: "Invalid network",
      description: "Please switch to ethereum network",
    });
    return;
  }

  const { onConfirm } = props;
  if (onConfirm) {
    const token = getToken(selectedToken);
    onConfirm({ amount, token, network: selectedNetwork });
  }
};

const networkList = isMainnet ? [1, 1101] : [5, 1442];
const token = tokens.find((t) => t.symbol === selectedToken);

const { isToastOpen, variant, title, description } = state;

const { source } = props;

let params = Storage.get(
  "zk-evm-bridge-params",
  "guessme.near/widget/ZKEVMWarmUp.quest-card"
);
const params_from_question_list = Storage.get(
  "zk-evm-swap-params",
  "guessme.near/widget/ZKEVM.QuestionList"
);

if (props.source == "question_list" && params_from_question_list) {
  params = params_from_question_list;
}
const storedSymbol = params?.symbol;

const hideCondition =
  params &&
  source === "quest-card" &&
  params.symbol === selectedToken &&
  ((params?.chain === "Ethereum" && chainId === 1) ||
    (params?.chain &&
      params?.chain?.toLowerCase() === "zkevm" &&
      chainId === 1101));

if (!hideCondition) {
  props.updateHide && props.updateHide(false);
} else {
  props.updateHide && props.updateHide(true);
}

if (
  (params?.chain === "Ethereum" && chainId !== 1) ||
  (params?.chain &&
    params?.chain?.toLowerCase() === "zkevm" &&
    chainId !== 1101)
) {
  const chainId = params?.chain === "Ethereum" ? 1 : 1101;

  switchNetwork(chainId);
}

// console.log("params: ", params);

// if (!isCorrectNetwork) {
//   switchNetwork(1);
// }

const canSwap =
  !!state.amount &&
  Number(state.amount) !== "NaN" &&
  Object.keys(balances).length > 0 &&
  new Big(Number(state.amount) === "NaN" ? 0 : state.amount || 0).lt(
    balances[selectedToken]
  ) &&
  new Big(Number(state.amount) === "NaN" ? 0 : state.amount || 0).gt(
    new Big(0)
  );
return (
  <DeskLayout>
    <Layout>
      {!isCorrectNetwork && (
        <Alert>
          {alertIcon}

          <span className="alert-detail">
            Please switch to Ethereum or Polygon zkEVM
          </span>

          <div
            className="alert-button"
            onClick={() => {
              switchNetwork(1);
            }}
          >
            <span>Switch Network</span>
          </div>
        </Alert>
      )}
      {!isCorrectNetwork && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 110,
          }}
        ></div>
      )}

      <div class="container">
        <ContainerNetwork>
          <span class="label">From</span>
        </ContainerNetwork>
        <BridgeContainer
          onClick={() => {
            openNetworkList(1);
          }}
        >
          <img style={{ width: "32px" }} src={getNetworkSrc(selectedNetwork)} />
          <div class="token-container">
            <BridgeName>
              <span>{getFromNetworkLabel()}</span>
            </BridgeName>
          </div>

          <ArrowDownWrapper>{arrowDown}</ArrowDownWrapper>
        </BridgeContainer>

        {state.isNetworkSelectOpen === 1 && selectNetWorkDropDown}
      </div>
      <div class="container">
        <ContainerNetwork>
          <span class="label">To</span>
        </ContainerNetwork>
        <BridgeContainer
          onClick={() => {
            openNetworkList(2);
          }}
        >
          <img
            style={{ width: "32px" }}
            src={getNetworkSrc(
              selectedNetwork === "ethereum" ? "polygon" : "ethereum"
            )}
          />
          <div class="token-container">
            <BridgeName>
              <span>{getToNetworkLabel()}</span>
            </BridgeName>
          </div>

          <ArrowDownWrapper>{arrowDown}</ArrowDownWrapper>
        </BridgeContainer>

        {state.isNetworkSelectOpen === 2 && selectNetWorkDropDownReverse}
      </div>

      <SendWrapper>
        <div>Send</div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Input
            class="zkevm-bridge-input"
            placeholder="0.00"
            onChange={changeAmount}
            value={state.amount}
          />

          <Seperator></Seperator>
          <Widget
            src="guessme.near/widget/ZKEVMSwap.zkevm-bridge-token-list"
            props={{
              tokens: curChainTokens,
              selectedToken,
              balances,
              onSelect: updateToken,
            }}
          />
        </div>
      </SendWrapper>
      {!!state.amount &&
        Number(state.amount) !== "NaN" &&
        Object.keys(balances).length > 0 &&
        new Big(Number(state.amount) === "NaN" ? 0 : state.amount || 0).gt(
          balances[selectedToken]
        ) &&
        new Big(Number(state.amount) === "NaN" ? 0 : state.amount || 0).gt(
          new Big(0)
        ) && (
          <div className="invalid-balance-tip">
            Invalid amount! Amount should be less than token balance
          </div>
        )}

      <ReceiveWrapper>
        <span>Receive</span>

        <div className="result">
          <div>
            {amount} {selectedToken}
          </div>

          <div>
            ≈$
            {!prices?.[selectedToken] || !state.amount
              ? "-"
              : new Big(prices?.[selectedToken] || 0)
                  .times(new Big(state.amount))
                  .toFixed()}
          </div>
        </div>
      </ReceiveWrapper>

      <ActionButton
        onClick={handleConfirm}
        disabled={!isCorrectNetwork || !canSwap}
      >
        Confirm
      </ActionButton>

      <Widget
        src="ciocan.near/widget/toast"
        props={{ open: isToastOpen, variant, title, description, onOpenChange }}
      />
    </Layout>
  </DeskLayout>
);
