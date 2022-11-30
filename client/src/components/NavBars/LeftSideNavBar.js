import {
  LeftSideNavBarData,
  AdminLeftSideNavBarData,
} from "./LeftSideNavBarData";
import { Link } from "react-router-dom";

export default function LeftSideNavBar({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <div>
        {AdminLeftSideNavBarData.map((item, index) => {
          return (
            <li key={index} className={item.className}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        {LeftSideNavBarData.map((item, index) => {
          return (
            <li key={index} className={item.className}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </div>
    );
  }
}
