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

## props 

| params        | type   |  desc  |
| --------   | -----:  | :----:  |
| prizeList     | array |  [{icon:'imageurl',name:'prize1',id:1},{icon:'imageurl',name:'prize1',id:2}]    |
| award        |   object  | award should be null first,after request  back return an object like prizelist[0]  |
| canStartRotate        |    bool    |  control the turnplate should startRotate  |
|onTryRotate | func| trigger after click the rotate button,should do some check stuff and if it's ok,set canStartRotate to be true then the turnplate start rotating,meanwhile request for the award and after the request finish,set the award |
|rotateFinish| func | |


## License

ISC
