const Layout = styled.div`
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 14px;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
  align-items: start;
  color: #fff;
  width: 100%;
  border: 1px solid #332c4b;

  background: linear-gradient(0deg, #161825, #161825),
    linear-gradient(0deg, #332c4b, #332c4b);

  .refresh {
    border: none;
    text-decoration: underline;
    color: #8c7ebd;
    background: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 14px;
    width: 100%;
    margin-top: 12px;
    align-items: center;
    li {
      padding: 4px 8px;
      display: flex;
      gap: 4px;

      justify-content: space-between;
      width: 100%;
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        width: 100%;

        .token {
          font-size: 16px;
        }
        a {
          color: #5285df;
          text-decoration: underline;
        }
        .date {
          color: #7c7f96;
        }

        button {
          color: #fff;
          background: #8247e5;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100px;
          :disabled {
            cursor: not-allowed;
          }
        }
      }
    }
  }
`;

const bridgeAbi = [
  {
    inputs: [
      {
        internalType: "bytes32[32]",
        name: "smtProof",
        type: "bytes32[32]",
      },
      {
        internalType: "uint32",
        name: "index",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "mainnetExitRoot",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "rollupExitRoot",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "originNetwork",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "originTokenAddress",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "destinationNetwork",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "metadata",
        type: "bytes",
      },
    ],
    name: "claimAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const bridgeIface = new ethers.utils.Interface(bridgeAbi);

const sender = Ethers.send("eth_requestAccounts", [])[0];

const tokens = props.tokens ?? [];

const arrowUp = (
  <svg
    width="17"
    height="10"
    viewBox="0 0 17 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 8.5L8.5 2L16 8.5"
      stroke="#8C7EBD"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

function add_action(param_body) {
  asyncFetch("https://bos-api.delink.one/add-action-data", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param_body),
  });
}

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });
}

const pendingIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.25 18.25H16.25V16.25C16.25 15.125 15.75 14 14.875 13.125L13.375 11.625L12.625 10.875L12.375 10.75C12.375 10.75 12.25 10.75 12.25 10.625C12.125 10.5 12 10.25 12 10C12 9.75 12.125 9.5 12.25 9.375C12.25 9.375 12.25 9.25 12.375 9.25L12.75 9L12.875 8.75L13.375 8.25L15 6.75C15.875 6 16.25 4.875 16.25 3.75V1.75H17.25C17.75 1.75 18.25 1.375 18.25 1C18.25 0.625 17.875 0.25 17.25 0.25H2.5C2 0.25 1.5 0.625 1.5 1C1.5 1.375 1.875 1.75 2.5 1.75H3.5V3.625C3.5 4.75 4 5.875 4.875 6.75L5.5 7.375L7.125 9L7.25 9.125L7.5 9.25L7.625 9.375C7.75 9.5 7.875 9.75 7.875 10V10.25C7.875 10.375 7.75 10.625 7.625 10.75H7.5L7.25 11L5.5 12.625L4.875 13.25C4 14 3.5 15.125 3.5 16.375V18.375H2.375C1.875 18.375 1.375 18.75 1.375 19.125C1.375 19.5 1.75 19.875 2.375 19.875H17.25C17.75 19.875 18.25 19.5 18.25 19.125C18.25 18.625 17.875 18.25 17.25 18.25ZM5 16.25C5 15.5 5.375 14.75 5.875 14.25L7.625 12.5L9 11.25C9.125 11 9.125 10.875 9.25 10.625C9.25 10.375 9.375 10.25 9.375 10V9.375C9.375 9.25 9.375 9.125 9.25 9V8.875C9 8.75 9 8.75 8.875 8.625L7.5 7.25L5.875 5.625C5.25 5.125 5 4.375 5 3.625V1.75H14.875V3.625C14.875 4.375 14.5 5.125 14 5.625L12 7.5L11.25 8.25L11.125 8.375L11 8.5C10.875 8.75 10.75 9.125 10.75 9.375V9.875C10.75 10.125 10.75 10.25 10.875 10.5C10.875 10.875 11 11.375 11.25 11.625L11.875 12.25L13.875 14.25C14.5 14.75 14.75 15.5 14.75 16.25V18.25H5V16.25Z"
      fill="#794FDD"
    />
    <path
      d="M10.625 13.375C10.375 13.125 9.875 13.125 9.5 13.375L7.625 15C7.25 15.25 7 15.75 7 16.25V17.125H13V16.25C13 15.875 12.75 15.375 12.375 15L10.625 13.375Z"
      fill="#794FDD"
    />
  </svg>
);

State.init({
  deposit: [],
  withdraw: [],
  isToastOpen: false,
  add: false,
  onChangeAdd: (add) => {
    State.update({ add });
  },

  showPending: true,
});

const onOpenChange = (v) => {
  State.update({
    isToastOpen: false,
  });
};

const { chainId, withdraw, deposit, isToastOpen, variant, title, description } =
  state;

const isMainnet = chainId === 1 || chainId === 1101;

const BRIDGE_CONTRACT_ADDRESS = isMainnet
  ? "0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe"
  : "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7";

function formatDateToLocal(inputDate) {
  const dateObj = new Date(inputDate);
  const formattedDate = dateObj.toLocaleString(); // 使用系统默认的本地时区进行转换
  return formattedDate;
}

const getTransactions = (type) => {
  if (!sender) return;

  asyncFetch(
    `https://open-api-v2-staging.polygon.technology/zkevm-${
      isMainnet ? "mainnet" : "testnet"
    }/${type}/address?userAddress=${sender}`
  ).then((res) => {
    if (!res.body.success) {
      return;
    }

    const list = res.body.result.filter((t) =>
      type === "deposit" ? t.status === "BRIDGED" : t.status !== "CLAIMED"
    );

    State.update({
      [type]: list,
    });
  });
};

const refreshList = () => {
  getTransactions("withdraw");
  getTransactions("deposit");
};

refreshList();

const claimTransaction = (tx) => {
  console.log("chainId", chainId);
  const isPolygonNetwork = chainId === 1101 || chainId === 1442;
  if (isPolygonNetwork) {
    State.update({
      isToastOpen: true,
      variant: "error",
      title: "Invalid network",
      description: "Switch to ethereum network to claim transactions",
    });
    return;
  }

  const url = `https://proof-generator.polygon.technology/api/zkevm/${
    isMainnet ? "mainnet" : "testnet"
  }/merkle-proof?net_id=1&deposit_cnt=${tx.counter}`;

  asyncFetch(url).then((res) => {
    if (!res.ok) {
      console.log("merkele proof errror", res);
      return;
    }

    const { proof } = res.body;

    const encodedData = bridgeIface.encodeFunctionData(
      "claimAsset(bytes32[32],uint32,bytes32,bytes32,uint32,address,uint32,address,uint256,bytes)",
      [
        proof["merkle_proof"],
        tx.counter,
        proof["main_exit_root"],
        proof["rollup_exit_root"],
        0,
        tx.childToken,
        0,
        tx.depositReceiver,
        tx.amounts[0],
        "0x",
      ]
    );

    Ethers.provider()
      .getSigner()
      .sendTransaction({
        to: BRIDGE_CONTRACT_ADDRESS,
        data: encodedData,
        value: amountBig,
        gasLimit: ethers.BigNumber.from("500000"),
      })
      .then((tx) => {
        consle.log("tx:", tx);
        refreshList();
      })
      .catch((e) => {
        console.log("error:", e);
        refreshList();
      });
  });
};

const noWithdrawls = withdraw?.length === 0;
const noDeposits = deposit?.length === 0;
const isEmpty = noWithdrawls && noDeposits;

return (
  <>
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          {pendingIcon}

          {(withdraw?.length || 0) + (deposit?.length || 0)}
          <span
            style={{
              color: "#8C7EBD",
            }}
          >
            Pending transactions
          </span>
          {(withdraw?.length || 0) + (deposit?.length || 0) > 0}
          <span
            style={{
              transform: !state.showPending ? "rotate(180deg)" : "rotate(0deg)",
              marginLeft: "8px",
              cursor: "pointer",
            }}
            onClick={() => {
              State.update({
                showPending: !state.showPending,
              });
            }}
          >
            {arrowUp}
          </span>
        </span>

        <button class="refresh" onClick={refreshList}>
          Refresh
        </button>
      </div>

      {state.showPending && (
        <ul>
          {/* {!noWithdrawls && <div>Withdrawls:</div>} */}
          {withdraw.map((t) => {
            const txUrl = `https://${
              isMainnet ? "" : "testnet-"
            }zkevm.polygonscan.com/tx/${t.transactionHash}`;

            const token = tokens.find(
              (token) =>
                t.childToken.toLowerCase() === token.address.toLowerCase()
            );

            if (!token) return null;

            const amount = ethers.utils.formatUnits(
              t.amounts[0],
              token?.decimals || 18
            );

            const isPending = t.status === "BRIDGED";

            return (
              <li>
                <div class="info">
                  <span class="token">
                    {amount} {token?.symbol}
                  </span>

                  <div
                    style={{
                      fontSize: "14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "end",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span class="date">{formatDateToLocal(t.timestamp)}</span>
                      <a href={txUrl} target="_blank">
                        Tx
                      </a>

                      <button
                        disabled={isPending}
                        onClick={() => claimTransaction(t)}
                      >
                        <span>Claim</span>
                      </button>
                    </div>

                    {isPending && <span>(pending... arrive in ~60 mins)</span>}
                  </div>
                </div>
              </li>
            );
          })}

          {/* {!noDeposits && <div>Deposits:</div>} */}

          {deposit.map((t) => {
            const txUrl = `https://${
              isMainnet ? "" : "goerli."
            }etherscan.io/tx/${t.transactionHash}`;

            const token = tokens.find(
              (token) =>
                t.rootToken.toLowerCase() === token.address.toLowerCase()
            );

            if (!token) return null;

            const amount = ethers.utils.formatUnits(
              t.amounts[0],
              token?.decimals || 18
            );

            return (
              <li>
                <div class="info">
                  <span class="token">
                    {amount} {token?.symbol}
                  </span>

                  <div
                    style={{
                      fontSize: "14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "end",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span class="date">{t.timestamp}</span>

                      <a href={txUrl} target="_blank">
                        Tx
                      </a>

                      {/* <button
                      disabled={isPending}
                      onClick={() => claimTransaction(t)}
                    >
                      <span>Claim</span>
                    </button> */}
                    </div>

                    <span>Funds will arrive in ~15 mins</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Layout>

    <Widget
      src="ciocan.near/widget/toast"
      props={{ open: isToastOpen, variant, title, description, onOpenChange }}
    />
  </>
);
