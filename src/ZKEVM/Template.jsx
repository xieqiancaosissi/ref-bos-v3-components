
const Container = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:30px 36px;
  color:#fff;
`
const templates = [
  {
    src: 'guessme.near/widget/ZKEVMSwap.zkevm-bridge',
  },
  {
    src: 'guessme.near/widget/ZKEVMSwap.zkevm-swap',
  },
  {
    src: 'guessme.near/widget/ZKEVM.GAMMA',
  },
  {
    src: 'guessme.near/widget/ZKEVM.AAVE',
  }
]
return <Container>
  {
    templates.map(({src}, index) => <Widget src="guessme.near/widget/ZKEVM.Template-card" key={index} props={{
      src,
    }}/>)
  }
  
</Container>