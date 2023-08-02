const {
  config,
  yourBorrows,
  showRepayModal,
  showBorrowModal,
  setShowRepayModal,
  setShowBorrowModal,
  onActionSuccess,
  chainId,
  repayETHGas,
  repayERC20Gas,
  borrowETHGas,
  borrowERC20Gas,
  formatHealthFactor,
} = props;

State.init({
  data: undefined,
});

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

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

const RepayButton = ({ data }) => (
  <Widget
    src={`guessme.near/widget/ZKEVM.AAVE.PrimaryButton`}
    props={{
      config,
      children: "Repay",
      onClick: () => {
        State.update({ data });
        setShowRepayModal(true);
      },
    }}
  />
);

if (!yourBorrows) {
  return <div />;
}

const { debts, ...yourBorrowsCommonParams } = yourBorrows;

return (
  <>
    <Widget
      src={`guessme.near/widget/ZKEVM.AAVE.Card.CardsView`}
      props={{
        config,
        style: {
          marginTop: "16px",
        },
        title: "Your Borrowed",
        body: (
          <>
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
                                      <div className="card-data-key">Debt</div>
                                      <div className="card-data-value">
                                        <div>
                                          {Number(row.variableBorrows).toFixed(
                                            7
                                          )}
                                        </div>
                                        <div>
                                          ${" "}
                                          {Number(
                                            row.variableBorrowsUSD
                                          ).toFixed(2)}
                                        </div>
                                      </div>
                                    </div>,
                                    <div className="card-data-row">
                                      <div className="card-data-key">APY</div>
                                      <div className="card-data-value">{`${(
                                        Number(row.variableBorrowAPY) * 100
                                      ).toFixed(2)} %`}</div>
                                    </div>,
                                  ],
                                }}
                              />,
                              <ButtonGroup>
                                <RepayButton
                                  data={{ ...row, ...yourBorrowsCommonParams }}
                                />
                                <BorrowButton
                                  data={{
                                    ...row,
                                    ...yourBorrowsCommonParams,
                                  }}
                                />
                              </ButtonGroup>,
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
                    headers: ["Asset", "Debt", "APY", ""],
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
                          <div className="primaryStyle">{Number(row.variableBorrows).toFixed(7)}</div>
                          <div className="token-balance-value">
                            $ {Number(row.variableBorrowsUSD).toFixed(2)}
                          </div>
                        </div>,
                        <span className="primaryStyle">{(Number(row.variableBorrowAPY) * 100).toFixed(2)} %</span>,
                        <ButtonGroup>
                          <RepayButton
                            data={{ ...row, ...yourBorrowsCommonParams }}
                          />
                          <BorrowButton
                            data={{
                              ...row,
                              ...yourBorrowsCommonParams,
                            }}
                          />
                        </ButtonGroup>,
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
    {showRepayModal && (
      <Widget
        src={`guessme.near/widget/ZKEVM.AAVE.Modal.RepayModal`}
        props={{
          config,
          onRequestClose: () => setShowRepayModal(false),
          data: state.data,
          onActionSuccess,
          onlyOneBorrow: debts.length === 1,
          chainId,
          repayETHGas,
          repayERC20Gas,
          formatHealthFactor,
        }}
      />
    )}
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
