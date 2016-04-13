import Fullstack from 'strictduck-domain-driven-fullstack'

import DDExpress from 'polypack!domain-driven-express'
import DDReduxReact from 'polypack!domain-driven-redux-react'
import DDPouchDb from 'polypack!domain-driven-pouchdb-persistence-plugin'

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
