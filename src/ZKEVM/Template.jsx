
const Container = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:30px 36px;
  color:#fff;
`
const templates = [
  {
    src: 'guessme.near/widget/ZKEVMSwap.zkevm-bridge',
    bannerImg: 'https://ipfs.near.social/ipfs/bafkreievrd4imhglvabvg2vgcqxmpk4vog6p3dw5cy3rsay4ocsyu3y7w4',
  },
  {
    src: 'guessme.near/widget/ZKEVMSwap.zkevm-swap',
    bannerImg: 'https://ipfs.near.social/ipfs/bafkreihwkwijwsazh5dp3rxc2lwgi4algusd3b447o3xcfcnndbgaura3q',
  },
  {
    src: 'guessme.near/widget/ZKEVM.GAMMA',
    bannerImg: 'https://ipfs.near.social/ipfs/bafkreih77ecmgng2fpy6mblk2aipt3agwm3anjldcyktx2j6kssggpelue',
  },
  {
    src: 'guessme.near/widget/ZKEVM.AAVE',
    bannerImg: 'https://ipfs.near.social/ipfs/bafkreibmqzfwki7zye6ruqi3hifgexs6g5nv4qvzcmrm73lnra5mbkdrxe',
  }
]
return <Container>
  {
    templates.map(({src, bannerImg}, index) => <Widget src="guessme.near/widget/ZKEVM.Template-card" key={index} props={{
      src,
      bannerImg,
    }}/>)
  }
  
</Container>