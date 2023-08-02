const { config } = props;
const ModalWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  background: rgba(0, 0, 0, 0.73);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 20px;
`;

const ModalContainer = styled.div`
  position:relative;
  width: 100%;
  background: #181A27;
  border-radius: 16px;
  border:1px solid #332C4B;

  @media (min-width: 640px) {
    width: 400px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 14px 18px 14px;

  img {
    cursor: pointer;
  }
`;

const CloseImage = () => (
  <img
    onClick={props.onRequestClose}
    height={20}
    width={20}
    src={`${config.ipfsPrefix}/bafkreibxrur3pqmc4pnf5yeutvr22q2cgbtov2prwcyuammf5hxazhl52e`}
  />
);

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color:#fff;
  font-size:18px;
`;

const ModalBody = styled.div`
  padding: 5px 14px 30px 14px;
`;
return (
  <ModalWrapper>
    <ModalContainer>
      <Header>
        <Title>{props.title}</Title>
        <CloseImage />
      </Header>
      <ModalBody>{props.children}</ModalBody>
    </ModalContainer>
  </ModalWrapper>
);
