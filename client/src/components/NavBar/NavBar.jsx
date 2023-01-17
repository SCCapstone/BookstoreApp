import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav class="bg-persian_plum px-4 sm:px-6 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b-4 border-gray-200 dark:border-gray-600">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <span className="flex gap-8">
            <a href="/" class="flex items-center cols-span-8">
              <span class="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
                Book Store Website
              </span>
            </a>
          </span>
          <div class="flex md:order-2">
            <a href="/login" class="flex items-center">
              <span class="text-white text-xl">Login</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
