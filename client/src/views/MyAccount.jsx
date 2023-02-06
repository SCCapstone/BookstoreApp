import React from "react";
const MyAccount = () => {
    return (
        <section class="">
            <div class="py-4">
                <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
                     MyAccount
                </div>
            </div>

            <div class="pb-4 h-full text-gray-800">
                <div class="flex xl:justify-center lg:justify-between justify-center items-center h-full g-6">
                    <div class="xl:ml-20 xl:w-8/12 lg:w-8/12 md:w-8/12 w-8/12 py-2 grid grid-rows-5 gap-2">
                        <h4 className="text-2xl">
                            My Profile Settings
                        </h4> 
                    </div>
                </div>
            </div>

            <div class="pb-4 h-full text-gray-800">
                <div class="flex xl:justify-center lg:justify-between justify-center items-center h-full g-6">
                    <div class="xl:ml-20 xl:w-8/12 lg:w-8/12 md:w-8/12 w-8/12 py-2 grid grid-rows-5 gap-2">
                        <h2 className="text-2xl">
                            Full Name:" ";
                            Username: " ";
                            Email Address: " ";
                        </h2>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default MyAccount;
