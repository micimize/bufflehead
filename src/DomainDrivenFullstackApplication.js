import Fullstack from 'strictduck-domain-driven-fullstack'
import DDExpress from 'express-domain-driver'
import DDReduxReact from 'domain-driven-redux-react'
//import DDPouchDb from 'pouchdb-fullstack-store'

export default class Bufflehead extends Fullstack {
    constructor({
        server=DDExpress,
        client=DDReduxReact,
        //Store=DDPouchDb,
        domains
    }){
        console.log({ domains, server, client /*Store,*/ })
        super({ domains, server, client /*Store,*/ })
    }
}
