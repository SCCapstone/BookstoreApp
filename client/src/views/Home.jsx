import { React } from "react";
import bookstore_logo from "../assets/bookstore_logo.jpg";

const Home = () => {


  return (
    <section class="">
      <div class="py-4">
        <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 max-w-[1400px]">
          Welcome
        </div>
      </div>
      <div class="pb-4 h-full text-gray-800">
        <div class="flex xl:justify-center lg:justify-between justify-center items-center h-full g-6">
          <div class="xl:ml-20 xl:w-8/12 lg:w-8/12 md:w-8/12 w-8/12 py-2 grid grid-rows-5 gap-2">
          <img
            src={bookstore_logo}
            alt="BookStore Logo"
            className="row-span-3"
          />
            <h2 className="text-2xl">
              Welcome to Bugsy's Barn Books! If You Love Books, You'll Love
              Our Book Store! This website is adopted by the Book Dispensary.
            </h2>
            <div className="bg-camel px-2 py-2 text-lg">
              <h2 className="text-xl font-bold">
                November 27th, 2022 - Weekly Newsletter
              </h2>
              <p>
                New Books will be coming in the next week. We will also be
                having a signing day for a very special author. STAY TUNED FOR
                MORE INFO!!
              </p>
            </div>
            <div className="bg-camel px-2 py-2 text-lg">
              <h2 className="text-xl font-bold">
                November 21st, 2022 - The Biggest Sale Ever Now Through New
                Years Day{" "}
              </h2>
              <p>
                40%, 60%, and 80% off on best sellers. Come in store today and
                get an additional 20% on your total purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
