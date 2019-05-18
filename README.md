# SnapShots

a configurable turnplate in React
![](https://user-gold-cdn.xitu.io/2019/5/18/16ac949855bdd316?w=360&h=360&f=gif&s=4345398)
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
| image_spin | string | spin button|
| background_1 | string | background_1|
| background_2 | string | background_2|
| prizeList     | array |  [{icon:'imageurl',name:'prize1',id:1},{icon:'imageurl',name:'prize1',id:2}]    |
| award        |   object  | award should be null first,after request  back return an object like prizelist[0]  |
| canStartRotate        |    bool    |  control the turnplate should startRotate  |
|onTryRotate | func| trigger after click the rotate button,should do some check stuff and if it's ok,set canStartRotate to be true then the turnplate start rotating,meanwhile request for the award and after the request finish,set the award |
|rotateFinish| func | |


## License

ISC
