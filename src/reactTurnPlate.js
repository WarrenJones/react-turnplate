import React from "react";
import PropTypes from "prop-types";
import "./turnplate.scss";
export default class ReactTurnPlate extends React.Component {
  static propTypes = {
    // 奖项列表
    prizeList: PropTypes.array.isRequired,
    // 获奖Id
    award: PropTypes.object,
    // 可以开始转吗
    canStartRotate: PropTypes.bool,
    //点击旋转
    onTryRotate: PropTypes.func,
    // 转完之后的回调
    rotateFinish: PropTypes.func,
    // 点击按钮
    image_spin: PropTypes.string,
    //背景1
    background_1: PropTypes.string,
    //背景2
    background_2: PropTypes.string,
    //是否显示奖品的名字
    needShowItemName: PropTypes.bool
  };

  static defaultProps = {
    canStartRotate: true,
    prizeList: [],
    needShowItemName: true
  };

  _getInitialState() {
    return {
      rotating: false,
      lastRotateDeg: 0,
      award: null,
      justRotate: true,
      lastIndex:0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !Object.is(this.state.rotating, nextState.rotating) ||
      this.props.prizeList.length != nextProps.prizeList.length
    );
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (this.props.prizeList.length != nextProps.prizeList.length) {
      this.draw(nextProps.prizeList);
    }
    //如果在请求，还没返回结果，就先转着
    if (
      !this.props.canStartRotate &&
      nextProps.canStartRotate &&
      !nextProps.award
    ) {
      this._initFlash();
      this._outDiscFlash();
      this._justRotate();
    }
    if (!this.props.award && nextProps.award) {
      this.setState({ award: nextProps.award });
    }
  }
  constructor() {
    super(...arguments);
    this.devicePixelRatio = window.devicePixelRatio || 2;
    this.state = this._getInitialState();
    this._initFlash = this._initFlash.bind(this);
    this._outDiscFlash = this._outDiscFlash.bind(this);
  }
  componentDidMount() {
    this.draw();
  }
  draw(list) {
    const prizeList = list || this.props.prizeList;
    let rotateDeg = 360 / prizeList.length / 2 + 90, // 扇形回转角度
      ctx;

    const canvas = document.getElementById("canvas");
    if (!canvas.getContext) {
      return;
    }
    // 获取绘图上下文
    ctx = canvas.getContext("2d");
    for (let i = 0; i < prizeList.length; i++) {
      // 保存当前状态
      ctx.save();
      // 开始一条新路径
      ctx.beginPath();
      // 位移到圆心，下面需要围绕圆心旋转
      ctx.translate(105 * this.devicePixelRatio, 105 * this.devicePixelRatio);
      // 从(0, 0)坐标开始定义一条新的子路径
      ctx.moveTo(0, 0);
      // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
      ctx.rotate((((360 / prizeList.length) * i - rotateDeg) * Math.PI) / 180);
      // 绘制圆弧
      ctx.arc(
        0,
        0,
        105 * this.devicePixelRatio,
        0,
        (2 * Math.PI) / prizeList.length,
        false
      );

      // 颜色间隔
      if (i % 2 == 0) {
        ctx.fillStyle = "#FFEAB0";
      } else {
        ctx.fillStyle = "#ffffff";
      }

      // 填充扇形
      ctx.fill();
      // 绘制边框
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#e4370e";
      ctx.stroke();

      // 恢复前一个状态
      ctx.restore();
    }
  }
  //外面闪闪发光的东东
  _outDiscFlash() {
    const { background_1, background_2 } = this.props;
    this.outShowImg1 = !this.outShowImg1;
    if (this.outShowImg1) {
      this.refs.turnplateBorder.style.backgroundImage = `url(${background_1})`;
    } else {
      this.refs.turnplateBorder.style.backgroundImage = `url(${background_2})`;
    }

    this._flashTimer = setTimeout(this._outDiscFlash, this.outDiskDiffTimer);
    // this._flashTimer = this.requestInterval(this._outDiscFlash, this.outDiskDiffTimer);
  }

  _initFlash() {
    const { background_1 } = this.props;
    this.outDiskDiffTimer = 700;
    this.outShowImg1 = true;
    this._flashTimer = null;
    this.refs.turnplateBorder.style.backgroundImage = `url(${background_1})`;
  }
  _getTurnPrizeList() {
    const { prizeList, needShowItemName } = this.props;
    const turnplateList = [];
    for (let i = 0; i < prizeList.length; i++) {
      const turnplateItem = (
        <li className="turnplate-item" key={i}>
          <div style={{ transform: `rotate(${i / prizeList.length}turn)` }}>
            {needShowItemName && prizeList[i].name ? (
              <div>{prizeList[i].name}</div>
            ) : null}
            <img src={prizeList[i].icon} />
          </div>
        </li>
      );
      turnplateList.push(turnplateItem);
    }
    return <ul className="turnplate-list">{turnplateList}</ul>;
  }
  onRotate() {
    const { onTryRotate } = this.props;
    const { rotating } = this.state;
    //不能转
    if (rotating) return;
    onTryRotate();
  }
  _lottery() {
    const { prizeList, award } = this.props;
    if (!award) {
      this._justRotate();
    }
    const { lastRotateDeg,lastIndex } = this.state;
    let choosenIndex = 0;
    for (let index = 0; index < prizeList.length; index++) {
      if (Object.is(prizeList[index].id, award.id)) {
        choosenIndex = index;
        break;
      }
    }
    const container = document.getElementById("turnplate");
    const rotateDeg =
      ((prizeList.length - choosenIndex+lastIndex) * 360) / prizeList.length + 360 * 2;
    container.style.transform =
      "rotate(" + (rotateDeg + lastRotateDeg) + "deg)";
    this.setState({
      lastRotateDeg: lastRotateDeg + rotateDeg,
      rotating: true,
      justRotate: false,
      lastIndex:choosenIndex
    });
  }
  _justRotate() {
    const container = document.getElementById("turnplate");
    const rotateDeg = 360 * 3;
    this.setState({
      lastRotateDeg: rotateDeg + this.state.lastRotateDeg,
      rotating: true,
      justRotate: true
    });
    container.style.transform =
      "rotate(" + (rotateDeg + this.state.lastRotateDeg) + "deg)";
  }
  finishRotate() {
    const { rotateFinish } = this.props;
    const { award, justRotate, rotating } = this.state;
    //如果奖品来了，并且不是justRotate
    if (award && !justRotate) {
      clearTimeout(this._flashTimer);
      this.setState({ rotating: false });
      rotateFinish(award);
    }
    //如果奖品来了，是justRotate,就开始抽
    else if (award && justRotate) {
      this._lottery();
    } else if (!award && justRotate && !rotating) {
      return;
    } else {
      //否则就继续等吧兄弟
      this._justRotate();
    }
  }
  render() {
    const { background_2, image_spin } = this.props;
    const priceList = this._getTurnPrizeList();
    return (
      <div
        className={"turnplate-border"}
        ref="turnplateBorder"
        style={{
          backgroundImage: `url(${background_2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%"
        }}
      >
        <div
          className="turnplate-wrapper"
          id="turnplate"
          onTransitionEnd={this.finishRotate.bind(this)}
        >
          <canvas
            className="turnplate"
            id="canvas"
            width={210 * this.devicePixelRatio}
            height={210 * this.devicePixelRatio}
          >
            Sorry,Explorer not support.
          </canvas>
          {priceList}
        </div>
        <div
          style={{
            backgroundImage: `url(${image_spin})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
          className="pointer"
          onClick={this.onRotate.bind(this)}
        />
      </div>
    );
  }
}
