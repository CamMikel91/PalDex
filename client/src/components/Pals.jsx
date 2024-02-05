import React, { Component } from "react";
import { getPals } from "../fakeServices/fakePals";
import "bootstrap/dist/css/bootstrap.css";

class Pals extends Component {
  state = {
    pals: [],
  };

  componentDidMount() {
    const pals = getPals();
    this.setState({ pals });
  }

  handleCountIncrease = (pal) => {
    const pals = [...this.state.pals];
    const index = pals.indexOf(pal);
    pals[index] = { ...pal };
    pals[index].count++;
    this.setState({ pals });
  };

  handleCountDecrease = (pal) => {
    const pals = [...this.state.pals];
    const index = pals.indexOf(pal);
    pals[index] = { ...pal };
    pals[index].count--;
    this.setState({ pals });
  };

  render() {
    return (
      <div>
        <table className="table table-dark table-hover my-5">
          <thead>
            <tr>
              <th>Pal ID</th>
              <th>Name</th>
              <th>Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.pals.map((pal) => (
              <tr key={pal.palId}>
                <td>{pal.palId}</td>
                <td>{pal.name}</td>
                <td>{pal.count}</td>
                <td>
                  <button
                    className="btn btn-pill btn-primary mx-2"
                    onClick={() => this.handleCountIncrease(pal)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-pill btn-danger mx-2"
                    onClick={() => this.handleCountDecrease(pal)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Pals;
