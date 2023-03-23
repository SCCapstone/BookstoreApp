import { React } from "react";
import bookstore_logo from "../assets/bookstore_logo.jpg";
import EditBlogList from "./EditBlogList";

const Home = () => {
  return (
    <section>
      <div className="py-4">
        <div className="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 max-w-[1400px]">
          Welcome
        </div>
      </div>
      <div className="pb-4 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center h-full g-6">
          <div className="xl:ml-20 xl:w-8/12 lg:w-8/12 md:w-8/12 w-8/12 py-2 grid grid-rows-5 gap-2">
            <img
              src={bookstore_logo}
              alt="BookStore Logo"
              className="row-span-4 max-w-[400px]"
            />
            <h2 className="text-2xl">
              Welcome to Bugsy's Barn Books! If You Love Books, You'll Love Our
              Book Store! This website is adopted by the Book Dispensary.
            </h2>
            <EditBlogList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
