State.init({
  activePair: defaultPair,
  isPoolFetching: false,
  isUserPositionsFetching: false,
  chainId: '',
});

const sender = Ethers.send("eth_requestAccounts", [])[0];
const ContainerLogin = styled.div`
  .web3-connect{
    width:480px;
    height:60px;
    border-radius:10px;
    background-color:#fff;
    color:#0F1126;
    font-size:18px;
    font-weight:500;
    border:none;
    margin-top:20px;
  }
`
if (!sender)
  return (
    <ContainerLogin
      style={{
        display: "flex",
        maxWidth: "500px",
        flexDirection: "column",
        margin: "80px auto auto auto",
      }}
    >
      <img src="https://ipfs.near.social/ipfs/bafkreibmhq4fseqpcbywiq4hfojghxvhj47mjsri2trggt7d5h5od4y6kq"></img>
      
      <Web3Connect className="web3-connect" connectLabel="Connect ETH wallet" />
    </ContainerLogin>
  );

// const { chainId } = Ethers.getNetwork();
Ethers.provider().getNetwork().then((data) => {
  State.update({
    chainId: data.chainId
  })
})
const chainIdToSwitch = "0x44D";

const switchChain = () => {
  const zkevmChain = {
    chainId: "0x44D",
    chainName: "Polygon zkEVM",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://zkevm-rpc.com"],
    blockExplorerUrls: ["https://zkevm.polygonscan.com"],
  };

  Ethers.send("wallet_addEthereumChain", [zkevmChain]);
};

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Inter';
  max-width: 500px;
  color: #fff;
  margin: auto;
  text-align: center;
  border-radius: 12px;
  padding: 16px 0;
  align-items: center;
  gap: 12px;
  margin-top:80px;
  button {
    background: #8247E5;
    border: none;
    &:hover {
      background: #8257F5;
    }
  }
`;

if (state.chainId !== 1101) {
  return (
    <SwitchWrapper>
      <img src="https://ipfs.near.social/ipfs/bafkreibmhq4fseqpcbywiq4hfojghxvhj47mjsri2trggt7d5h5od4y6kq"></img>
      <h4>Please switch to Polygon zkEVM</h4>
      <button onClick={switchChain}>Switch to Polygon zkEVM</button>
      <p>**Please refresh once after switch chain**</p>
    </SwitchWrapper>
  );
}

const fetchPoolsData = () => {
  State.update({
    isPoolFetching: true,
  });
  asyncFetch(
    "https://wire2.gamma.xyz/quickswap/polygon-zkevm/hypervisors/allData"
  ).then((res) => {
    if (!res.ok) return;

    State.update({
      poolsData: res.body,
      isPoolFetching: false,
    });
  });
};

const fetchUserData = () => {
  State.update({
    isUserPositionsFetching: true,
  });
  asyncFetch(
    `https://wire2.gamma.xyz/quickswap/polygon-zkevm/user/${sender}`
  ).then((res) => {
    if (!res.ok) return;

    State.update({
      userPositions: res.body[sender],
      isUserPositionsFetching: false,
    });
  });
};

if (state.poolsData === undefined) {
  fetchPoolsData();
}

if (sender && state.userPositions === undefined) {
  fetchUserData();
}

const refetch = () => {
  fetchPoolsData();
  fetchUserData();
  console.log("refetching");
};

const postRefetch = () => {
  setTimeout(() => refetch(), 45_000);
};

const defaultPair = {
  id: "N WETH-USDC",
  token0: "WETH",
  token1: "USDC",
  decimals0: 18,
  decimals1: 6,
};

const Wrapper = styled.div`
    display:flex;
    align-items: start;
    gap: 24px;
`;
const VStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  .tableTitle{
    font-size:18px;
    color:#7C7F96;
    font-weight:500;
    padding-left:16px;
    margin-bottom:5px;
  }
`;
const Button = styled.button`
    background: #1d1e1f;
    border-radius: 4px;
    border: none;
    max-width: 640px;
    width: 100%;
    color: #fff;
    padding: 8px 0;
    font-weight: 600;
    font-size: 14px;
    position: relative;
    min-height: 37px;
    &:hover {
      background: #2b2a2b;
    }
    &:disabled {
      background: #333;
      color: #ccc;
    }
`;

const handlePairClick = (pair) => {
  State.update({
    activePair: pair,
  });
};

const {
  activePair,
  poolsData,
  userPositions,
  isPoolFetching,
  isUserPositionsFetching,
} = state;

return (
  <VStack>
    {/* <Button
      disabled={isPoolFetching || isUserPositionsFetching}
      onClick={refetch}
    >
      {isPoolFetching || isUserPositionsFetching
        ? "Fetching Table Data..."
        : "Refresh"}
    </Button> */}
    <div className="tableTitle">Active Liquidity</div>
    <Wrapper>
      <Widget
        src="guessme.near/widget/ZKEVM.gamma-zkevm-table"
        props={{ handlePairClick, poolsData, userPositions }}
      />

      <Widget
        src="guessme.near/widget/ZKEVM.gamma-zkevm-vault"
        props={{ pair: activePair, refetch: postRefetch }}
      />
    </Wrapper>
  </VStack>
);
