import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./Sales.css";
import { useEffect, useMemo, useState } from "react";
import { getOrderStats } from "../../redux/apiCalls";


export default function Sales() {
  const [orderStats, setOrderStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await getOrderStats()
        res.map((item) =>
          setOrderStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Sales": item.total }
          ]));
          console.log(res);
      } catch {}
    };
    getStats();
  }, [MONTHS]);


  
  
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={orderStats}
        title="Total sales"
        grid={true}
        dataKey="Sales"
      />
      <div className="homeWidgets">
      </div>
    </div>
  );
}
