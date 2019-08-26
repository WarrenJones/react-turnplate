import React from "react";
import { render } from "react-dom";
import ReactTurnPlate from "../src/reactTurnPlate";

const reward_list = [
  { icon: require("../src/img/icon_avocado.png"), name: "avocado1", id: 1 },
  { icon: require("../src/img/icon_doughnut.png"), name: "doughnut2", id: 2 },
  { icon: require("../src/img/icon_pecan.png"), name: "pecan3", id: 3 },
  { icon: require("../src/img/icon_pudding.png"), name: "pudding4", id: 4 },
  { icon: require("../src/img/icon_pecan.png"), name: "pecan5", id: 5 },
  { icon: require("../src/img/icon_pudding.png"), name: "pudding6", id: 6 }
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
      this.setState({ award:   { icon: require("../src/img/icon_pudding.png"), name: "pudding6", id: 6 }    });
    }, 1000);
  }
  rotateFinish() {
    alert("congradulations! you got " + this.state.award.name);
  }
  render() {
    const { award, canStartRotate } = this.state;
    return (
        <ReactTurnPlate
          prizeList={reward_list}
          award={award}
          needShowItemName={false}
          image_spin={require("../src/img/btn_spin.png")}
          background_1={require("../src/img/circle1_img.png")}
          background_2={require("../src/img/circle2_img.png")}
          canStartRotate={canStartRotate}
          onTryRotate={this.onTryRotate.bind(this)}
          rotateFinish={this.rotateFinish.bind(this)}
        />
    );
  }
}

render(<App />, document.getElementById("root"));
