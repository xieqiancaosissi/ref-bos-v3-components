const {
  config,
  data,
  onRequestClose,
  onActionSuccess,
  chainId,
  depositETHGas,
  depositERC20Gas,
  formatHealthFactor,
} = props;

if (!data) {
  return <div />;
}

const MIN_ETH_GAS_FEE = 0.001;
const ROUND_DOWN = 0;
function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

const {
  symbol,
  balance,
  marketReferencePriceInUsd,
  supplyAPY,
  usageAsCollateralEnabled,
  decimals,
  underlyingAsset,
  name: tokenName,
  healthFactor,
  supportPermit,
} = data;

const WithdrawContainer = styled.div`
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
  font-size: 18px;
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
  font-size: 14px;
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
  loading: false,
  newHealthFactor: "-",
  gas: "-",
  allowanceAmount: "0",
  needApprove: false,
});

function updateGas() {
  if (symbol === config.nativeCurrency.symbol) {
    depositETHGas().then((value) => {
      State.update({ gas: value });
    });
  } else {
    depositERC20Gas().then((value) => {
      State.update({ gas: value });
    });
  }
}

updateGas();
const eth_account_id = Ethers.send("eth_requestAccounts", [])[0];
const questionSwitch = Storage.get("zkevm-aave-question-switch", "guessme.near/widget/ZKEVM.switch_quest_card");

function getNonce(tokenAddress, userAddress) {
  const token = new ethers.Contract(
    tokenAddress,
    config.erc20Abi.body,
    Ethers.provider().getSigner()
  );

  return token.nonces(userAddress).then((nonce) => nonce.toNumber());
}

/**
 *
 * @param {string} user user address
 * @param {string} reserve AAVE reserve address (token to supply)
 * @param {string} tokenName token name
 * @param {string} amount token amount in full decimals
 * @param {number} deadline unix timestamp in SECONDS
 * @returns raw signature string will could be used in supplyWithPermit
 */
function signERC20Approval(user, reserve, tokenName, amount, deadline) {
  return getNonce(reserve, user).then((nonce) => {
    const typeData = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      },
      primaryType: "Permit",
      domain: {
        name: tokenName,
        version: "1",
        chainId,
        verifyingContract: reserve,
      },
      message: {
        owner: user,
        spender: config.aavePoolV3Address,
        value: amount,
        nonce,
        deadline,
      },
    };

    const dataToSign = JSON.stringify(typeData);

    return Ethers.provider().send("eth_signTypedData_v4", [user, dataToSign]);
  });
}

/**
 *
 * @param {string} user user address
 * @param {string} reserve AAVE reserve address (token to supply)
 * @param {string} amount token amount in full decimals
 * @param {number} deadline unix timestamp in SECONDS
 * @param {string} rawSig signature from signERC20Approval
 * @returns txn object
 */
function supplyWithPermit(user, reserve, amount, deadline, rawSig) {
  const sig = ethers.utils.splitSignature(rawSig);
  const pool = new ethers.Contract(
    config.aavePoolV3Address,
    config.aavePoolV3ABI.body,
    Ethers.provider().getSigner()
  );
  return pool[
    "supplyWithPermit(address,uint256,address,uint16,uint256,uint8,bytes32,bytes32)"
  ](reserve, amount, user, 0, deadline, sig.v, sig.r, sig.s);
}

function depositETH(amount) {
  State.update({
    loading: true,
  });
  return Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => {
      const wrappedTokenGateway = new ethers.Contract(
        config.wrappedTokenGatewayV3Address,
        config.wrappedTokenGatewayV3ABI.body,
        Ethers.provider().getSigner()
      );
      return wrappedTokenGateway.depositETH(
        config.aavePoolV3Address,
        address,
        0,
        {
          value: amount,
        }
      );
    })
    .then((tx) => {
      tx.wait().then((res) => {
        const { status, transactionHash } = res;
        if (status === 1) {
          onActionSuccess({
            msg: `You supplied ${Big(amount)
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
          action_title: `Supply ${symbol} on AAVE`,
          action_type: "Supply",
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

function getAllowance() {
  const tokenAddress = underlyingAsset;
  Ethers.provider()
    .getSigner()
    .getAddress()
    .then((userAddress) => {
      const token = new ethers.Contract(
        tokenAddress,
        config.erc20Abi.body,
        Ethers.provider().getSigner()
      );
      token
        .allowance(userAddress, config.aavePoolV3Address)
        .then((allowanceAmount) => allowanceAmount.toString())
        .then((allowanceAmount) => {
          State.update({
            allowanceAmount: Big(allowanceAmount)
              .div(Big(10).pow(decimals))
              .toFixed(),
          });
        });
    });
}

getAllowance();

function depositFromApproval(amount) {
  const tokenAddress = underlyingAsset;
  const pool = new ethers.Contract(
    config.aavePoolV3Address,
    config.aavePoolV3ABI.body,
    Ethers.provider().getSigner()
  );

  return Ethers.provider()
    .getSigner()
    .getAddress()
    .then((userAddress) => {
      return pool["supply(address,uint256,address,uint16)"](
        tokenAddress,
        amount,
        userAddress,
        0
      );
    });
}

function approve(amount) {
  const tokenAddress = underlyingAsset;
  const token = new ethers.Contract(
    tokenAddress,
    config.erc20Abi.body,
    Ethers.provider().getSigner()
  );
  return token["approve(address,uint256)"](config.aavePoolV3Address, amount);
}

function update() {
  if (supportPermit) {
    return;
  }
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

update();
const is_disabled = state.loading || Big(state.amount || 0).lte(0) || Big(balance).lte(0);
function depositErc20(amount) {
  State.update({
    loading: true,
  });
  const deadline = Math.floor(Date.now() / 1000 + 3600); // after an hour

  Ethers.provider()
    .getSigner()
    .getAddress()
    .then((userAddress) => {
      if (!supportPermit) {
        depositFromApproval(amount)
          .then((tx) => {
            tx.wait().then((res) => {
              const { status, transactionHash } = res;
              if (status === 1) {
                onActionSuccess({
                  msg: `You supplied ${Big(amount)
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
                State.update({
                  loading: false,
                });
                console.log("tx failed", res);
              }
              add_action({
                action_title: `Supply ${symbol} on AAVE`,
                action_type: "Supply",
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
      } else {
        const token = underlyingAsset;
        signERC20Approval(userAddress, token, tokenName, amount, deadline)
          .then((rawSig) => {
            return supplyWithPermit(
              userAddress,
              token,
              amount,
              deadline,
              rawSig
            );
          })
          .then((tx) => {
            tx.wait().then((res) => {
              const { status, transactionHash } = res;
              if (status === 1) {
                onActionSuccess({
                  msg: `You supplied ${Big(amount)
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
                State.update({
                  loading: false,
                });
                console.log("tx failed", res);
              }
              add_action({
                action_title: `Supply ${symbol} on AAVE`,
                action_type: "Supply",
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
    })
    .catch(() => State.update({ loading: false }));
}

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

const maxValue =
  symbol === config.nativeCurrency.symbol
    ? Big(balance).minus(MIN_ETH_GAS_FEE).toFixed(decimals)
    : Big(balance).toFixed(decimals);

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
        underlyingAsset,
        "deposit",
        state.amountInUSD
      ).then((response) => {
        const newHealthFactor = formatHealthFactor(response.body);
        State.update({ newHealthFactor });
      });
    });
}, 1000);

const changeValue = (value) => {
  if (Number(value) > Number(maxValue)) {
    value = maxValue;
  }
  if (Number(value) < 0) {
    value = "0";
  }
  if (isValid(value)) {
    const amountInUSD = Big(value)
      .mul(marketReferencePriceInUsd)
      .toFixed(2, ROUND_DOWN);
    State.update({
      amountInUSD,
    });
    updateNewHealthFactor();
  } else {
    State.update({
      amountInUSD: "0.00",
      newHealthFactor: "-",
    });
  }
  State.update({ amount: value });
};
function add_action(param_body) {
  asyncFetch("https://bos-api.delink.one/add-action-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param_body),
    });
}
return (
  <>
    <Widget
      src={`guessme.near/widget/ZKEVM.AAVE.Modal.BaseModal`}
      props={{
        title: `Supply ${symbol}`,
        onRequestClose: onRequestClose,
        children: (
          <WithdrawContainer>
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
                        Balance:{" "}
                        <span
                          className="balanceValue"
                          onClick={() => {
                            changeValue(maxValue);
                          }}
                        >
                          {isValid(balance) && balance !== "-"
                              ? Big(balance).toFixed(7)
                              : balance}
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
                        left: <PurpleTexture>Supply APY</PurpleTexture>,
                        right: (
                          <WhiteTexture>
                            {(Number(supplyAPY) * 100).toFixed(2)}%
                          </WhiteTexture>
                        ),
                      }}
                    />
                    <Widget
                      src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                      props={{
                        left: <PurpleTexture>Collateralization</PurpleTexture>,
                        right: usageAsCollateralEnabled ? (
                          <GreenTexture>Enabled</GreenTexture>
                        ) : (
                          <RedTexture>Disabled</RedTexture>
                        ),
                      }}
                    />
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
            {state.needApprove && (
              <Widget
                src={`guessme.near/widget/ZKEVM.AAVE.ModalPrimaryButton`}
                props={{
                  config,
                  loading: state.loading,
                  children: `Approve ${symbol}`,
                  disabled,
                  onClick: () => {
                    State.update({
                      loading: true,
                    });
                    const amount = Big(state.amount)
                      .mul(Big(10).pow(decimals))
                      .toFixed(0);
                    approve(amount)
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
            {!state.needApprove && (
              <Widget
                src={`guessme.near/widget/ZKEVM.AAVE.ModalPrimaryButton`}
                props={{
                  config,
                  children: `Supply ${symbol}`,
                  loading: state.loading,
                  disabled: is_disabled,
                  onClick: () => {
                    const amount = Big(state.amount)
                      .mul(Big(10).pow(decimals))
                      .toFixed(0);
                    if (symbol === config.nativeCurrency.symbol) {
                      // supply eth
                      depositETH(amount);
                    } else {
                      // supply common
                      depositErc20(amount);
                    }
                  },
                }}
              />
            )}
          </WithdrawContainer>
        ),
        config,
      }}
    />
  </>
);
