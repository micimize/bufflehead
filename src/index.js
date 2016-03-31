export default from './DomainDrivenFullstackApplication'

export settings from './settings'

import { Domain } from 'strictduck-domain-driven-fullstack'

const {implementation, Domains} = Domain
export { implementation as Domain }

import { defaultDataFlows } from 'domain-driven-pouchdb-persistence-plugin'
export { defaultDataFlows as defaultPersistenceDataFlows }
