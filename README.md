# bufflehead
Domain driven fullstack framework

## Overview
Briefly, Bufflehead is an implementation of a [strictduck](https://github.com/strictduck/strictduck) [domain-driven-fullstack](https://github.com/strictduck/domain-driven-fullstack).  
It is composed of:  
 \-  a [domain-driven-express server](https://github.com/michaeljosephrosenthal/domain-driven-express)  
 \-  a [domain-driven-redux-react client](https://github.com/michaeljosephrosenthal/domain-driven-redux-react)  
 \-  a [domain-driven-pouchdb-persistence plugin](https://github.com/michaeljosephrosenthal/pouchdb-fullstack-store)  
and leverages [polypacker](https://github.com/michaeljosephrosenthal/polypacker) for developing and distributing "universal" javascript code bases.

## technical usage examples
The top level application is always expressed simply, regardlessas of the complexity of the application. For example, take a look at [bufflehead-todos/src/index.js](https://github.com/strictduck/bufflehead-todos/blob/master/src/index.js). A more "real world" `DomainDrivenFullstackApplication`'s expression wouldn't look much different: 
```javascript
import 'babel-polyfill'
import * as bufflehead from 'polypack!bufflehead'
import {root, analytics, profiles, chat} from './domains'

// load settings from an argument --settings settings.json to the process
const settings = bufflehead.settings()

const app = new bufflehead.default({
    title: 'Very Complicated App',
    domains: { root, chat, analytics, profiles, settings }
})

app.main()
```

This is possible all the business logic is expressed on the `Domain` level, which is then orchestrated by the various middlewares of the afformentioned domain-driven components. For an example, the domain expressed in [bufflehead-todos/src/todos/domain](https://github.com/strictduck/bufflehead-todos/blob/master/src/todos/domain.js) is roughly:
```javascript
new Domain({
    name: 'todos',
    route: {
        path: '/',
        component: Todos
    },
    pouchActionMap: {
        insert: 'addTodo',
        update: 'editTodo',
        remove: 'deleteTodo'
    },
    dataFlows
})
```
where the `dataFlows` are expressed in [bufflehead-todos/src/todos/dataFlows](https://github.com/strictduck/bufflehead-todos/blob/master/src/todos/dataFlows.js), and have the shape:
```javascript
{
    ADD_TODO(state, payload){
        return [ newTodo(payload), ...state ]
    },
    DELETE_TODO(state, payload){
        return state.filter(todo => todo._id !== payload._id)
    },
    ...dataFlows
}
```
In the todo app, the `route` is processed by `domain-driven-redux-react` to create the appropriate `react-router` route and `redux` container, and the `dataFlows` are turned into the approriate `redux` actions and reducers. The `domain-driven-pouchdb-persistence-plugin` then detects the `pouchActionMap` and connects `pouchdb` to the domain's `redux` store accordingly.

For real world apps using authentication, the route of the root domain might override the automatic route generation from `domain-driven-redux-react` to look something like:
```javascript
import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import Root from './Root'
import chat from '../chat'
import profiles from '../profiles'
import Login from '../nav/Login.jsx'
import { persister } from 'polypack!bufflehead' 

function getComponent(domain){
    return domain.get('route').component
}

// marks the route for further modification by the persister
let authOnEnter = persister.requireAuthFromRoute('/login')

export default (
    <Route path="/" component={Root}>
        <IndexRedirect to="/chat" />
        <Route path="chat" component={getComponent(chat)} onEnter={authOnEnter}/>
        <Route path="profiles" component={getComponent(profiles)} onEnter={authOnEnter} />
        <Route path="login" component={persister.provideAuthFromRoute(Login)} />
    </Route>
)
```

## Current status
Bufflehead is still nascent, poorly documented, and not exactly easy to intuit. For example, `todos/dataFlows#ADD_TODO(state, payload)` becomes `'addTodo'` in `todos/pouchActionMap#insert`. This is still the case for everything it's built with as well. Right now the only one working on this, [strictduck](https://github.com/strictduck), [polypacker](https://github.com/michaeljosephrosenthal/polypacker), and everything else involved is [me](https://github.com/michaeljosephrosenthal). If you'd like to get involved.... uh, message me or something

This project is heavily inspired by [reactuate](https://github.com/reactuate/reactuate) and aims to be similar in power to [meteor](https://meteor.com)

