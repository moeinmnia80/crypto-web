import { Layout } from "../../layouts/Layout.jsx";
import { useEffect, useState } from "react";
import { Search } from "../module/Search.jsx";
import { TableCoin } from "../module/TableCoin.jsx";
import { getCoinList } from "../../services/cryptoApi.js";
import { Pagination } from "../module/Pagination.jsx";
import { Chart } from "../module/Chart.jsx";
// api data

export function HomePage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [vs_currency, setVs_currency] = useState("usd");
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const res = await fetch(getCoinList(vs_currency, page));
        const jsonData = await res.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (e) {
        alert(e.message);
      }
    };
    getData();
    return () => {};
  }, [vs_currency, page]);

  return (
    <>
      <Layout>
        <Search vs_currency={vs_currency} setVs_currency={setVs_currency} />
        <TableCoin
          data={data}
          vs_currency={vs_currency}
          isLoading={isLoading}
          setChart={setChart}
        />
        <Pagination page={page} setPage={setPage} />
        {!!chart && <Chart chart={chart} setChart={setChart} />}
      </Layout>
    </>
  );
}
