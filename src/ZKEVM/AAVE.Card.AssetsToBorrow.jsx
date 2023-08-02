const {
  config,
  assetsToBorrow,
  chainId,
  onActionSuccess,
  showBorrowModal,
  setShowBorrowModal,
  yourSupplies,
  borrowETHGas,
  borrowERC20Gas,
  formatHealthFactor,
} = props;

if (!assetsToBorrow) {
  return <div />;
}

const { debts, ...assetsToBorrowCommonParams } = assetsToBorrow;

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}
State.init({
  data: undefined,
});

const BorrowButton = ({ data }) => (
  <Widget
    src={`guessme.near/widget/ZKEVM.AAVE.PrimaryButton`}
    props={{
      config,
      children: "Borrow",
      onClick: () => {
        State.update({ data });
        setShowBorrowModal(true);
      },
    }}
  />
);

const showAlert = yourSupplies && yourSupplies.length === 0;

const AlertContainer = styled.div`
  display: flex;
  align-items:center;
  border-radius: 24px;
  background: rgba(121, 79, 221, 0.25);
  font-size: 14px;
  font-weight:bold
  color:#fff;
  padding:4px 14px;
  margin:10px 20px;
  img {
    margin-right: 8px;
  }
`;
return (
  <>
    <Widget
      src={`guessme.near/widget/ZKEVM.AAVE.Card.CardsView`}
      props={{
        config,
        style: {
          marginTop: "10px",
        },
        title: "Assets to Borrow",
        body: (
          <>
            {showAlert && (
              <>
                <AlertContainer>
                  <img
                    src={`${config.ipfsPrefix}/bafkreih3npgn6ydscd7mzjrxredamembxhlmdxnw5l4izpfru2rbucvdly`}
                    width={16}
                    height={16}
                  />
                  <div>
                    To borrow you need to supply any asset to be used as
                    collateral.
                  </div>
                </AlertContainer>
              </>
            )}
            {!debts || debts.length === 0 ? (
              <Widget
                src={`guessme.near/widget/ZKEVM.AAVE.Card.CardEmpty`}
                props={{
                  config,
                  children: "Nothing borrowed yet",
                }}
              />
            ) : (
              <>
                {/* mobile view */}
                {debts.map((row) => (
                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Card.CardContainer`}
                    props={{
                      children: [
                        <Widget
                          src={`${config.ownerId}/widget/AAVE.Card.Divider`}
                          props={{ config }}
                        />,
                        <Widget
                          src={`${config.ownerId}/widget/AAVE.Card.CardsBody`}
                          props={{
                            config,
                            children: [
                              <Widget
                                src={`${config.ownerId}/widget/AAVE.Card.TokenWrapper`}
                                props={{
                                  children: [
                                    <img
                                      width={64}
                                      height={64}
                                      src={`https://app.aave.com/icons/tokens/${row.symbol.toLowerCase()}.svg`}
                                    />,
                                    <div>
                                      <div className="token-title">
                                        {row.symbol}
                                      </div>
                                      <div className="token-chain">
                                        {row.name}
                                      </div>
                                    </div>,
                                  ],
                                }}
                              />,
                              <Widget
                                src={`${config.ownerId}/widget/AAVE.Card.CardDataWrapper`}
                                props={{
                                  children: [
                                    <div className="card-data-row">
                                      <div className="card-data-key">
                                        Available to borrow
                                      </div>
                                      <div className="card-data-value">
                                        <div>
                                          {Number(row.availableBorrows).toFixed(
                                            7
                                          )}
                                        </div>
                                        <div>
                                          ${" "}
                                          {Number(
                                            row.availableBorrowsUSD
                                          ).toFixed(2)}
                                        </div>
                                      </div>
                                    </div>,
                                    <div className="card-data-row">
                                      <div className="card-data-key">
                                        APY, variable
                                      </div>
                                      <div className="card-data-value">{`${(
                                        Number(row.variableBorrowAPY) * 100
                                      ).toFixed(2)} %`}</div>
                                    </div>,
                                  ],
                                }}
                              />,
                              <BorrowButton
                                data={{
                                  ...row,
                                  ...assetsToBorrowCommonParams,
                                }}
                              />,
                            ],
                          }}
                        />,
                      ],
                    }}
                  />
                ))}
                {/* pc view */}
                <Widget
                  src={`guessme.near/widget/ZKEVM.AAVE.Card.CardsTable`}
                  props={{
                    config,
                    headers: [
                      "Asset",
                      "Available to borrow",
                      "APY(variable)",
                      "",
                    ],
                    data: debts.map((row) => {
                      return [
                        <Widget
                          src={`guessme.near/widget/ZKEVM.AAVE.Card.TokenWrapper`}
                          props={{
                            children: [
                              <img
                                width={32}
                                height={32}
                                src={`https://app.aave.com/icons/tokens/${row.symbol.toLowerCase()}.svg`}
                              />,
                              <div>
                                <div className="token-title">{row.symbol}</div>
                                <div className="token-chain">{row.name}</div>
                              </div>,
                            ],
                          }}
                        />,
                        <div>
                          <div className="primaryStyle">{Number(row.availableBorrows).toFixed(7)}</div>
                          <div className="token-balance-value">
                            $ {Number(row.availableBorrowsUSD).toFixed(2)}
                          </div>
                        </div>,
                        <span className="primaryStyle">{(Number(row.variableBorrowAPY) * 100).toFixed(2)}%</span>,
                        <BorrowButton
                          data={{
                            ...row,
                            ...assetsToBorrowCommonParams,
                          }}
                        />,
                      ];
                    }),
                  }}
                />
              </>
            )}
          </>
        ),
      }}
    />
    {showBorrowModal && (
      <Widget
        src={`guessme.near/widget/ZKEVM.AAVE.Modal.BorrowModal`}
        props={{
          config,
          onRequestClose: () => setShowBorrowModal(false),
          data: state.data,
          onActionSuccess,
          chainId,
          borrowETHGas,
          borrowERC20Gas,
          formatHealthFactor,
        }}
      />
    )}
  </>
);
