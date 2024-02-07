import React, { Component } from "react";
import { getPalData, getPalCount } from "../services/palService";
import "bootstrap/dist/css/bootstrap.css";

class Pals extends Component {
  state = {
    pals: [],
  };

  async componentDidMount() {
    const pals = await getPalData();
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
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Pal ID</th>
              <th>Name</th>
              <th>Count</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.pals.map((pal) => (
              <tr key={pal.key}>
                <td>
                  <img
                    src={pal.imageWiki}
                    alt={pal.name}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{pal.id}</td>
                <td>{pal.name}</td>
                <td>{getPalCount(pal.id)}</td>
                <td>
                  <button
                    className="btn btn-pill btn-primary"
                    onClick={() => this.handleCountIncrease(pal)}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-pill btn-danger"
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
