const {
  config,
  data,
  onRequestClose,
  onActionSuccess,
  chainId,
  borrowETHGas,
  borrowERC20Gas,
  formatHealthFactor,
} = props;

if (!data) {
  return <div />;
}

const ROUND_DOWN = 0;
function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

const {
  symbol,
  marketReferencePriceInUsd,
  healthFactor,
  availableBorrows,
  availableBorrowsUSD,
  decimals,
  underlyingAsset,
  variableDebtTokenAddress,
} = data;

const BorrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .splitDiv {
    height: 1px;
    .splitLine {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      border-top: 1px solid #332c4b;
    }
  }
`;

const TokenTexture = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const TokenWrapper = styled.div`
  display: flex;
  img {
    margin-right: 4px;
  }
`;

const GrayTexture = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #7c7f96;
  .balanceValue {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const PurpleTexture = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #8a8db9;
`;

const GreenTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #2cffa7;
`;

const RedTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: red;
`;

const WhiteTexture = styled.div`
  font-size: 16px;
  color: white;
`;
const DeepPurpleTexture = styled.div`
  font-size: 14px;
  color: #7c7f96;
`;
const TransactionOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;

  font-size: 20px;
  font-weight: bold;
  color: white;
  flex: 1;
  width: 160px;

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Max = styled.span`
  color: #8247e5;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(53, 55, 73, 0.5);
  height: 55px;
  border-radius: 10px;
  padding: 0 12px;
`;
const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;


State.init({
  amount: "",
  amountInUSD: "0.00",
  allowanceAmount: 0,
  loading: false,
  newHealthFactor: "-",
  gas: "-",
});

function updateGas() {
  if (symbol === config.nativeCurrency.symbol) {
    borrowETHGas().then((value) => {
      State.update({ gas: value });
    });
  } else {
    borrowERC20Gas().then((value) => {
      State.update({ gas: value });
    });
  }
}

updateGas();
const maxValue = Big(availableBorrows).toFixed(decimals);
const questionSwitch = Storage.get("zkevm-aave-question-switch", "guessme.near/widget/ZKEVM.switch_quest_card");
const eth_account_id = Ethers.send("eth_requestAccounts", [])[0];

/**
 *
 * @param {string} chainId
 * @param {string} address user address
 * @param {string} asset asset address
 * @param {string} action 'deposit' | 'withdraw' | 'borrow' | 'repay'
 * @param {string} amount amount in USD with 2 fixed decimals
 * @returns
 */
function getNewHealthFactor(chainId, address, asset, action, amount) {
  const url = `${config.AAVE_API_BASE_URL}/${chainId}/health/${address}`;
  return asyncFetch(`${url}?asset=${asset}&action=${action}&amount=${amount}`);
}

/**
 * @param {string} vwETHAddress
 * @param {string} userAddress
 * @returns {BigNumber}
 */
function borrowAllowance(vwETHAddress, userAddress) {
  const vToken = new ethers.Contract(
    vwETHAddress,
    config.variableDebtTokenABI.body,
    Ethers.provider().getSigner()
  );

  return vToken.borrowAllowance(
    userAddress,
    config.wrappedTokenGatewayV3Address
  );
}

function approveDelegation(vwETHAddress) {
  const vToken = new ethers.Contract(
    vwETHAddress,
    config.variableDebtTokenABI.body,
    Ethers.provider().getSigner()
  );
  const maxUint256 = ethers.BigNumber.from(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );
  return vToken.approveDelegation(
    config.wrappedTokenGatewayV3Address,
    maxUint256
  );
}

function debounce(fn, wait) {
  let timer = state.timer;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, wait);
    State.update({ timer });
  };
}

const updateNewHealthFactor = debounce(() => {
  State.update({ newHealthFactor: "-" });

  Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => {
      getNewHealthFactor(
        chainId,
        address,
        data.underlyingAsset,
        "borrow",
        state.amountInUSD
      ).then((response) => {
        const newHealthFactor = formatHealthFactor(response.body);
        State.update({ newHealthFactor });
      });
    });
}, 1000);

const changeValue = (value) => {
  let amountInUSD = "0.00";
  if (Number(value) > Number(maxValue)) {
    value = maxValue;
  }
  if (Number(value) < 0) {
    value = "0";
  }
  if (isValid(value)) {
    amountInUSD = Big(value)
      .mul(marketReferencePriceInUsd)
      .toFixed(2, ROUND_DOWN);
  }
  State.update({ amount: value, amountInUSD });
  updateNewHealthFactor();
};

function borrowERC20(amount) {
  State.update({ loading: true });
  const pool = new ethers.Contract(
    config.aavePoolV3Address,
    config.aavePoolV3ABI.body,
    Ethers.provider().getSigner()
  );

  Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => {
      return pool["borrow(address,uint256,uint256,uint16,address)"](
        underlyingAsset,
        amount,
        2, // variable interest rate
        0,
        address
      );
    })
    .then((tx) => {
      tx.wait().then((res) => {
        const { status, transactionHash } = res;
        if (status === 1) {
          onActionSuccess({
            msg: `You borrowed ${Big(amount)
              .div(Big(10).pow(decimals))
              .toFixed(8)} ${symbol}`,
            callback: () => {
              onRequestClose();
              State.update({
                loading: false,
              });
            },
          });
          console.log("tx succeeded", res);
        } else {
          console.log("tx failed", res);
          State.update({
            loading: false,
          });
        }
        add_action({
          action_title: `Borrow ${symbol} on AAVE`,
          action_type: "Borrow",
          action_tokens: JSON.stringify([`${symbol}`]),
          action_amount: null,
          account_id: eth_account_id,
          account_info: "",
          template: "AAVE",
          action_switch: questionSwitch == "on" ? '1': '0',
          action_status: status === 1 ? "Success" : "Failed",
          tx_id: transactionHash,
        });
      });
    })
    .catch(() => State.update({ loading: false }));
}
function add_action(param_body) {
  asyncFetch("https://bos-api.delink.one/add-action-data", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param_body),
  });
}
function borrowETH(amount) {
  const wrappedTokenGateway = new ethers.Contract(
    config.wrappedTokenGatewayV3Address,
    config.wrappedTokenGatewayV3ABI.body,
    Ethers.provider().getSigner()
  );
  State.update({ loading: true });
  return wrappedTokenGateway
    .borrowETH(
      config.aavePoolV3Address,
      amount,
      2, // variable interest rate
      0
    )
    .then((tx) => {
      tx.wait().then((res) => {
        const { status, transactionHash } = res;
        if (status === 1) {
          onActionSuccess({
            msg: `You borrowed ${Big(amount)
              .div(Big(10).pow(decimals))
              .toFixed(8)} ${symbol}`,
            callback: () => {
              onRequestClose();
              State.update({
                loading: false,
              });
            },
          });
          console.log("tx succeeded", res);
        } else {
          console.log("tx failed", res);
          State.update({
            loading: false,
          });
        }
        add_action({
          action_title: `Borrow ${symbol} on AAVE`,
          action_type: "Borrow",
          action_tokens: JSON.stringify([`${symbol}`]),
          action_amount: null,
          account_id: eth_account_id,
          account_info: "",
          template: "AAVE",
          action_switch: questionSwitch == "on" ? '1': '0',
          action_status: status === 1 ? "Success" : "Failed",
          tx_id: transactionHash,
        });
      });
    })
    .catch(() => State.update({ loading: false }));
}

function update() {
  Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => {
      borrowAllowance(variableDebtTokenAddress, address)
        .then((amountRaw) => amountRaw.toString())
        .then((amount) => {
          State.update({
            allowanceAmount: Big(amount).div(Big(10).pow(decimals)).toNumber(),
          });
        });
    });

  if (
    !isValid(state.amount) ||
    !isValid(state.allowanceAmount) ||
    Number(state.allowanceAmount) < Number(state.amount) ||
    Number(state.amount) === 0
  ) {
    State.update({ needApprove: true });
  } else {
    State.update({ needApprove: false });
  }
}
function add_action(param_body) {
  asyncFetch("https://bos-api.delink.one/add-action-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param_body),
    });
}
update();
const is_disabled = state.loading || Big(state.amount || 0).lte(0) || Big(availableBorrows || 0).lte(0);
return (
  <>
    <Widget
      src={`guessme.near/widget/ZKEVM.AAVE.Modal.BaseModal`}
      props={{
        title: `Borrow ${symbol}`,
        onRequestClose: onRequestClose,
        children: (
          <BorrowContainer>
            <Widget
              src={`guessme.near/widget/ZKEVM.AAVE.Modal.RoundedCard`}
              props={{
                title: "Amount",
                config,
                children: (
                  <>
                  <InputContainer>
                    <TokenTexture>
                      <Input
                        type="number"
                        value={state.amount}
                        onChange={(e) => {
                          changeValue(e.target.value);
                        }}
                        placeholder="0"
                      />
                    </TokenTexture>
                    <TokenWrapper>
                      <img
                        width={22}
                        height={22}
                        src={`https://app.aave.com/icons/tokens/${symbol.toLowerCase()}.svg`}
                      />
                      <TokenTexture>{symbol}</TokenTexture>
                    </TokenWrapper>
                  </InputContainer>
                  <BalanceContainer>
                    <GrayTexture>${state.amountInUSD}</GrayTexture>
                    <GrayTexture>
                      Available:{" "}
                      <span
                        onClick={() => {
                          changeValue(maxValue);
                        }}
                        className="balanceValue"
                      >
                        {isValid(availableBorrows) && availableBorrows !== "-"
                          ? Big(availableBorrows).toFixed(7)
                          : availableBorrows}
                      </span>
                    </GrayTexture>
                  </BalanceContainer>
                </>
                ),
              }}
            />
            <div className="splitDiv">
              <div className="splitLine"></div>
            </div>
            <Widget
              src={`guessme.near/widget/ZKEVM.AAVE.Modal.RoundedCard`}
              props={{
                title: "Transaction Overview",
                config,
                children: (
                  <TransactionOverviewContainer>
                    <Widget
                      src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                      props={{
                        left: <PurpleTexture>Health Factor</PurpleTexture>,
                        right: (
                          <div style={{ textAlign: "right" }}>
                            <GreenTexture>
                              {healthFactor}
                              <img
                                src={`${config.ipfsPrefix}/bafkreiesqu5jyvifklt2tfrdhv6g4h6dubm2z4z4dbydjd6if3bdnitg7q`}
                                width={16}
                                height={16}
                              />{" "}
                              {state.newHealthFactor}
                            </GreenTexture>
                            <DeepPurpleTexture>
                              Liquidation at &lt;{" "}
                              {config.FIXED_LIQUIDATION_VALUE}
                            </DeepPurpleTexture>
                          </div>
                        ),
                      }}
                    />
                  </TransactionOverviewContainer>
                ),
              }}
            />
             <div className="splitDiv">
              <div className="splitLine"></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Widget
                src={`${config.ownerId}/widget/AAVE.GasEstimation`}
                props={{ gas: state.gas, config }}
              />
            </div>
            {state.needApprove && symbol === config.nativeCurrency.symbol && (
              <Widget
                src={`guessme.near/widget/ZKEVM.AAVE.ModalPrimaryButton`}
                props={{
                  config,
                  loading: state.loading,
                  disabled: is_disabled,
                  children: `Approve ${symbol}`,
                  onClick: () => {
                    State.update({
                      loading: true,
                    });
                    const amount = Big(state.amount)
                      .mul(Big(10).pow(decimals))
                      .toFixed(0);

                    approveDelegation(variableDebtTokenAddress)
                      .then((tx) => {
                        tx.wait().then((res) => {
                          const { status } = res;
                          if (status === 1) {
                            State.update({
                              needApprove: false,
                              loading: false,
                            });
                          }
                        });
                      })
                      .catch(() => State.update({ loading: false }));
                  },
                }}
              />
            )}
            {!(
              state.needApprove && symbol === config.nativeCurrency.symbol
            ) && (
              <Widget
                src={`guessme.near/widget/ZKEVM.AAVE.ModalPrimaryButton`}
                props={{
                  config,
                  children: `Borrow ${symbol}`,
                  loading: state.loading,
                  disabled: is_disabled,
                  onClick: () => {
                    const amount = Big(state.amount)
                      .mul(Big(10).pow(decimals))
                      .toFixed(0);
                    if (symbol === config.nativeCurrency.symbol) {
                      // borrow weth
                      borrowETH(amount);
                    } else {
                      // borrow common
                      borrowERC20(amount);
                    }
                  },
                }}
              />
            )}
          </BorrowContainer>
        ),
        config,
      }}
    />
  </>
);
