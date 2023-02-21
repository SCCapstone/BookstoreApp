import React, { useState } from "react";
import { styles } from "../styles";
import axios from "axios";
import forums from "./ForumsExample";

function getUsername(userID) {
    // from the UUID of the user, get their name
    // if they can't find the user, like reddit, just say [deleted]
    // going to have to talk to the backend and connect this to Mongo
    if (false) {
        // this is where the mongo talk is going to happen
        // then, find firstName + Lastname and return it as String
    }
    return "[deleted]";
};

export default class Forums extends React.Component {
  const [data, setData] = useState({
    message: "";
  })

  state = {
    currentUser: "",
    // some kind of "current forum" state
    currentForum: "",
    forums: forums,
  };

  // this may be supposed to be async
  async getForumPosts() {
    const url = "localhost:3001/api/forumsdata";
    axios.get(url).then((res) => {
      console.log("The data:", res.data);
      // const forums = res.data;
      this.setState({ currentUser: this.props.currentUser });
    });
  };

  async postForumPost() {
    const url = "localhost:3001/api/forumsdata";
    const text = this.state.currentForum;
    const uuid = "1234567890";
    const posterUUID = this.props.currentUser.firstName;
    const theForum = {
      postingUserID: posterUUID,
      post: text,
      date: (new Date()),
      uuid: uuid,
    }
    console.log(theForum);
    await axios.post(url, theForum).then(() => {
      window.location.reload();
    }).catch((error) => console.log("Error with posting: ", error));
  }

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({currentForum: e.target.value}, this.handleSubmit);
    // console.log(this.state);
    // BUG: This is only called when the state is changed,
    // so it's always one character behind whatever the user is posting.
  }

  componentDidMount = () => {
    // this.getForumPosts();
  }

  isLoggedIn = () => {
    const currentUser = this.props.currentUser;
    return currentUser && currentUser.length !== 0;
  }

  render() { return(
    <section className="">
      <div className="py-4">
        <div className="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
          Forums
        </div>
      </div>
      <form onSubmit={this.postForumPost}>
            <div>
              <label>What book are you reading, and what would you like to share about it? </label>
              <textarea
                name="message"
                onChange={this.handleChange}
                className="form-control placeholder-black block w-full px-4 py-6 text-xl font-normal text-black bg-camel focus:bg-white border border-solid border-black rounded"
              />
            </div>
            <div className="py-2">
              <input
                type="submit"
                value="Post"
                className="inline-block px-10 py-3 bg-persian_plum font-semibold text-white font-medium leading-snug uppercase rounded"
              />
            </div>
        </form>
      <div class="flex xl:justify-center lg:justify-between justify-center items-center grid grid-cols-1 h-full g-6">
        <div class="w-full gap-2 ">
        <div className="grid grid-rows-4 grid-flow-col gap-2">
          {this.state.forums.map((forum) => (
            <div key={forum} className="border-2 border-gainsboro hover:border-black bg-camel">
              <a href={`${forum.link}`}>
                <div class=" ">{forum.post}</div>
                <div class="felx items-end">by: {getUsername(forum.uuid)}</div>
              </a>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
    )
          }
        }
