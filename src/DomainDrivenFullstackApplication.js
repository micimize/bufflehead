import Fullstack from 'strictduck-domain-driven-fullstack'
import DDExpress from 'domain-driven-express'
import DDReduxReact from 'domain-driven-redux-react'
//import DDPouchDb from 'pouchdb-fullstack-store'

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
