const {
  config,
  assetsToSupply,
  showSupplyModal,
  setShowSupplyModal,
  onActionSuccess,
  chainId,
  healthFactor,
  formatHealthFactor,
  depositETHGas,
  depositERC20Gas,
} = props;

State.init({
  data: undefined,
});

const SupplyButton = ({ data }) => (
  <Widget
    src={`guessme.near/widget/ZKEVM.AAVE.PrimaryButton`}
    props={{
      config,
      children: "Supply",
      onClick: () => {
        State.update({ data });
        setShowSupplyModal(true);
      },
    }}
  />
);

return (
  <>
    <Widget
      src={`guessme.near/widget/ZKEVM.AAVE.Card.CardsView`}
      props={{
        config,
        style: {
          marginTop: "10px",
        },
        title: "Assets to supply",
        body:
          !assetsToSupply || assetsToSupply.length === 0 ? (
            <Widget
              src={`guessme.near/widget/ZKEVM.AAVE.Card.CardEmpty`}
              props={{
                config,
                children: "Nothing supplied yet",
              }}
            />
          ) : (
            <>
              {/* pcView */}
              <Widget
                src={`guessme.near/widget/ZKEVM.AAVE.Card.CardsTable`}
                props={{
                  config,
                  headers: [
                    "Asset",
                    "Wallet Balance",
                    "Supply APY",
                    "Collateral",
                    "",
                  ],
                  data: assetsToSupply.map((row) => [
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
                      <div className="primaryStyle">{Number(row.balance).toFixed(7)}</div>
                      <div className="token-balance-value">$ {row.balanceInUSD}</div>
                    </div>,
                    <span className="primaryStyle">{(Number(row.supplyAPY) * 100).toFixed(2)}%</span>,
                    <div style={{ paddingLeft: "50px" }}>
                      {(row.isIsolated ||
                        (!row.isIsolated && !row.usageAsCollateralEnabled)) &&
                        ""}
                      {!row.isIsolated && row.usageAsCollateralEnabled && (
                        <img
                          src={`${config.ipfsPrefix}/bafkreibsy5fzn67veowyalveo6t34rnqvktmok2zutdsp4f5slem3grc3i`}
                          width={16}
                          height={16}
                        />
                      )}
                    </div>,
                    <SupplyButton data={row} />,
                  ]),
                }}
              />
              {/* mobile view */}
              {assetsToSupply.map((row) => {
                return (
                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Card.CardContainer`}
                    props={{
                      children: [
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
                                        Wallet Balance
                                      </div>
                                      <div className="card-data-value">
                                        <div>
                                          {Number(row.balance).toFixed(7)}
                                        </div>
                                        <div>$ {row.balanceInUSD}</div>
                                      </div>
                                    </div>,
                                    <div className="card-data-row">
                                      <div className="card-data-key">
                                        Supply APY
                                      </div>
                                      <div className="card-data-value">{`${(
                                        Number(row.supplyAPY) * 100
                                      ).toFixed(2)} %`}</div>
                                    </div>,
                                    <div className="card-data-row">
                                      <div className="card-data-key">
                                        Can be Collateral
                                      </div>
                                      <div className="card-data-value">
                                        {row.isIsolated && "—"}
                                        {!row.isIsolated && (
                                          <>
                                            {row.usageAsCollateralEnabled && (
                                              <img
                                                src={`${config.ipfsPrefix}/bafkreibsy5fzn67veowyalveo6t34rnqvktmok2zutdsp4f5slem3grc3i`}
                                                width={16}
                                                height={16}
                                              />
                                            )}
                                            {!row.usageAsCollateralEnabled && (
                                              <img
                                                src={`${config.ipfsPrefix}/bafkreie5skej6q2tik3qa3yldkep4r465poq33ay55uzp2p6hty2ifhkmq`}
                                                width={16}
                                                height={16}
                                              />
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>,
                                  ],
                                }}
                              />,
                              <SupplyButton data={row} />,
                            ],
                          }}
                        />,
                        <Widget
                          src={`${config.ownerId}/widget/AAVE.Card.Divider`}
                          props={{ config }}
                        />,
                      ],
                    }}
                  />
                );
              })}
            </>
          ),
      }}
    />
    {showSupplyModal && (
      <Widget
        src={`guessme.near/widget/ZKEVM.AAVE.Modal.SupplyModal`}
        props={{
          config,
          onRequestClose: () => setShowSupplyModal(false),
          data: {
            ...state.data,
            healthFactor,
          },
          onActionSuccess,
          chainId,
          depositETHGas,
          depositERC20Gas,
          formatHealthFactor,
        }}
      />
    )}
  </>
);
