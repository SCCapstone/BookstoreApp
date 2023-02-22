import { React, useRef, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { admin_menu_options, customer_menu_options, unvalidated_menu_options } from "./SideBarOptions";




const SideBar = ({ user }) => {

  let menu_options = unvalidated_menu_options;

  const [open, setOpen] = useState(true);

  console.log("Sidebar user: ", user);

  if (user && (user.role === "admin")) {
    console.log(user);
    menu_options = admin_menu_options;
  } else if (user && (user.role === "customer")) {
    menu_options = customer_menu_options;
  }

  // useRef(() => {
  //   if (user && user.length !== 0) {
  //     menu_options = admin_menu_options;
  //     console.log("login");
  //   } 
  // }, []);

  return (
    <aside className="w-64 " aria-label="Sidebar">
      <ul>
        <div
          className={` ${
            open ? "" : "-translate-x-full "
          } bg-dark-purple     relative duration-300`}
        >
          <IconContext.Provider value={{ color: "white", size: 36 }}>
            <IoMenuSharp
              className={`bg-black absolute cursor-pointer -right-9  border-black
           border-2   ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
          </IconContext.Provider>

          {menu_options.map((option) => (
            <div key={option}>
              <li>
                <a
                  href={option.link}
                  className={`flex items-center bg-polished_pine py-4 p-2 border-x-4 border-solid border-black font-normal text-gray-900 text-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    menu_options[menu_options.length - 1].name === option.name
                      ? "border-b-4 border-t-4"
                      : "border-t-4"
                  }`}
                >
                  <span>{option.name}</span>
                </a>
              </li>
            </div>
          ))}
        </div>
      </ul>
    </aside>
  );
};

export default SideBar;
