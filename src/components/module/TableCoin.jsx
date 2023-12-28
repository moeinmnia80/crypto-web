import styles from "./TableCoin.module.css";
import { TableRow } from "./TableRow.jsx";
import { RotatingLines } from "react-loader-spinner";
export const TableCoin = ({
  vs_currency,
  data,
  isLoading,
  setChart,
  setCoin,
}) => {
  const vsHandler = () => {
    if (vs_currency === "usd") {
      return "$";
    } else if (vs_currency === "eur") {
      return "€";
    } else {
      return "¥";
    }
  };
  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <RotatingLines strokeWidth="2" />
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <TableRow
                coin={d}
                vsHandler={vsHandler}
                key={d.id}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
