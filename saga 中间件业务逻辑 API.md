**saga 中间件业务逻辑 API**

**原理、API，某一原理深入了解**



Redux

什么是Redux？

Redux是负责组织statre的工具，但是要考虑是否使用项目状况。

什么时候需要Redux？

1. 有相当大量的、随时间变化的数据
2. state需要有一个单一可靠的数据来源
3. 所有state放在最顶层组建中已经无法满足需要

Redux开发初期目标是创建一个状态管理库，来提供最简化的API，但同时做到行为的完全可预测，因此才得以实现日志打印，热加载，时间旅行，同构应用，录制和重放，而不需要任何开发参与



Redux由flux演变而来，受Elm启发，避开了Flux的复杂性



要点

应用中所有的state都以一个对象树的形式存储在一个单一的store中。唯一改变state方法是

触发action，描述发生了什么的对象

编写reducers，描述action如何改变state



reducer，形式为 `(state, action) => state`的纯函数，描述了action如何把state转变成下一个state



state变化时，需要返回全新的对象



创建Redux store 来存放应用的状态



API是   { subscribe, dispatch, getState }

`let store = createStore(counter)`



详细介绍：

Action，Action对象是行为的描述，包含：

- type： 将要执行的动作
- 可选参数：数据信息，

Reducer，Reducer是一个函数，接收两个参数，`(previousState, action) => newState`

Store，将Actions和Reducers连接在一起的对象，Store是Redux中数据的统一存储，维护者state的所有内容，主要功能是：

- 维护应用的state内容
- 提供getState()方法获取state
- 提供dispatch(action)方法更新state
- 提供subscribe(listener)方法注册监听器

1. Store通过dispatch(action)方法来接受不同的Action
2. 根据Action对象的type和数据信息，Store对象通过Reducer函数来进行state内容

Middleware，中间件，处理Action，可以传递给下一个中间件，如：next(action),可以跳过某些中间件，如：dispatch(action)，可以直接结束：return

常用的中间件：

redux-thunk，

redux-promise，

redux-logger

redux-saga



react-redux，可以将react和redux结合起来

两个重要的功能模块：Provider和connect

工作原理：

React控制视图层，redux维护数据层

Provider本质上是一个React组件，通过context属性，将属性props直接给子孙component，无需通过props层层传递，从而减少组件的依赖关系。

connect，让component和store进行关联，store的数据变化可以及时通知Views重新渲染。

任何一个通过connect()函数处理过的组件都可以得到一个dispatch方法作为组件的props，以及得到全局state中的所有内容

connect函数运行后，会返回一个wrapWithConnect函数，可以接收一个react组件，返回一个经过处理过的Connect组件



Redux API

顶级暴露方法

createStore(reducer, [preloadedState], [enhancer])

```javascript
const store = createStore(persistedReducer, undefined, middlewares)
```

combineReducers(reducers)

```javascript
const appReducer = combineReducers({
  toast,
  users,
  auth,
  storage,
  navReducer,
  feeds,
  connection,
  messages,
  profile,
  commonData,
  settings,
  experience,
  notification,
  opportunity,
  group,
  achievement,
  colleagues,
  academy,
  search
})
```

applyMiddleware(…middleware)

```javascript
const sagaMiddleware = createSagaMiddleware()

const logger = __DEV__ ? [reduxLogger] : []
const middlewares = applyMiddleware(sagaMiddleware, ...logger)
```

bindActionCreators(actionCreators, dispatch)

1. `actionCreators` (*Function* or *Object*): 一个 [action creator](http://cn.redux.js.org/docs/Glossary.html#action-creator)，或者一个 value 是 action creator 的对象。
2. `dispatch` (*Function*): 一个由 [`Store`](http://cn.redux.js.org/docs/api/Store.html) 实例提供的 [`dispatch`](http://cn.redux.js.org/docs/api/Store.html#dispatch) 函数。

compose(…functions)

1. (*arguments*): 需要合成的多个函数。预计每个函数都接收一个参数。它的返回值将作为一个参数提供给它左边的函数，以此类推。例外是最右边的参数可以接受多个参数，因为它将为由此产生的函数提供签名。（译者注：`compose(funcA, funcB, funcC)` 形象为 `compose(funcA(funcB(funcC())))`）

返回：(*Function*): 从右到左把接收到的函数合成后的最终函数。



React-Redux API

Provider 包裹在根组件之外并提供store，此时React中组件才可以使用connect链接React组件和React store

`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`

链接组件和store

mapStateToProps: 我们用到的state中的一个或多个对象

mapDispatchToProps：用到的actionCreator

mergeProps：



只注入dispatch，不监听store

```js
export default connect()(TodoApp)
```

注入没有订阅store的action creators( addTodo, completeTodo)

```js
import * as actionCreators from './actionCreators'

export default connect(
  null,
  actionCreators
)(TodoApp)
```

注入dispatch和全局state[不建议]

每个组件只监听它所关联的部分state



SAGA

解决异步请求

使用的目的



