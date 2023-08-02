const { title, body, style, config } = props;

const CardsContainer = styled.div`
  border-radius: 16px;
  background: #181A27;
  padding: 20px 0;
  border:1px solid #332C4B;
`;

const CardsTitle = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 700;
  padding: 0 30px;
`;

return (
  <CardsContainer style={style}>
    <CardsTitle>{title}</CardsTitle>
    {body}
  </CardsContainer>
);
