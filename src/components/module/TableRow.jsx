import styles from "./TableCoin.module.css";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { marketChart } from "../../services/cryptoApi.js";

export function TableRow({ coin, vsHandler, setChart }) {
  const {
    id,
    name,
    image,
    symbol,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
    ath,
    market_cap,
  } = coin;
  const selectHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const jsonData = await res.json();
      setChart({ ...jsonData, coin });
    } catch (e) {
      setChart(null);
    }
  };
  return (
    <>
      <tr>
        <td onClick={selectHandler}>
          <img src={image} alt="" className={styles.coin__image} />
          <p>{symbol.toUpperCase()}</p>
        </td>
        <td>{name}</td>
        <td>
          {vsHandler()} {current_price.toLocaleString()}
        </td>
        <td style={{ color: price_change > 0 ? "green" : "red" }}>
          {price_change.toFixed(2)}%
        </td>
        <td>
          {vsHandler()}
          {total_volume.toLocaleString()}
        </td>
        <td>
          <img src={price_change > 0 ? chartUp : chartDown} alt="" />
        </td>
      </tr>
    </>
  );
}
