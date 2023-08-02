
const Card = styled.div`
  border-radius:20px;
  background-color:#373A53;
  height:320px;
  width:500px;
`
const Banner = styled.a`
  img{
    width:100%;
    height:192px;
  }
  .replaceImg {
    width:100%;
    height:192px;
  }
`
const Metadata = styled.div`
    padding:0 15px 0 20px;
    .t{
      display:flex;
      .t-r{
        padding-top:10px;
        .title{
          font-size:20px;
          color:#fff;
          font-weight:bold;
        }
        .account{
          display:flex;
          align-items:center;
          gap:12px;
          .a-name{
            font-size:16px;
            color:#fff;
          }
        }
      }
    }
    .b{
      display:flex;
      justify-content:space-between;
      align-items:center;
      transform:translateY(-5px);
      .label{
        display:flex;
        align-items:center;
        gap:12px;
      }
      .hot{
        display:flex;
        align-items:center;
        gap:10px;
      }
    }
`
const Label = styled.div`
   border:1px solid rgba(255, 255, 255, 0.3);
   border-radius:30px;
   color:#fff;
   font-size:16px;
   padding:2px 16px;
   background-color:rgba(26, 46, 51, 0.25);
`
const Icon = styled.a`
    position:relative;
    top:-20px;
    padding:7px;
    display:inline-flex;
    border-radius:20px;
    background-color:#373A53;
    margin-right:8px;
    img{
        width:72px;
        height:72px;
    }
    .replaceImg{
      width:72px;
      height:72px;
    }

`
const { src } = props;
const [accountId, widget, widgetName] = src.split("/");
const metadata = Social.get(`${src}/metadata/**`,"final");
return <Card>
  <Banner href={`/${src}`}>
     {
      metadata.bannerImage.cid ? <img src={`https://ipfs.near.social/ipfs/${metadata.bannerImage.cid}`}></img> : <div className="replaceImg"></div>
     }
     
  </Banner>
  <Metadata>
     <div className="t">
      <Icon href={`/${src}`}>
        {
          metadata.image.ipfs_cid ? <img src={`https://ipfs.near.social/ipfs/${metadata.image.ipfs_cid}`}></img>: <div className="replaceImg"></div>
        }
        
      </Icon>
      <div className="t-r">
         <div className="title">{metadata.name || widgetName}</div>
         <div className="account">
         <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                accountId,
                style: {
                  height: "16px",
                  width: "16px",
                },
                imageStyle: {
                  verticalAlign: "unset",
                },
              }}
            />
          <span className="a-name">{accountId}</span>
         </div>
      </div>
     </div>
     <div className="b">
        <div className="label">
          {
            metadata.tags && Object.keys(metadata.tags).map((key) => <Label>{key}</Label>)
          }
        </div>
        <div className="hot">
          <img src="https://ipfs.near.social/ipfs/bafkreidey5fw6akzzi33hnqocyuk5a2saxra52nv3rzhlbpdzcfcwsziui"></img>
          <img src="https://ipfs.near.social/ipfs/bafkreidey5fw6akzzi33hnqocyuk5a2saxra52nv3rzhlbpdzcfcwsziui"></img>
          <img src="https://ipfs.near.social/ipfs/bafkreidey5fw6akzzi33hnqocyuk5a2saxra52nv3rzhlbpdzcfcwsziui"></img>
        </div>
     </div>
  </Metadata>
</Card>