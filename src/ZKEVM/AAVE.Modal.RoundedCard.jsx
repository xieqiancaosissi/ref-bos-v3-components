const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  color:#7C7F96;
  margin-bottom: 10px;
`;

const Content = styled.div`
`;

return (
  <div>
    <Title>{props.title}</Title>
    <Content>{props.children}</Content>
  </div>
);
