export default from './DomainDrivenFullstackApplication'

import { Domain } from 'strictduck-domain-driven-fullstack'
const implementation = Domain.implementation
export { implementation as Domain }
