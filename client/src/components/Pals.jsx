import React, { Component } from "react";
import { getPalData } from "../services/palService";
import { updateUser, getUserPals } from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "./css/pals.css";

class Pals extends Component {
  state = {
    pals: [],
    user: {},
  };

  async componentDidMount() {
    const pals = await getPalData();
    const user = this.props.user;
    const { data: userPals } = await getUserPals(user);
    user.pals = userPals;
    this.setInitialUserPals(pals, user);
    this.setState({ pals, user });
    toast.success(`Welcome ${user.name}, time to catch some pals!`, {
      autoClose: 1000,
      position: "top-center",
    });
  }

  // Sets the initial user pals if the user has no pals
  setInitialUserPals = async (pals, user) => {
    if (user.pals === undefined || user.pals.length === 0) {
      user.pals = pals.map((pal) => {
        return { id: pal.id, count: 0 };
      });
      try {
        await updateUser(user);
      } catch (ex) {
        toast.error(ex.response.data);
      }
    }
  };

  getPalCount = (pal) => {
    const user = this.state.user;
    const userPal = user.pals.find((p) => p.id === pal.id);
    return userPal.count;
  };

  handleCountIncrease = async (pal) => {
    const originalUser = this.state.user;
    const user = { ...originalUser };
    const userPal = user.pals.find((p) => p.id === pal.id);
    userPal.count++;
    try {
      this.setState({ user });
      await updateUser(user);
    } catch (ex) {
      console.log(ex);
      this.setState({ user: originalUser });
    }
  };

  handleCountDecrease = async (pal) => {
    const originalUser = this.state.user;
    const user = { ...originalUser };
    const userPal = user.pals.find((p) => p.id === pal.id);
    if (userPal.count === 0)
      return toast.error("Count cannot be less than 0", { autoClose: 1000 });
    userPal.count--;
    try {
      this.setState({ user });
      await updateUser(user);
    } catch (ex) {
      toast.error(ex.response.data);
      this.setState({ user: originalUser });
    }
  };

  handlePalClick = (pal) => {
    window.open(pal.wiki, "_blank");
  };

  render() {
    return (
      <div>
        <div id="tableTitle" className="bg-dark mb-0 mt-4 p-3">
          <h1 className="ms-3">PalCounter</h1>
        </div>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.pals.map((pal) => (
              <tr key={pal.key} onClick={() => this.handlePalClick(pal)}>
                <td>
                  <img
                    src={pal.imageWiki}
                    alt={pal.name}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{pal.id}</td>
                <td>{pal.name}</td>
                <td>{this.getPalCount(pal)}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn increaseButton"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.handleCountIncrease(pal);
                      }}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-danger decreaseButton"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.handleCountDecrease(pal);
                      }}
                    >
                      -
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    );
  }
}

export default Pals;
