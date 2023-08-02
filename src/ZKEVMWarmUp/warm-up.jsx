const { hotIcon, trendIcon, myQuestIcon } = props;

const searchIcon = (
  <svg
    width="26"
    height="20"
    viewBox="0 0 26 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.5382 9.0191C16.5382 13.1718 13.1718 16.5382 9.0191 16.5382C4.86642 16.5382 1.5 13.1718 1.5 9.0191C1.5 4.86642 4.86642 1.5 9.0191 1.5C13.1718 1.5 16.5382 4.86642 16.5382 9.0191Z"
      stroke="#EBF479"
      stroke-width="3"
    />
    <rect
      x="19.1655"
      y="12.4033"
      width="7.89171"
      height="3.38216"
      rx="1.69108"
      transform="rotate(30 19.1655 12.4033)"
      fill="#EBF479"
    />
  </svg>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  width: 100%;
  gap: 28px;
  color: white;

  .header {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .header-title {
    font-size: 40px;
    font-weight: 700;
    line-height: 48px;
    text-align: left;
    padding-bottom: 16px;
  }
  .header-description {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #979abe;
  }
  .input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    gap: 32px;

    .input-search-wrapper {
      position: relative;
      width: 100%;
    }

    .search-wrapper {
      position: absolute;
      right: 12px;
      top: 12px;
    }

    .input-records {
      background: none;
      color: #ebf479;
      border: 1px solid #eef3bc;
      text-align: left;
      outline: none;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      padding: 14px;
      width: 100%;
      border-radius: 16px;
      ::placeholder {
        color: rgba(235, 244, 121, 0.3);
      }
    }

    .input-button {
      width: 169px;
      height: 64px;
      border-radius: 16px;
      background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
      text-align: center;
      color: #02051e;
      flex-shrink: 0;
      cursor: pointer;
      vertical-align: middle;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }

  .quest-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .quest-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    text-align: left;
  }

  .view-all {
    color: #ecf488;
    border: 1px solid #ecf488;
    width: 100px;
    border-radius: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 14px;
    padding: 6px 0px;
    cursor: pointer;
    :hover {
      text-decoration: none;
    }
  }

  .execute-records {
    color: #ecf488;
    border: 1px solid #ecf488;
    width: 139px;
    border-radius: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 14px;
    padding: 6px 0px;
    :hover {
      text-decoration: none;
    }
  }

  .trend-card {
    width: 250px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    .trend-card-text {
      color: white;
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: center;

      .trend-card-text-number {
        color: #979abe;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
      }
    }

    .trend-card-dapp-name {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 6px;
      .trend-card-dapp-name-icon {
        width: 26px;
        height: 26px;
        border-radius: 8px;
      }

      .trend-card-dapp-name-text {
        color: #979abe;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
      }
    }
  }
`;

const CardListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${(props) => (props.isMyQuest ? "18px" : "32px")};
`;

const ArrowRight = (
  <svg
    width="16"
    height="8"
    viewBox="0 0 16 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464467C11.9763 0.269205 11.6597 0.269205 11.4645 0.464467C11.2692 0.659729 11.2692 0.976312 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM-4.37114e-08 4.5L15 4.5L15 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z"
      fill="#EBF479"
    />
  </svg>
);

const sender = Ethers.send("eth_requestAccounts", [])[0];

return (
  <Wrapper>
    <Widget src="guessme.near/widget/ZKEVMWarmUp.generage-uuid" />

    <div className="header">
      <div className="header-title">Participate In zkEVM Easily</div>

      <div className="header-description">
        Keep track of your activity and loyalty, make sure we are ready for any
        airdrop
      </div>
    </div>

    <Widget src="guessme.near/widget/ZKEVMWarmUp.input-search" />

    <div className="quest-title-wrapper">
      <div className="quest-title">
        {myQuestIcon}
        My Quest
      </div>

      <a
        href="/guessme.near/widget/ZKEVM.ExecuteRecords"
        className="execute-records"
      >
        Execute Records
      </a>
    </div>

    <Widget src="guessme.near/widget/ZKEVMWarmUp.quest-list" />

    <div className="quest-title-wrapper">
      <div className="quest-title">
        {trendIcon}
        Quest Trends{" "}
      </div>

      <a className="view-all" href="/guessme.near/widget/ZKEVM.QuestionList">
        <span>View All</span>
        {ArrowRight}
      </a>
    </div>

    <Widget src="guessme.near/widget/ZKEVMWarmUp.trend-list" />

    <div className="quest-title-wrapper">
      <div className="quest-title">
        {hotIcon}
        Hot ZkEvm DApps{" "}
      </div>
    </div>

    <CardListWrapper>
      <Widget
        src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
        props={{
          background: "linear-gradient(180deg, #8C36D8 0%, #24264C 100%)",
          dappName: "Polygon zkEVM All-in-one",
          creator: "guessme.near",
          widgetSrc: "guessme.near/widget/ZKEVMSwap.zkevm-swap",
          src: "https://assets.ref.finance/images/zkevm-swap.png",
        }}
      />
      <Widget
        src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
        props={{
          background: "linear-gradient(180deg, #7347DA 0%, #202445 100%)",
          dappName: "ZkEvm-bridge",
          creator: "guessme.near",
          widgetSrc: "guessme.near/widget/ZKEVMSwap.zkevm-bridge",
          src: "https://assets.ref.finance/images/zkevm-swap.png",
        }}
      />

      <Widget
        src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
        props={{
          background: "linear-gradient(180deg, #895C5C 0%, #343149 100%)",
          dappName: "Gamma",
          creator: "guessme.near",
          widgetSrc: "guessme.near/widget/ZKEVM.GAMMA",

          src: "https://assets.ref.finance/images/zkevm-swap.png",
        }}
      />

      <Widget
        src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
        props={{
          background: "linear-gradient(180deg, #4A80A7 0%, #343149 100%)",
          dappName: "AAVE v3",
          creator: "guessme.near",
          widgetSrc: "guessme.near/widget/ZKEVM.AAVE",
          src: "https://assets.ref.finance/images/zkevm-swap.png",
        }}
      />
    </CardListWrapper>
  </Wrapper>
);
