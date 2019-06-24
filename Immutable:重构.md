Immutable

JS中的对象一般是可变的，因为使用了引用赋值，新对象简单引用原始对象，做更改时会影响到原始对象。

引用类型会节省对象，但是项目复杂度提高之后，会造成很大隐患，

什么是Immutable？

指**一旦创建，就不能再更改的数据**。对Immutable做任何增删改操作都会返回一个新的Immutable对象。

实现原理：**持久化数据结构**，也就是使用旧数据创建新对象时，要保证旧数据同时可用且不变。同时避免了deepcopy的性能损耗，Immutable使用了**结构共享**，对象的dom树中节点发生变化时，只修改这个节点和受它影响的父节点，其他节点共享。

常用的Immutable有两个库

immutable.js 和 seamless-immutable[只支持Array和Object两种数据类型]

immutable.js 与React同期出现，有很多易用的数据类型，比如：Collection、List、Map、Set、Record、Seq。有非常全面的map、filter、groupBy、reduce、find函数式操作方法，API与Object或Array类似。

常用的的三种数据结构

Map：键值对集合，对应Object，ES6中也有专门的Map对象

List： 有序可重复列表，对应Array

Set：无需且不重复的列表

Immutable优点

- 降低了Mutable带来的复杂度

  可变数据耦和了Time和Value的概念，造成数据很难被回溯。

  ```javascript
  function touchAndLog(touchFn) {
    let data = { key: 'value' };
    touchFn(data); // 不知道是否对data做了什么，所以打印会不确定
    console.log(data.key); // 猜猜会打印什么？
  }
  ```

- 节省内存

  因为使用了结构共享，所以会尽量复用内存，之前被使用过的数据也可以被再次复用，没有被引用的对象会被GC

  ```javascript
  import { Map} from 'immutable';
  let a = Map({
    select: 'users',
    filter: Map({ name: 'Cam' })
  })
  let b = a.set('select', 'people');
  
  a === b; // false
  a.get('filter') === b.get('filter'); // true
  ```

- Undo/Redo，Copy/Paste，甚至时间旅行这些功能

  因为Immutable的数据如果进行了增删改操作之后，都会返回一个新的Immutable对象，只要将对应的数据存储到一个数组/对象中，就可以根据个人需求，返回指定的记录上，便于开发出撤销/重做的功能

- React 减少render

  数据复用，减少渲染的性能消耗

- 并发安全

  Immutable数据天生不可变，所以并发锁就不需要了。

  目前JavaScript是单线程运行的，所以并没有什么用处，但是未来可能会加入

- 拥抱函数式编程

  输入一致则输出必然一致

缺点

- 学习新的API，学习成本

- 增加了资源文件大小

- 容易与原生对象混淆

  Immutable中Object获取key对应的value时，要 map.get('key')，而不是map[key]，Array获取时array.get(0)，而不是array[0]

  避免方法：

  1. 使用静态类型检查工具
  2. 约定变量命名规则：$$开头 Immutable变量
  3. 使用Immutable.fromJS创建对象

更多认识：

- Immutable对象比较时可以使用 ===，直接比较内存地址，性能最好
- 值比较则使用Immutable.is(map1, map2)，比较两个对象的hashCode或valueOf
- Immutable内部使用了Tria 前缀树/字典树结构来存储，只要hashCode相同，值就是一样的
- 减少React重复渲染，提高性能

与Object.freeze、const的区别

都是防止对象被篡改的功能，但他们是shallowCopy的，对象层级一深就要特殊处理

Cursor的概念

方便深层数据访问使用，Cursor提供了可以访问深层数据的引用

```javascript
import Immutable from 'immutable';
import Cursor from 'immutable/contrib/cursor';

let data = Immutable.fromJS({ a: { b: { c: 1 } } });
// 让 cursor 指向 { c: 1 }
let cursor = Cursor.from(data, ['a', 'b'], newData => {
  // 当 cursor 或其子 cursor 执行 update 时调用
  console.log(newData);
});

cursor.get('c'); // 1
cursor = cursor.update('c', x => x + 1);
cursor.get('c'); // 2
```

常用的几种数据类型

1. `List`: 有序索引集，类似JavaScript中的Array。
2. `Map`: 无序索引集，类似JavaScript中的Object。
3. `OrderedMap`: 有序的`Map`，根据数据的set()进行排序。
4. `Set`: 没有重复值的集合。
5. `OrderedSet`: 有序的`Set`，根据数据的add进行排序。
6. `Stack`: 有序集合，支持使用unshift（）和shift（）添加和删除。
7. `Range()`: 返回一个Seq.Indexed类型的集合，这个方法有三个参数，start表示开始值，默认值为0，end表示结束值，默认为无穷大，step代表每次增大的数值，默认为1.如果start = end,则返回空集合。
8. `Repeat()`: 返回一个vSeq.Indexe类型的集合，这个方法有两个参数，value代表需要重复的值，times代表要重复的次数，默认为无穷大。
9. `Record`: 一个用于生成Record实例的类。类似于JavaScript的Object，但是只接收特定字符串为key，具有默认值。
10. `Seq`: 序列，但是可能不能由具体的数据结构支持。
11. `Collection`: 是构建所有数据结构的基类，不可以直接构建

常用API

- fromJS()

- toJS()

- is()

- List / Map

  - isList / isMap
  - size
  - get、getIn / has、hasIn
  - includes
  - first
  - last
  - set
  - setIn
  - delete
  - deleteIn
  - deleteAll
  - update
  - updateIn
  - clear
  - List.push()
  - List.pop()
  - List.unshift() 在List首部插入一个元素
  - List.shift()
  - List.insert()
  - map()，遍历

- merge

  - merge，浅比较
  - mergeWith，自定义合并，自行设置某些属性的值
  - mergeIn
  - mergeDeep
  - mergeDeepIn
  - mergeDeepWith

- 序列算法，concat，拼接

- 反转，reverse()

- 排序 sort() / sortBy()

  ```javascript
  ///List
  Immutable.fromJS([4,3,5,2,6,1]).sort()
  // List [1,2,3,4,5,6]
  Immutable.fromJS([4,3,5,2,6,1]).sort((a,b)=>{
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    if (a === b) { return 0; }
  })
  // List [1,2,3,4,5,6]
  Immutable.fromJS([{a:3},{a:2},{a:4},{a:1}]).sortBy((val,index,obj)=>{
    return val.get('a')
  },(a,b)=>{
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    if (a === b) { return 0; }
  })
  //List  [ {a:3}, {a:2}, {a:4}, {a:1} ]
  
  //Map
  
  Immutable.fromJS( {b:1, a: 3, c: 2, d:5} ).sort()
  //Map {b: 1, c: 2, a: 3, d: 5}
  Immutable.fromJS( {b:1, a: 3, c: 2, d:5} ).sort((a,b)=>{
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    if (a === b) { return 0; }
  })
  //Map {b: 1, c: 2, a: 3, d: 5}
  Immutable.fromJS( {b:1, a: 3, c: 2, d:5} ).sortBy((value, key, obj)=> {
    return value
  })
  //Map {b: 1, c: 2, a: 3, d: 5}
  ```

- 分组 groupBy

  ```javascript
  const listOfMaps = List([
    Map({ v: 0 }),
    Map({ v: 1 }),
    Map({ v: 1 }),
    Map({ v: 0 }),
    Map({ v: 2 })
  ])
  const groupsOfMaps = listOfMaps.groupBy(x => x.get('v'))
  // Map {
  //   0: List [ Map{ "v": 0 }, Map { "v": 0 } ],
  //   1: List [ Map{ "v": 1 }, Map { "v": 1 } ],
  //   2: List [ Map{ "v": 2 } ],
  // }
  ```

  

- 查找数据

  - List.indexOf()
  - List.lastIndexOf()
  - List.findIndex()
  - List.findLastIndex()
  - find()
  - findLast()
  - FindKey()
  - findLastKey()



重构

