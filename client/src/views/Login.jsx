import React from "react";

export default function Login() {

  
  return (
    <>
      <section class="">
        <div class="pb-4 h-full text-gray-800 max-w-[1400px]">
          <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-3 h-full g-6">
            <div />
            <div class="w-full py-16 gap-2 ">
                <div class="pb-4">
                  <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
                  Login
                </div>
              </div>
              <form class="justify-center">
                <div class="mb-6">
                  <input
                    type="text"
                    class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid rounded focus:bg-white"
                    id=""
                    placeholder="Enter Username"
                  />
                </div>

                <div class="mb-6">
                  <input
                    type="password"
                    class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded focus:bg-white"
                    id=""
                    placeholder="Enter Password"
                  />
                </div>



                <div class="text-center lg:text-left grid pb-6">
                  <button
                    type="button"
                    class="inline-block px-10 py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
                  >
                    Login
                  </button>
                </div>

                <div class="flex justify-between items-center mb-6 grid grid-cols-2 gap-2">
                  <a
                    href="/create-account"
                    class="text-slate-800 font-semibold hover:text-black bg-polished_pine rounded p-3 border-2"
                  >
                    Register
                  </a>

                  <a
                    href="/forgot-password"
                    class="text-slate-800 font-semibold hover:text-black bg-polished_pine rounded p-3 border-2"
                  >
                    Forgot password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
