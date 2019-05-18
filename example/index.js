import React from "react";
import { render } from "react-dom";
import ReactTurnPlate from "../src/reactTurnPlate";

const reward_list = [
  { icon: require("../src/img/icon_avocado.png"), name: "avocado", id: 1 },
  { icon: require("../src/img/icon_doughnut.png"), name: "doughnut", id: 2 },
  { icon: require("../src/img/icon_pecan.png"), name: "pecan", id: 3 },
  { icon: require("../src/img/icon_pudding.png"), name: "pudding", id: 4 }
];

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = this._getInitialState();
  }
  _getInitialState() {
    return {
      //This is a toggle of the rotate,if true,then start Rotate
      canStartRotate: false,
      //this is the award , should be existed after request for the backend
      award: null
    };
  }
  onTryRotate() {
    /**
     * do some checking stuff
     * if through,set canStartRotate to be true
     */
    this.setState({ canStartRotate: true });

    //mock up like requesting backend
    setTimeout(() => {
      this.setState({ award: reward_list[0] });
    }, 2000);
  }
  rotateFinish() {
    alert("congradulations! you got ", this.state.award.name);
  }
  render() {
    const { award, canStartRotate } = this.state;
    return (
        <ReactTurnPlate
          prizeList={reward_list}
          award={award}
          image_spin={require("../src/img/btn_spin.png")}
          background_1={require("../src/img/circle1_img.jpg")}
          background_2={require("../src/img/circle2_img.jpg")}
          canStartRotate={canStartRotate}
          onTryRotate={this.onTryRotate.bind(this)}
          rotateFinish={this.rotateFinish.bind(this)}
        />
    );
  }
}

render(<App />, document.getElementById("root"));
