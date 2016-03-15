import { fullstack } from 'strictduck-domain-driven-fullstack'
import DDExpress from 'express-domain-driver'
import DDReduxReact from 'redux-react-domain-driver'
//import DDPouchDb from 'pouchdb-fullstack-store'

export default fullstack.implement({
    name: 'Bufflehead',
    constructor({
        Server=DDExpress,
        Client=DDReduxReact,
        //Store=DDPouchDb,
        Domains
    }){
        return [ Domains, Server, Client /*Store,*/ ]
    }
})
