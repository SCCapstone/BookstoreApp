import  React  from "react";
import axios from "axios";

export default class Signup extends React.Component {
  state = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  setError(e){
    console.log(e);
  }



  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/users";
      const res = await axios.post(url, this.state);
      this.props.navigation.navigate("/login");
      console.log(res.message);
    } catch (error) {
      console.log(error);
      if (error.response?.status >= 400 && error.response.status <= 500) {
        this.setError(error.response.data.message);
      }
    }
  };

  render() {
    return (
      <>
        <section class="">
          <div class="pb-4 h-full text-gray-800 max-w-[1400px]">
            <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-3 h-full g-6">
              <div />
              <div class="w-full py-16 gap-2 ">
                <div class="pb-4">
                  <div class="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
                    Sign up
                  </div>
                </div>
                <form class="justify-center" onSubmit={this.handleSubmit}>
                  <div class="mb-6">
                    <input
                      type="text"
                      data="firstName"
                      class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid rounded focus:bg-white"
                      id=""
                      placeholder="First Name"
                    />
                  </div>

                  <div class="mb-6">
                    <input
                      type="text"
                      data="lastName"
                      class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid rounded focus:bg-white"
                      id=""
                      placeholder="Last Name"
                    />
                  </div>

                  <div class="mb-6">
                    <input
                      type="text"
                      data="email"
                      class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid rounded focus:bg-white"
                      id=""
                      placeholder="Email Address"
                    />
                  </div>

                  <div class="mb-6">
                    <input
                      type="password"
                      data="password"
                      class="form-control placeholder-black block w-full px-4 py-2 text-xl font-normal text-black bg-camel border border-solid border-black rounded focus:bg-white"
                      id=""
                      placeholder="Password"
                    />
                  </div>

                  <div class="text-center lg:text-left grid pb-6">
                    <button
                      type="submit"
                      class="inline-block px-10 py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
                    >
                      Login
                    </button>
                  </div>

                  <div class="flex justify-between items-center mb-6 grid grid-cols-2 gap-2">
                    Already have an account?
                    <a
                      href="/login"
                      class="text-center text-slate-800 font-semibold hover:text-black bg-polished_pine rounded p-2 border-2"
                    >
                      Login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
