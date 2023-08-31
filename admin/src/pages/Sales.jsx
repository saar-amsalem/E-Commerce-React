import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import { getAllTimeSales, getOrderStats } from "../redux/apiCalls";

const HomeContainer = styled.div`
  flex: 4;
`;

const HomeWidgets = styled.div`
  display: flex;
  margin: 20px;
`;

const Sales = () => {
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
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
        const res = await getAllTimeSales();
        console.log(res);
        if (res.err) {
          alert(res.message)
          return
        }
        res.body.map((item) =>
          setOrderStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
    };
    getStats();
    return () => {}
  }, [MONTHS]);

  return (
    <HomeContainer>
      <FeaturedInfo />
      <Chart data={orderStats} title="Total sales" grid={true} dataKey="Sales" />
      <HomeWidgets>{/* Add your widgets here */}</HomeWidgets>
    </HomeContainer>
  );
};

export default Sales;
