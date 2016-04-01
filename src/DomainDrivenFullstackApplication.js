import Fullstack from 'strictduck-domain-driven-fullstack'

const DDExpress = (
    $ES.CONTEXT == 'NODE' ?
       require('domain-driven-express/dist/for/node') :
       require('domain-driven-express/dist/for/browser')
).default

const DDReduxReact = (
    $ES.CONTEXT == 'NODE' ?
        require('domain-driven-redux-react/dist/for/node') :
        require('domain-driven-redux-react/dist/for/browser')
).default

const DDPouchDb = (
    $ES.CONTEXT == 'NODE' ?
        require('domain-driven-pouchdb-persistence-plugin/dist/for/node') :
        require('domain-driven-pouchdb-persistence-plugin/dist/for/browser')
).default

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
