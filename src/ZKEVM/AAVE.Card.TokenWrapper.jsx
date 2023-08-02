const TokenWrapper = styled.div`
  display: flex;
  align-items:center;

  img {
    margin-right: 10px;
  }

  .token-title {
    font-size: 16px;
    font-weight: bold;
    color:#fff;
  }

  .token-chain {
    font-size: 14px;
    font-weight: 500;
    color: #7C7F96
  }
`;

return <TokenWrapper>{props.children}</TokenWrapper>;
