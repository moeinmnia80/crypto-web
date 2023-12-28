import styles from "./Search.module.css";
import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi.js";
import { RotatingLines } from "react-loader-spinner";
export const Search = ({ vs_currency, setVs_currency }) => {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const jsonData = await res.json();
        if (jsonData.coins) {
          setCoins(jsonData.coins);
          setIsLoading(false);
        } else {
          alert(jsonData.status.error_message);
        }
        console.log(jsonData.coins);
      } catch (e) {
        if (e.name !== "AbortError") {
          alert(e.message);
        }
      }
    };

    setIsLoading(true);
    search();

    return () => controller.abort();
  }, [text]);
  return (
    <div className={styles.search}>
      <label htmlFor="serach-input" className={styles.search__label}>
        <input
          type="text"
          name="search"
          id="serach-input"
          placeholder="search coin"
          className={styles.search__input}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <select
        name="select"
        value={vs_currency}
        onChange={(e) => setVs_currency(e.target.value)}
        className={styles.select}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || isLoading) && (
        <div className={styles.search__bar}>
          {isLoading && (
            <div className={styles.loader}>
              <RotatingLines strokeWidth="2" />
            </div>
          )}
          <ul>
            {!!coins.length &&
              coins.map((coin) => (
                <li>
                  <img src={coin.thumb} alt="coin" />
                  <p>{coin.name}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
