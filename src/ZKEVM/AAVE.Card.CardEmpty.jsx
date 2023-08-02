const { config } = props;

const CardEmpty = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  color:#7C7F96;
  font-weight:bold;
  font-size:16px;
  height:80px;
`;

return (
  <>
    <CardEmpty>{props.children}</CardEmpty>
  </>
);
