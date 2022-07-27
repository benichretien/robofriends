import React, { Component } from "react";
import Cardlist from "../components/Cardlist";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";
import ErrorBoundry from "../components/ErrorBoundry";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      Searchfield: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
  }
  onSearchChange = (event) => {
    this.setState({ Searchfield: event.target.value });
  };
  render() {
    const filteredRobots = this.state.robots.filter((userrobots) => {
      return userrobots.name
        .toLowerCase()
        .includes(this.state.Searchfield.toLowerCase());
    });
    if (this.state.robots.length === 0) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <Cardlist robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
