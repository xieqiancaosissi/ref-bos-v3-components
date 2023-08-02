const { config, select, setSelect } = props;

const TabContainer = styled.div`
  background: #222436;
  display: flex;
  padding: 2px;
  border-radius: 12px;
  border:1px solid #332C4B;
  gap:2px;
`;

const TabItem = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  height: 42px;
  width:140px;
  border-radius: 10px;
  color:#fff;
  font-weight:500;
  font-size:18px;
  ${(props) => props.selected && "background: #794FDD;"}
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.3;
    cursor: not-allowed;
  `}
  transition: all 0.3s ease-in-out;
  ${(props) =>
    !props.selected &&
    `
    cursor: pointer;
    &:hover {
      background: #794FDD;
      opacity: 0.7;
    }
  `}
`;

return (
  <TabContainer>
    <TabItem selected={select === "supply"} onClick={() => setSelect("supply")}>
      Supply
    </TabItem>
    <TabItem selected={select === "borrow"} onClick={() => setSelect("borrow")}>
      Borrow
    </TabItem>
  </TabContainer>
);
