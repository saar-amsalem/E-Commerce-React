import React from "react";
import styled from 'styled-components';
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { store } from "../redux/store";
import { getAllTimeSales, getOrderStats, getOrders } from "../redux/apiCalls";

// Styled components
const FeaturedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FeaturedItem = styled.div`
  flex: 1;
  margin: 0px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const FeaturedTitle = styled.span`
  font-size: 20px;
`;

const FeaturedMoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;

const FeaturedMoney = styled.span`
  font-size: 30px;
  font-weight: 600;
`;

const FeaturedMoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const FeaturedIcon = styled.span`
  font-size: 14px;
  margin-left: 5px;
  color: ${props => props.negative ? "red" : "green"};
`;

const FeaturedSub = styled.span`
  font-size: 15px;
  color: gray;
`;

export default function FeaturedInfo() {
  const [income, setIncome] = useState(0);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      const incomeResponse = await getOrderStats()
      if (incomeResponse.err) {
        alert(incomeResponse.message)
        return
      }
      console.log(incomeResponse.body);
      setIncome(incomeResponse.body[1].total);
      setPerc((incomeResponse.body[1].total) / (incomeResponse.body[0].total || 1));
    };
    getIncome();
    return () => {}
  }, []);

  return (
    <FeaturedContainer>
      <FeaturedItem>
        <FeaturedTitle>Revenue</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>${income}</FeaturedMoney>
          <FeaturedMoneyRate>
            %{Math.floor(perc)}
            {perc < 0 ? (
              <FeaturedIcon negative>
                <ArrowDownward />
              </FeaturedIcon>
            ) : (
              <FeaturedIcon>
                <ArrowUpward />
              </FeaturedIcon>
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Sales</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$4,415</FeaturedMoney>
          <FeaturedMoneyRate>
            -1.4 <FeaturedIcon negative><ArrowDownward /></FeaturedIcon>
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Cost</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$2,225</FeaturedMoney>
          <FeaturedMoneyRate>
            +2.4 <FeaturedIcon><ArrowUpward /></FeaturedIcon>
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
    </FeaturedContainer>
  );
}
