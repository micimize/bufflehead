export default from './DomainDrivenFullstackApplication'

export settings from './settings'

import { Domain } from 'strictduck-domain-driven-fullstack'

const {implementation, Domains} = Domain
export { implementation as Domain }

export * as persister from 'domain-driven-pouchdb-persistence-plugin'
