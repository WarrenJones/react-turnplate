"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("./utils");

require("./turnplate.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactTurnPlate = function (_React$Component) {
  _inherits(ReactTurnPlate, _React$Component);

  _createClass(ReactTurnPlate, [{
    key: "_getInitialState",
    value: function _getInitialState() {
      return {
        rotating: false,
        lastRotateDeg: 0,
        award: null,
        justRotate: true,
        lastIndex: 0
      };
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !Object.is(this.state.rotating, nextState.rotating) || this.props.prizeList.length != nextProps.prizeList.length;
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps, nextState) {
      if (this.props.prizeList.length != nextProps.prizeList.length) {
        this.draw(nextProps.prizeList);
      }
      //如果在请求，还没返回结果，就先转着
      if (!this.props.canStartRotate && nextProps.canStartRotate && !nextProps.award) {
        this._initFlash();
        this._outDiscFlash();
        this._justRotate();
      }
      if (!this.props.award && nextProps.award) {
        this.setState({ award: nextProps.award });
      }
    }
  }]);

  function ReactTurnPlate() {
    _classCallCheck(this, ReactTurnPlate);

    var _this = _possibleConstructorReturn(this, (ReactTurnPlate.__proto__ || Object.getPrototypeOf(ReactTurnPlate)).apply(this, arguments));

    _this.devicePixelRatio = window.devicePixelRatio || 2;
    _this.state = _this._getInitialState();
    _this._initFlash = _this._initFlash.bind(_this);
    _this._outDiscFlash = _this._outDiscFlash.bind(_this);
    return _this;
  }

  _createClass(ReactTurnPlate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw(list) {
      var prizeList = list || this.props.prizeList;
      var rotateDeg = 360 / prizeList.length / 2 + 90,
          // 扇形回转角度
      ctx = void 0;

      var canvas = document.getElementById("canvas");
      if (!canvas.getContext) {
        return;
      }
      // 获取绘图上下文
      ctx = canvas.getContext("2d");
      for (var i = 0; i < prizeList.length; i++) {
        // 保存当前状态
        ctx.save();
        // 开始一条新路径
        ctx.beginPath();
        // 位移到圆心，下面需要围绕圆心旋转
        ctx.translate(105 * this.devicePixelRatio, 105 * this.devicePixelRatio);
        // 从(0, 0)坐标开始定义一条新的子路径
        ctx.moveTo(0, 0);
        // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
        ctx.rotate((360 / prizeList.length * i - rotateDeg) * Math.PI / 180);
        // 绘制圆弧
        ctx.arc(0, 0, 105 * this.devicePixelRatio, 0, 2 * Math.PI / prizeList.length, false);

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

  }, {
    key: "_outDiscFlash",
    value: function _outDiscFlash() {
      var _props = this.props,
          background_1 = _props.background_1,
          background_2 = _props.background_2;

      this.outShowImg1 = !this.outShowImg1;
      if (this.outShowImg1) {
        this.refs.turnplateBorder.style.backgroundImage = "url(" + background_1 + ")";
      } else {
        this.refs.turnplateBorder.style.backgroundImage = "url(" + background_2 + ")";
      }

      this._flashTimer = (0, _utils.requestTimeout)(this._outDiscFlash, this.outDiskDiffTimer);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._flashTimer) {
        (0, _utils.clearRequestTimeout)(this._flashTimer);
      }
    }
  }, {
    key: "_initFlash",
    value: function _initFlash() {
      var background_1 = this.props.background_1;

      this.outDiskDiffTimer = 700;
      this.outShowImg1 = true;
      this._flashTimer = null;
      this.refs.turnplateBorder.style.backgroundImage = "url(" + background_1 + ")";
    }
  }, {
    key: "_getTurnPrizeList",
    value: function _getTurnPrizeList() {
      var _props2 = this.props,
          prizeList = _props2.prizeList,
          needShowItemName = _props2.needShowItemName;

      var turnplateList = [];
      for (var i = 0; i < prizeList.length; i++) {
        var turnplateItem = _react2.default.createElement(
          "li",
          { className: "turnplate-item", key: i },
          _react2.default.createElement(
            "div",
            { style: { transform: "rotate(" + i / prizeList.length + "turn)" } },
            needShowItemName && prizeList[i].name ? _react2.default.createElement(
              "div",
              null,
              prizeList[i].name
            ) : null,
            _react2.default.createElement("img", { src: prizeList[i].icon })
          )
        );
        turnplateList.push(turnplateItem);
      }
      return _react2.default.createElement(
        "ul",
        { className: "turnplate-list" },
        turnplateList
      );
    }
  }, {
    key: "onRotate",
    value: function onRotate() {
      var onTryRotate = this.props.onTryRotate;
      var rotating = this.state.rotating;
      //不能转

      if (rotating) return;
      onTryRotate();
    }
  }, {
    key: "_lottery",
    value: function _lottery() {
      var _props3 = this.props,
          prizeList = _props3.prizeList,
          award = _props3.award;

      if (!award) {
        this._justRotate();
      }
      var _state = this.state,
          lastRotateDeg = _state.lastRotateDeg,
          lastIndex = _state.lastIndex;

      var choosenIndex = 0;
      for (var index = 0; index < prizeList.length; index++) {
        if (Object.is(prizeList[index].id, award.id)) {
          choosenIndex = index;
          break;
        }
      }
      var container = document.getElementById("turnplate");
      var rotateDeg = (prizeList.length - choosenIndex + lastIndex) * 360 / prizeList.length + 360 * 2;
      container.style.transform = "rotate(" + (rotateDeg + lastRotateDeg) + "deg)";
      this.setState({
        lastRotateDeg: lastRotateDeg + rotateDeg,
        rotating: true,
        justRotate: false,
        lastIndex: choosenIndex
      });
    }
  }, {
    key: "_justRotate",
    value: function _justRotate() {
      var container = document.getElementById("turnplate");
      var rotateDeg = 360 * 3;
      this.setState({
        lastRotateDeg: rotateDeg + this.state.lastRotateDeg,
        rotating: true,
        justRotate: true
      });
      container.style.transform = "rotate(" + (rotateDeg + this.state.lastRotateDeg) + "deg)";
    }
  }, {
    key: "finishRotate",
    value: function finishRotate() {
      var rotateFinish = this.props.rotateFinish;
      var _state2 = this.state,
          award = _state2.award,
          justRotate = _state2.justRotate,
          rotating = _state2.rotating;
      //如果奖品来了，并且不是justRotate

      if (award && !justRotate) {
        (0, _utils.clearRequestTimeout)(this._flashTimer);
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
  }, {
    key: "render",
    value: function render() {
      var _props4 = this.props,
          background_2 = _props4.background_2,
          image_spin = _props4.image_spin;

      var priceList = this._getTurnPrizeList();
      return _react2.default.createElement(
        "div",
        {
          className: "turnplate-border",
          ref: "turnplateBorder",
          style: {
            backgroundImage: "url(" + background_2 + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }
        },
        _react2.default.createElement(
          "div",
          {
            className: "turnplate-wrapper",
            id: "turnplate",
            onTransitionEnd: this.finishRotate.bind(this)
          },
          _react2.default.createElement(
            "canvas",
            {
              className: "turnplate",
              id: "canvas",
              width: 210 * this.devicePixelRatio,
              height: 210 * this.devicePixelRatio
            },
            "Sorry,Explorer not support."
          ),
          priceList
        ),
        _react2.default.createElement("div", {
          style: {
            backgroundImage: "url(" + image_spin + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          },
          className: "pointer",
          onClick: this.onRotate.bind(this)
        })
      );
    }
  }]);

  return ReactTurnPlate;
}(_react2.default.Component);

ReactTurnPlate.propTypes = {
  // 奖项列表
  prizeList: _propTypes2.default.array.isRequired,
  // 获奖Id
  award: _propTypes2.default.object,
  // 可以开始转吗
  canStartRotate: _propTypes2.default.bool,
  //点击旋转
  onTryRotate: _propTypes2.default.func,
  // 转完之后的回调
  rotateFinish: _propTypes2.default.func,
  // 点击按钮
  image_spin: _propTypes2.default.string,
  //背景1
  background_1: _propTypes2.default.string,
  //背景2
  background_2: _propTypes2.default.string,
  //是否显示奖品的名字
  needShowItemName: _propTypes2.default.bool
};
ReactTurnPlate.defaultProps = {
  canStartRotate: true,
  prizeList: [],
  needShowItemName: true
};
exports.default = ReactTurnPlate;