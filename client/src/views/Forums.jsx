import React, { useState } from "react";
import { styles } from "../styles";
import axios from "axios";

export default class Forums extends React.Component {
  state = {
    forums: [],
  };

  // this may be supposed to be async
  getForumPosts = async () => {
    const url = "/api/forums";
    axios.get(url).then((res) => {
      // console.log("The data:", res.data);
      // const forums = res.data;
      this.setState({ forums: res.data });
    });
  };

  componentDidMount = () => {
    this.getForumPosts();
  };

  // Form Change Method
  isLoggedIn = () => {
    const currentUser = this.props.currentUser;
    return currentUser && currentUser.length !== 0;
  };

  // Update this to vary based on user log in
  render() {
    return (
      <section className="">
        <div className="py-4">
          <div className="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
            Viewing Forums
          </div>
        </div>
        <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-1 h-full g-6">
          <div class="w-full gap-2 ">
            <div className="grid grid-rows-4 grid-flow-col gap-2">
              {this.state.forums.map((forum) => (
                <div
                  key={forum}
                  className="border-2 border-gainsboro hover:border-black bg-camel"
                >
                  <div class=" ">{forum.post}</div>
                  <div class="felx items-end">
                    by: {forum.uuid} on date: {forum.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
