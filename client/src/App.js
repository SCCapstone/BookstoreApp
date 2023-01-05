import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


var React = require("react");
var Component = React.Component;

class App extends Component {
  render() {
    const user = localStorage.getItem("token");
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
