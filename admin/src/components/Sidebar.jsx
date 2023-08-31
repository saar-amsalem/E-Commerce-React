import React, {useState} from "react";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const SidebarContainer = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 50px;
`;

const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;

const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;

const SidebarTitle = styled.h3`
  font-size: 13px;
  color: rgb(187, 186, 186);
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 5px;
`;

const SidebarListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;

  &:hover,
  &.active {
    background-color: rgb(240, 240, 255);
  }
`;

const SidebarIcon = styled.div`
  margin-right: 5px;
  font-size: 20px;
`;

export default function Sidebar() {

  const [activeItem, setActiveItem] = useState("")

  const handleItemClick = (itemName) => {
    setActiveItem(itemName) 
  }

  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarList>
            <Link to="/" className="link">
              <SidebarListItem className={activeItem === "Home" ? "active" : ""}
                                onClick={() => handleItemClick("Home")}>
                <SidebarIcon>
                  <LineStyle />
                </SidebarIcon>
                Home
              </SidebarListItem>
            </Link>
            <Link to="/analytics" className="link">
              <SidebarListItem className={activeItem === "Analytics" ? "active" : ""}
                                onClick={() => handleItemClick("Analytics")}>
                <SidebarIcon>
                  <Timeline />
                </SidebarIcon>
                Analytics
              </SidebarListItem>
            </Link>
            <Link to="/sales" className="link">
              <SidebarListItem className={activeItem === "Sales" ? "active" : ""}
                                onClick={() => handleItemClick("Sales")}>
                <SidebarIcon>
                  <TrendingUp />
                </SidebarIcon>
                Sales
              </SidebarListItem>
            </Link>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Quick Menu</SidebarTitle>
          <SidebarList>
            <Link to="/users" className="link">
              <SidebarListItem className={activeItem === "Users" ? "active" : ""}
                                onClick={() => handleItemClick("Users")}>
                <SidebarIcon>
                  <PermIdentity />
                </SidebarIcon>
                Users
              </SidebarListItem>
            </Link>
            <Link to="/products" className="link">
              <SidebarListItem className={activeItem === "Products" ? "active" : ""}
                                onClick={() => handleItemClick("Products")}>
                <SidebarIcon>
                  <Storefront />
                </SidebarIcon>
                Products
              </SidebarListItem>
            </Link>
            <Link to="/orders" className="link">
              <SidebarListItem className={activeItem === "Transactions" ? "active" : ""}
                                onClick={() => handleItemClick("Transactions")}>
                <SidebarIcon>
                  <AttachMoney />
                </SidebarIcon>
                Transactions
              </SidebarListItem>
            </Link>
            <Link to="/history" className="link">
              <SidebarListItem className={activeItem === "History" ? "active" : ""}
                                onClick={() => handleItemClick("History")}>
                <SidebarIcon>
                  <BarChart />
                </SidebarIcon>
                History
              </SidebarListItem>
            </Link>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Notifications</SidebarTitle>
          <SidebarList>
            <SidebarListItem>
              <SidebarIcon>
                <MailOutline />
              </SidebarIcon>
              Mail
            </SidebarListItem>
            <SidebarListItem>
              <SidebarIcon>
                <DynamicFeed />
              </SidebarIcon>
              Feedback
            </SidebarListItem>
            <SidebarListItem className={activeItem === "Messages" ? "active" : ""}
                                onClick={() => handleItemClick("Messages")}>
              <SidebarIcon>
                <ChatBubbleOutline />
              </SidebarIcon>
              Messages
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Staff</SidebarTitle>
          <SidebarList>
            <Link to="/contact" className="link">
              <SidebarListItem className={activeItem === "Manage Audience" ? "active" : ""}
                                onClick={() => handleItemClick("Manage Audience")}>
                <SidebarIcon>
                  <WorkOutline />
                </SidebarIcon>
                Manage Audience
              </SidebarListItem>
            </Link>
            <SidebarListItem>
              <SidebarIcon>
                <Timeline />
              </SidebarIcon>
              Analytics
            </SidebarListItem>
            <SidebarListItem>
              <SidebarIcon>
                <Report />
              </SidebarIcon>
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
}
