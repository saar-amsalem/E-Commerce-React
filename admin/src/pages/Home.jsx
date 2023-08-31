import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import WidgetSm from "../components/WidgetSm";
import WidgetLg from "../components/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { getUserStats } from "../redux/apiCalls";
import styled from "styled-components";

const HomeContainer = styled.div`
  flex: 4;
`;

const HomeWidgets = styled.div`
  display: flex;
  margin: 20px;
`;

export default function Home() {
  const [userStats, setUserStats] = useState([]);

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
        const res = await getUserStats();
        if (res.err) {
          alert(res.message)
          return
        }
        res.body.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
    };
    getStats();
  }, [MONTHS]);

  return (
    <HomeContainer>
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid={true}
        dataKey="Active User"
      />
      <HomeWidgets>
        <WidgetSm />
        <WidgetLg />
      </HomeWidgets>
    </HomeContainer>
  );
}
