const { headers, data, config } = props;

if (!headers || !data) {
  return null;
}

const CardsTable = styled.div`
  margin-top: 20px;
  padding: 0 30px;

  width: 100%;

  table {
    width: 100%;
  }

  thead {
    color: #7C7F96;
    font-size: 16px;
    font-weight: 500;
  }
  tr td {
    padding: 15px 0;
  }
  .primaryStyle{
    font-weight: 500;
    font-size:16px;
    color:#fff;
  }
  .token-balance-value{
    font-size:14px;
    color:#7C7F96;
  }

  display: none;
  @media (min-width: 640px) {
    display: table;
  }
`;
return (
  <>
    <CardsTable>
      <table>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rows, idx) => (
            <tr key={idx}>
              {rows.map((data, idx) => (
                <td key={idx}>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </CardsTable>
  </>
);
