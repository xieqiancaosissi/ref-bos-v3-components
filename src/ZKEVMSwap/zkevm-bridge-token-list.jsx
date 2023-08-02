const { tokens, selectedToken, onSelect, balances } = props;

State.init({
  isListOpen: false,
});

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

const CurrentToken = styled.div`
  background: linear-gradient(0deg, #222436, #222436),
    linear-gradient(0deg, #332c4b, #332c4b);
  border: 1px solid #332c4b;
  border-radius: 25px;
  padding: 4px;
  display: flex;
  gap: 6px;
  width: 159px;
  color: white;

  align-items: center;
  position: relative;
  cursor: pointer;
  .arrow {
    position: absolute;
    right: 12px;
    top: 7px;
  }
`;

const BoxWrapper = styled.div`
  box-shadow: 0px 0px 16px 0px #00000040;
  background: #373a53;
  position: absolute;
  border-radius: 16px;
  padding: 8px 0px;
  width: 488px;
  right: 0px;
  max-height: 250px;
  z-index: 100;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff61d3;
    border-radius: 12px;
  }
  .list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    position: relative;
    color: white;
    :hover {
      background: rgba(24, 26, 39, 0.3);
    }

    span {
      position: absolute;
      right: 20px;
      top: 12px;
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

const Img = styled.img`
  width: 32px;
`;

const curToken = tokens.find((t) => t.symbol === selectedToken);

const onOpen = () => {
  State.update({ isListOpen: !state.isListOpen });
};

const onClose = () => {
  State.update({ isListOpen: false });
};

return (
  <div
    style={{
      position: "relative",
    }}
  >
    <CurrentToken
      onClick={() => {
        onOpen();
      }}
    >
      <Img
        src={
          curToken.logoURI ||
          "https://assets.coingecko.com/coins/images/279/small/ethereum.png"
        }
        alt=""
      />
      {curToken?.symbol || "ETH"}
      <div className="arrow">{arrowDown}</div>
    </CurrentToken>

    {state.isListOpen && (
      <BoxWrapper>
        {tokens.map((t) => {
          return (
            <div
              key={"zkrvm-bridge-list-item-" + t.symbol}
              className="list-item"
              onClick={() => {
                onSelect(t.symbol);
                onClose();
              }}
            >
              <Img src={t.logoURI} alt="" />

              {t.symbol}

              {selectedToken === t.symbol && checkIcon}

              <span>{balances?.[t.symbol] || 0}</span>
            </div>
          );
        })}
      </BoxWrapper>
    )}
  </div>
);
