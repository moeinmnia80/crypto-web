import styles from "./Chart.module.css";
import convertData from "../../helpers/convertData.js";
import React, { PureComponent } from "react";
import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Legend,
} from "recharts";

export function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");
  const {
    coin: { name, image, current_price, ath, market_cap },
  } = chart;
  return (
    <div className={styles.chart__modal}>
      <button onClick={() => setChart(null)} className={styles.modal__button}>
        X
      </button>
      <div className={styles.chart__table}>
        <div className={styles.table__header}>
          <img src={image} alt="coin" />
          <h1>{name}</h1>
        </div>
        <div className={styles.graph}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={300} data={convertData(chart, type)}>
              <CartesianGrid stroke={"#404042"} strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey={type}
                stroke="#3874ff"
                strokeWidth={".1rem"}
              />
              <YAxis dataKey={type} domain={["auto", "auto"]} />
              <XAxis dataKey={"date"} />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.table__buttons}>
          <button
            onClick={(e) => setType(e.target.value)}
            value="prices"
            className={type === "prices" ? styles.active : null}
          >
            Prices
          </button>
          <button
            onClick={(e) => setType(e.target.value)}
            value="market_caps"
            className={type === "market_caps" ? styles.active : null}
          >
            Market Caps
          </button>
          <button
            onClick={(e) => setType(e.target.value)}
            value="total_volumes"
            className={type === "total_volumes" ? styles.active : null}
          >
            Total Volumes
          </button>
        </div>
        <div className={styles.table__info}>
          <p>
            Price: <span>${current_price.toLocaleString()}</span>
          </p>
          <p>
            ATH: <span>${ath.toLocaleString()}</span>
          </p>
          <p>
            Market Cap: <span>${market_cap.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
