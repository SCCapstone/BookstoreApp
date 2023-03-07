import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert2';

class CreateForum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      book: '',
      user: '',
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = "/api/users/" + localStorage.getItem("userID");
      await axios.get(url).then(res => {
          let user = res.data;
          user.password = "";
          this.setState((state) => ({
              user: user 
          }));
      });
  }

  handleChange(event) {
    this.setState({message: event.target.message});
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
    const url = "/api/forums";
    const name = this.state.user.firstName + " " + this.state.user.lastName;
    const forum = {
      post: this.state.message,
      name: name,
      date: Date().toString(),
    }
    console.log(this.forum)
    try {
      axios.post(url, forum).then(res => {
        if (res.status === 200) {
          swal.fire({
            icon: 'success',
            title: 'Successfully posted forum!'
          })
        }
      })
    } catch(except) {
      swal.fire({
        icon: 'error',
        title: 'Try again later'
      })
    }
  }

  //   const [data, setData] = useState({
  //       message: "",
  //       name: "",
  //     });

  //   const [error, setError] = useState("");

  //   const handleChange = (e) => {
  //       const { name, value } = e.target;
  //       setData({
  //       ...data,
  //       [name]: value,
  //       });
  //   }
  // // Form Change Method
  //   const handleSubmit = async(e) => {
  //       e.preventDefault();
  //       const url = "/api/forums";
  //       const text = data.message;
  //       const uuid = data.name;
  //       const theForum = {
  //           post: text,
  //           date: Date().toString(),
  //           uuid: uuid,
  //       }
  //       console.log(theForum);
  //       const res = await axios.post(url, theForum);
  //       swal.fire({
  //         icon: 'success',
  //         title: 'Forum posted successfully'
  //       })
  //   }

    render() { return(
    <section className="">
    <div className="py-4">
      <div className="grid bg-polished_pine text-center text-white border-black border-2 text-3xl rounded py-3 ">
        Post a Forum
      </div>
    </div>
      <form onSubmit={this.handleSubmit}>
            <div>
              <label>What book are you reading, and what would you like to share about it? </label>
              <textarea
                name="message"
                value={this.state.message}
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
        </section>
    ) }
}

export default CreateForum;
