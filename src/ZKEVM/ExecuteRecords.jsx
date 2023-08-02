const Container = styled.div`
  .pageTitle {
    display: flex;
    align-items: center;
    margin-top: 14px;
    img {
      margin-right: 14px;
    }
    span {
      font-size: 32px;
      color: #fff;
      font-weight: 700;
    }
  }
  .recordList {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #332c4b;
    background-color: #181a27;
    padding-top: 12px;
    border-radius: 16px;
    margin-top: 20px;
    min-height: 200px;
    table {
      width: 100%;
      tbody tr:hover {
        background-color: #373a53;
      }
      tr th {
        color: #91a2ae;
        font-size: 14px;
        height: 34px;
        border-bottom: 1px solid #332c4b;
        .arrow {
          cursor: pointer;
        }
      }
      tr td {
        color: #fff;
        height: 42px;
        font-size: 14px;
      }
      tr th:nth-child(1),
      tr td:nth-child(1) {
        padding-left: 22px;
      }
      tr th:nth-last-child(1),
      tr td:nth-last-child(1) {
        padding-right: 22px;
      }
      tr .head_th {
        position: relative;
        display: inline-flex;
        cursor: pointer;
        .select {
          display: none;
          position: absolute;
          width: 190px;
          border-radius: 16px;
          background-color: #373a53;
          padding: 10px;
          top: 26px;
          left: -20px;
          &.show {
            display: block;
          }
          &.hide {
            display: none;
          }
          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 36px;
            border-radius: 10px;
            padding: 0 12px;
            font-size: 14px;
            color: #fff;
            font-weight: 400;
            cursor: pointer;
            margin: 5px 0;
            .template_item{
              dispplay:flex;
              align-items:center;
              img{
                margin-right:10px;
              }
            }
            .selected_icon {
              display: none;
            }
            &:hover,
            &.active {
              background-color: rgba(24, 26, 39, 0.3);
            }
            &.active .selected_icon {
              display: block;
            }
          }
        }
      }
    }
    .emptyText {
      display: flex;
      justify-content: center;
      font-size: 18px;
      color: #4f5375;
      font-weight: 500;
    }
    .page {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 42px;
      border-top: 1px solid #332c4b;
      font-size: 14px;
      color: #91a2ae;
      gap: 6px;
      padding: 0 16px;
      .cur_page {
        position: relative;
        top: 1px;
        margin: 0 10px;
      }
      svg {
        cursor: pointer;
      }
      .disabled {
        opacity: 0.3;
        svg {
          cursor: not-allowed;
        }
      }
    }
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
const left_most_icon = (
  <svg
    width="10"
    height="13"
    viewBox="0 0 10 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M2.77733 5.77071C2.35628 6.16574 2.35628 6.83426 2.77733 7.22928L6.31579 10.5491C6.95436 11.1482 8 10.6954 8 9.81976L8 3.18023C8 2.30462 6.95436 1.85185 6.31579 2.45095L2.77733 5.77071Z"
        fill="#7E8A93"
      />
      <path
        d="M1 3V10"
        stroke="#7E8A93"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);
const left_icon = (
  <svg
    width="6"
    height="9"
    viewBox="0 0 6 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.777329 3.77071C0.356276 4.16574 0.356276 4.83426 0.777328 5.22928L4.31579 8.54905C4.95436 9.14816 6 8.69538 6 7.81976L6 1.18023C6 0.304619 4.95436 -0.148155 4.31579 0.450951L0.777329 3.77071Z"
      fill="#7E8A93"
    />
  </svg>
);

const right_most_icon = (
  <svg
    width="10"
    height="13"
    viewBox="0 0 10 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.22267 5.77071C7.64372 6.16574 7.64372 6.83426 7.22267 7.22928L3.68421 10.5491C3.04564 11.1482 2 10.6954 2 9.81976L2 3.18023C2 2.30462 3.04564 1.85185 3.68421 2.45095L7.22267 5.77071Z"
      fill="#7E8A93"
    />
    <path
      d="M9 3V10"
      stroke="#7E8A93"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const right_icon = (
  <svg
    width="6"
    height="9"
    viewBox="0 0 6 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.22267 3.77071C5.64372 4.16574 5.64372 4.83426 5.22267 5.22928L1.68421 8.54905C1.04564 9.14816 -4.6751e-07 8.69538 -4.29236e-07 7.81976L-1.39013e-07 1.18023C-1.00738e-07 0.304619 1.04564 -0.148155 1.68421 0.450951L5.22267 3.77071Z"
      fill="#7E8A93"
    />
  </svg>
);

const arrow_down_icon = (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.70705 5.29289C5.31653 5.68342 4.68336 5.68342 4.29284 5.29289L0.707053 1.70711C0.0770878 1.07714 0.523254 -9.15906e-07 1.41416 -8.38021e-07L8.58573 -2.11062e-07C9.47664 -1.33177e-07 9.9228 1.07714 9.29284 1.70711L5.70705 5.29289Z"
      fill="#91A2AE"
    />
  </svg>
);

const selected_icon = (
  <svg
    width="12"
    height="9"
    viewBox="0 0 12 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 2.84615L4.47826 7L11 1"
      stroke="#9E75FF"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const copy_icon = (
  <svg
    width="11"
    height="12"
    viewBox="0 0 11 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="3" width="7" height="8" rx="2" stroke="#5285DF" />
    <path
      d="M2.72754 3.27246L2.72754 3C2.72754 1.89543 3.62297 1 4.72754 1H7.99941C9.10398 1 9.99941 1.89543 9.99941 3V7.36288C9.99941 8.36692 9.18548 9.18085 8.18144 9.18085V9.18085"
      stroke="#5285DF"
    />
  </svg>
);
const template_icons = {
  ZkEvm:
    "https://ipfs.near.social/ipfs/bafkreiftqxncp4pt36z5mcfzizbkccoufksmz2f4zhnproxv4krfb5qmsm",
  "ZkEvm-bridge":
    "https://ipfs.near.social/ipfs/bafkreigu2kdqzug45li74xcdhokazx7gv2yopml6x5bwrnjrkx2qsjrsni",
  AAVE: "https://ipfs.near.social/ipfs/bafkreibveumzusupe5rvk4nffzdipquvatfg5lagg7c6jaor2b3hgigw5e",
};
const select_action_list = [
  { id: "", name: "All Actions" },
  { id: "Swap", name: "Swap" },
  { id: "Bridge", name: "Bridge" },
  { id: "Lending", name: "Lending" },
  // {id: 'Staking', name: 'Staking'},
];
const select_template_list = [
  { id: "", name: "All Templates"},
  { id: "ZkEvm", name: "ZkEvm", icon: template_icons['ZkEvm'] },
  { id: "ZkEvm-bridge", name: "Bridge", icon: template_icons['ZkEvm-bridge'] },
  { id: "AAVE", name: "AAVE", icon: template_icons['AAVE'] },
];
console.log('select_template_list', select_template_list);
const select_status_list = [
  { id: "", name: "All Status" },
  { id: "Success", name: "Success" },
  { id: "Failed", name: "Failed" },
];
State.init({
  record_list: [],
  action_select_box_status: false, // true 显示， false 关闭
  template_select_box_status: false, // true 显示， false 关闭
  status_select_box_status: false, // true 显示， false 关闭

  search_action: "",
  search_template: "",
  search_status: "",
  total_page_size: "",
  total_page: 1,
  current_page: 1,
  page_size: 20,
});
const eth_account_id = Ethers.send("eth_requestAccounts", [])[0];
function get_my_records_list_by_condition() {
  // account_info todo
  const params_str = `account_id=${eth_account_id}&page_number=${state.current_page}&page_size=${state.page_size}&action_type=${state.search_action}&action_status=${state.search_status}&template=${state.search_template}&account_info=`;
  asyncFetch(
    `https://bos-api.delink.one/get-action-records-by-account?${params_str}`
  ).then((res) => {
    const { action_list, page_number, total_page, total_size } =
      JSON.parse(res.body || {}).data || {};

    State.update({
      record_list: action_list,
      total_page_size: total_size,
      total_page,
      current_page: page_number,
    });
  });
}
function get_current_page_range() {
  const start = (state.current_page - 1) * state.page_size + 1;
  const end = start - 1 + state.record_list.length;
  return `${Math.min(start, end)}-${end}`;
}
if (eth_account_id) {
  get_my_records_list_by_condition();
}
function getTime(timestamp) {
  var myDate = new Date(Big(timestamp).mul(1000).toNumber());
  var year = myDate.getFullYear();
  var month = Number(myDate.getMonth() + 1) + "";
  var date = myDate.getDate() + "";
  var hour =
    myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours();
  var minute =
    myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
  var second =
    myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
  if (date.length == 1) {
    date = "0" + date;
  }
  if (month.length == 1) {
    month = "0" + month;
  }
  return (
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second +
    "  "
  );
}
let timer;
const duration = 500;
function click_left_most() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    State.update({
      current_page: 1,
    });
  }, duration);
}
function click_left() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (state.current_page - 1 >= 1) {
      State.update({
        current_page: state.current_page - 1,
      });
    }
  }, duration);
}
function click_right() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (state.current_page + 1 <= state.total_page) {
      State.update({
        current_page: state.current_page + 1,
      });
    }
  }, duration);
}
function click_right_most() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    State.update({
      current_page: state.total_page,
    });
  }, duration);
}
function switch_action_select() {
  State.update({
    action_select_box_status: !state.action_select_box_status,
    template_select_box_status: false,
    status_select_box_status: false,
  });
}
function switch_template_select() {
  State.update({
    template_select_box_status: !state.template_select_box_status,
    action_select_box_status: false,
    status_select_box_status: false,
  });
}
function switch_status_select() {
  State.update({
    status_select_box_status: !state.status_select_box_status,
    action_select_box_status: false,
    template_select_box_status: false,
  });
}
function displayTx(tx) {
  // EsdWX6...mLsG
  if (tx && tx.length > 10) {
    return tx.slice(0, 6) + "..." + tx.slice(tx.length - 4);
  }
  return tx;
}
function goTxDetail(record) { // todo
  if (record.tx_id) {
    if (record.template == 'Ethereum') {
      const isMainnet = true;
      return `https://${isMainnet ? "" : "goerli."}etherscan.io/tx/${
        record.tx_id
      }`;
    } else {
      let isMainnet = true;
      if (record.template == 'AAVE') {
        isMainnet = false;
      }
      return `https://${
        isMainnet ? "" : "testnet-"
  
      }zkevm.polygonscan.com/tx/${record.tx_id}`
    }
  }
  return "";
}
const Status = styled.span`
  color: ${(props) => (props.status == "Success" ? "#93FFCB" : "#7C7F96")};
`;
const Tx = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  a {
    text-decoration: underline;
    color: #fff;
    font-size: 14px;
  }
  a:hover {
    color: #fff;
  }
  .copy {
    cursor: pointer;
  }
`;
return (
  <Container>
    <Back href="/warmup">
      <img src="https://ipfs.near.social/ipfs/bafkreig7ezlwthp2u6gsoifpvbsjcepuyvtx33uyjaentqwvcoh64unvd4"></img>
      <span>Back</span>
    </Back>
    <div className="pageTitle">
      <img src="https://ipfs.near.social/ipfs/bafkreia7hmyccnbvwwx6abuohry4xbjnmsg2bslip7tdns6jx5xg2vpbde"></img>
      <span className="">My Execute Records</span>
    </div>
    <div className="recordList">
      <table>
        <thead>
          <tr>
            <th>Quest</th>
            <th>
              <div
                className="head_th"
                onClick={(e) => {
                  switch_action_select(e);
                }}
              >
                Action
                <span className="arrow" style={{ marginLeft: "8px" }}>
                  {arrow_down_icon}
                </span>
                <div
                  className={`select ${
                    state.action_select_box_status ? "show" : "hide"
                  }`}
                >
                  {select_action_list.map((item) => {
                    return (
                      <div
                        key={item.name}
                        onClick={() => {
                          State.update({
                            search_action: item.id,
                            current_page: 1,
                          });
                        }}
                        className={`item ${
                          state.search_action == item.id ? "active" : ""
                        }`}
                      >
                        {item.name}
                        <span className="selected_icon">{selected_icon}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </th>
            <th>
              <div className="head_th" onClick={switch_template_select}>
                Template
                <span className="arrow" style={{ marginLeft: "5px" }}>
                  {arrow_down_icon}
                </span>
                <div
                  className={`select ${
                    state.template_select_box_status ? "show" : "hide"
                  }`}
                >
                  {select_template_list.map((item) => {
                    return (
                      <div
                        key={item.name}
                        onClick={() => {
                          State.update({
                            search_template: item.id,
                            current_page: 1,
                          });
                        }}
                        className={`item ${
                          state.search_template == item.id ? "active" : ""
                        }`}
                      >
                        <div className="template_item">
                          {
                            item.icon ? <img src={item.icon} width={16} height={16}></img>:null
                          }
                          {item.name}
                         </div>
                        <span className="selected_icon">{selected_icon}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </th>
            {/* <th>
              <div className="head_th" onClick={switch_status_select}>
                Status
                <span className="arrow" style={{ marginLeft: "5px" }}>
                  {arrow_down_icon}
                </span>
                <div
                  className={`select ${
                    state.status_select_box_status ? "show" : "hide"
                  }`}
                >
                  {select_status_list.map((item) => {
                    return (
                      <div
                        key={item.name}
                        onClick={() => {
                          State.update({
                            search_status: item.id,
                            current_page: 1,
                          });
                        }}
                        className={`item ${
                          state.search_status == item.id ? "active" : ""
                        }`}
                      >
                        {item.name}
                        <span className="selected_icon">{selected_icon}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </th> */}
            <th>Time</th>
            {/* <th>Tx</th> */}
          </tr>
        </thead>
        <tbody>
          {state.record_list && state.record_list.map((record, index) => {
            return (
              <tr key={index}>
                <td>{record.action_title}</td>
                <td>{record.action_type}</td>
                <td>
                  <img
                    width="16"
                    height="16"
                    src={template_icons[record.template]}
                    style={{ marginRight: "6px" }}
                  ></img>
                  {record.template}
                </td>
                {/* <td>
                  <Status status={record.action_status}>
                    {record.action_status}
                  </Status>
                </td> */}
                <td>{getTime(record.timestamp)}</td>
                {/* <td>
                  <Tx>
                    <a href={goTxDetail(record)} target="_blank">{displayTx(record.tx_id)}</a>
                    {record.tx_id ? (
                      <span
                        onClick={() => {
                          clipboard.writeText(record.tx_id);
                        }}
                        className="copy"
                      >
                        {copy_icon}
                      </span>
                    ) : null}
                  </Tx>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {state.record_list.length == 0 ? (
        <div className="emptyText">No result found</div>
      ) : null}

      <div className="page">
        <span
          className={`${state.current_page == 1 ? "disabled" : ""}`}
          onClick={click_left_most}
        >
          {left_most_icon}
        </span>
        <span
          className={`${state.current_page == 1 ? "disabled" : ""}`}
          onClick={click_left}
        >
          {left_icon}
        </span>
        <span className="cur_page">
          {get_current_page_range()} of {state.total_page_size}
        </span>
        <span
          className={`${
            state.current_page == state.total_page ? "disabled" : ""
          }`}
          onClick={click_right}
        >
          {right_icon}
        </span>
        <span
          className={`${
            state.current_page == state.total_page ? "disabled" : ""
          }`}
          onClick={click_right_most}
        >
          {right_most_icon}
        </span>
      </div>
    </div>
  </Container>
);
