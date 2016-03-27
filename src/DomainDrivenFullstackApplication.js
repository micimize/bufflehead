import Fullstack from 'strictduck-domain-driven-fullstack'
const DDExpress = ($ES.CONTEXT == 'NODE' ? require('domain-driven-express/node') : require('domain-driven-express/browser')).default
const DDReduxReact = ($ES.CONTEXT == 'NODE' ? require('domain-driven-redux-react/node') : require('domain-driven-redux-react/browser')).default
const DDPouchDb = ($ES.CONTEXT == 'NODE' ? require('domain-driven-pouchdb-persistence-plugin/node') : require('domain-driven-pouchdb-persistence-plugin/browser')).default

export default class Bufflehead extends Fullstack {
    constructor({
        server = DDExpress,
        client = DDReduxReact,
        persister = DDPouchDb,
        domains,
        context = $ES.CONTEXT
    }){
        super({ context, domains, server, client, persister })
    }
}
