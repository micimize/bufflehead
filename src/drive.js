import { compose } from 'strictduck'
import Server from 'express-domain-driver'
import Client from 'redux-react-domain-driver'
import Store from 'pouchdb-fullstack-store'

export default function drive({ Domains }){
    return compose({ Server, Client, Store, Domains })
}
