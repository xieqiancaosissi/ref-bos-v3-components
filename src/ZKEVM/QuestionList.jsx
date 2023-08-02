const Container = styled.div`
  .title {
    display: flex;
    align-items: center;
    padding-left: 0px;
    margin-top: 20px;
    img {
      width: 28px;
      margin-right: 10px;
    }
    span {
      font-size: 40px;
      color: #fff;
      font-weight: 700;
    }
  }
  .search-area {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    transform: translateY(-10px);
    .description {
      font-size: 20px;
      color: #979abe;
      font-weight: 500;
    }
    .search {
      display: flex;
      align-items: center;
      jusitfy-content: space-between;
      border-bottom: 1px solid #373a53;
      input {
        font-size: 20px;
        font-weight: 500;
        color: #fff;
        outline: none;
        background: none;
        border: none;
        &:focus {
          box-shadow: none;
        }
      }
    }
  }
  .noData {
    display: flex;
    justify-content: center;
    font-size: 18px;
    color: #4f5375;
    font-weight: 500;
    margin-top: 100px;
  }
`;
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px 20px;
  margin-top: 36px;
  .itemDiv {
    width: 250px;
  }
`;

const ListItem = styled.div`
  width: 250px;
  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 108px;
    border-radius: 20px;
    background-color: #373a53;
    padding: 12px 20px;
    &:hover {
      text-decoration: none;
    }
    .item-title {
      font-size: 16px;
      color: #fff;
      font-weight: 700;
      flex-wrap: wrap;
      text-align: center;
      .num {
        font-size: 14px;
        color: #979abe;
        margin: 0 3px;
      }
    }
    .platform {
      margin-top: 8px;
      img {
        width: 26px;
        height: 26px;
        margin-right: 5px;
      }
      span {
        font-size: 14px;
        color: #979abe;
      }
    }
  }
  .foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #979abe;
    margin-top: 12px;
    padding: 0 12px;
  }
`;

const Back = styled.a`
  display: flex;
  align-items: center;
  img {
    margin-right: 14px;
    cursor: pointer;
  }
  span {
    color: #979abe;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }
  &:hover {
    text-decoration: none;
  }
`;
State.init({
  hotActionList: [],
  searchActionList: [],
  keywords: ''
});
function get_hot_action_list() {
  asyncFetch(
    "https://bos-api.delink.one/get-hot-action?hot_number=20"
  ).then((res) => {
    const result = JSON.parse(res.body || {}).data || [];
    State.update({
      hotActionList: result,
      searchActionList: result,
    });
  });
}
if (state.hotActionList.length == 0) {
  get_hot_action_list();
}

function searchBykeyWords(e) {
  const value = e.target.value.toLowerCase();
  const search_result = state.hotActionList.filter((action) => {
    const { action_title } = action;
    return action_title.toLowerCase().includes(value);
  });
  State.update({
    searchActionList: search_result,
    keywords: value,
  });
}
function get_item_title(action) {
  const { action_title } = action;
  const title_low = action_title.toLowerCase();
  const key_low = state.keywords.toLowerCase();
  const start_key_index = title_low.indexOf(key_low);
  const end_key_index = start_key_index + key_low.length;
  
  const result = [];
  const arr = action_title.split(" ");
  arr.forEach((split) => {
    const start_split_index = action_title.indexOf(split);
    const end_split_index = start_split_index + split.length;
    const start_index = Math.max(start_key_index, start_split_index);
    const end_index = Math.min(end_key_index, end_split_index);
    if (end_index > start_index) { // hit
      result.push(<span style={{color:'#E9F456'}}>{split}</span>, ' ')
    } else { // not hit
      if (Number(split)) {
        result.push(<label className="num">{split}</label>, ' ')
      } else {
        result.push(split, ' ');
      } 
    }
  })
  return result;
}
const template_icons = {
  ZkEvm:
    "https://ipfs.near.social/ipfs/bafkreiftqxncp4pt36z5mcfzizbkccoufksmz2f4zhnproxv4krfb5qmsm",
  "ZkEvm-bridge":
    "https://ipfs.near.social/ipfs/bafkreigu2kdqzug45li74xcdhokazx7gv2yopml6x5bwrnjrkx2qsjrsni",
  AAVE: "https://ipfs.near.social/ipfs/bafkreibveumzusupe5rvk4nffzdipquvatfg5lagg7c6jaor2b3hgigw5e",
};

const SwapTokens = [
  {
    address: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
    chainId: 1101,
    symbol: "WETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
  },
  {
    address: "0xa2036f0538221a77a3937f1379699f44945018d0",
    chainId: 1101,
    symbol: "MATIC",
    extra: true,
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  },
  {
    address: "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",
    chainId: 1101,
    symbol: "DAI",
    extra: true,
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508",
  },
  {
    address: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
    chainId: 1101,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },

  {
    address: "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
    chainId: 1101,
    symbol: "USDT",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663",
  },
  {
    address: "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",
    chainId: 1101,
    symbol: "WBTC",
    decimals: 8,
    extra: true,
    logoURI:
      "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744",
  },
];
function get_link(action) {
  let link;
  const arr = action.action_title.split(/\s+/);
  const isBridge = arr[0].toLowerCase() === "bridge";
  const isSwap = arr[0].toLowerCase() === "swap";
  const isLending = ["repay", "supply", "borrow"].includes(
    arr[0].toLowerCase()
  );
  if (isBridge) {
    link = "/guessme.near/widget/ZKEVMSwap.zkevm-bridge?source=question_list";
  }
  if (isSwap) {
    link = "/guessme.near/widget/ZKEVMSwap.zkevm-swap?source=question_list";
  }
  if (isLending) {
    link = `/guessme.near/widget/ZKEVM.AAVE${
      arr[0].toLowerCase() == "supply" ? "" : "?tab=borrow"
    }`;
  }
  return link;
}
function onSaveParams(action) {
  const arr = action.action_title.split(/\s+/);
  const isBridge = arr[0].toLowerCase() === "bridge";
  const isSwap = arr[0].toLowerCase() === "swap";
  if (isBridge) {
    const [action_type, symbol, from, chain] = arr;
    Storage.set("zk-evm-bridge-params", {
      symbol,
      chain,
    });
    // console.log('symbol, chain', symbol, chain);
  }

  if (isSwap) {
    const [action_type, amount, symbol, on, dexName1, dexName2] = arr;
    const token = SwapTokens.find((item) => item.symbol === symbol);
    console.log("token: ", token);

    Storage.set("zk-evm-swap-params", {
      amount,
      symbol,
      dexName: dexName1 + (dexName2 ? " " + dexName2 : ""),
      assetId: token.address,
    });
    // console.log('amount, symbol, dexName, assetId', amount, symbol, dexName1 + (dexName2 ? " " + dexName2 : ""), token.address);
  }
}
return (
  <Container>
    <Back href="/warmup">
      <img src="https://ipfs.near.social/ipfs/bafkreig7ezlwthp2u6gsoifpvbsjcepuyvtx33uyjaentqwvcoh64unvd4"></img>
      <span>Back</span>
    </Back>
    <div className="title">
      <img src="https://ipfs.near.social/ipfs/bafkreiaerml7c2sfbojxg64lms25qappcgoevsrfmquxagfbowhm45gyey"></img>
      <span>Quest Trends</span>
    </div>
    <div className="search-area">
      <div className="description">Top 20 quest by users</div>
      <div className="search">
        <input onChange={searchBykeyWords}></input>
        <img src="https://ipfs.near.social/ipfs/bafkreia4oaaolx3jppkacw3rqxqtn66imuleqghejdq5xopmxjhtxflibm"></img>
      </div>
    </div>
    <List>
      {state.searchActionList.map((action) => {
        return (
          <ListItem>
            <div className="itemDiv" onClick={() => onSaveParams(action)}>
              <a className="body" href={get_link(action)}>
                <div className="item-title">{get_item_title(action)}</div>
                <div className="platform">
                  <img src={template_icons[action.template]}></img>
                  <span>{action.template}</span>
                </div>
              </a>
            </div>
            <div className="foot">
              <span>Total Execution</span>
              <span>{action.count_number}</span>
            </div>
          </ListItem>
        );
      })}
    </List>
    {state.searchActionList.length == 0 ? (
      <p className="noData">No result found</p>
    ) : null}
  </Container>
);
