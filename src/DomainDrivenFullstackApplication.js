import Fullstack from 'strictduck-domain-driven-fullstack'
const DDExpress = ($ES.CONTEXT == 'NODE' ? require('domain-driven-express/node') : require('domain-driven-express/browser')).default
const DDReduxReact = ($ES.CONTEXT == 'NODE' ? require('domain-driven-redux-react/node') : require('domain-driven-redux-react/browser')).default

export default class Bufflehead extends Fullstack {
    constructor({
        server=DDExpress,
        client=DDReduxReact,
        //Store=DDPouchDb,
        domains
    }){
        super({ domains, server, client /*Store,*/ })
    }
}
