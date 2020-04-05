import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seeIndexes: [],
    values: {},
    index: "",
  };

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState(() => ({ values: values.data }));
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState(() => ({ seeIndexes: seenIndexes.data }));
  }

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  renderSeenIndexes() {
    const { seeIndexes } = this.state;
    return seeIndexes;
  }

  handleSubmit = async (event) => {
    const { index } = this.state;
    event.preventDefault();
    await axios.post("/api/values", {
      index,
    });
    this.setState(() => ({ index: "" }));
  };

  renderValues() {
    const entries = [];
    const { values } = this.state;
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const element = values[key];
        entries.push(
          <div key={key}>
            for {key} i have {element}
          </div>
        );
      }
    }
    return entries;
  }

  render() {
    const { index } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter index</label>
          <input
            value={index}
            onChange={(e) => this.setState({ index: e.target.value})}
          />
          <button>Submit Result</button>
        </form>
        <h3>Indexes seen</h3>
        {this.renderSeenIndexes()
          .map(({ number }) => number)
          .join(", ")}
        <h3>Calc values</h3>
        {this.renderValues()}
      </div>
    );
  }
};

export default Fib;
