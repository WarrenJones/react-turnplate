# SnapShots

a easy using toast in React
![](https://res.unclewarren.cn/react-turnplate-snapshot.gif)

---

# react-turnplate

```
$ npm install --save  react-turnplate
```

# how to use
```
  import ReactTurnPlate from 'react-turnplate'
  onTryRotate(){
    /* do some check stuff,if can not rotate return*/
    this.setState({canStartRotate:true})
  }

const reward_list = [{icon:'imageurl',name:'prize1',id:1},{icon:'imageurl',name:'prize1',id:2}]
 <ReactTurnPlate
    prizeList={reward_list || []}
    award={newLotteryReward}
    canStartRotate={canStartRotate}
    onTryRotate={this.onTryRotate.bind(this)}
    rotateFinish={this.rotateFinish.bind(this)}
    />
```

## License

ISC
