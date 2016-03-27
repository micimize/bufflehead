import { Domain } from 'strictduck-domain-driven-fullstack'

function flattenForContext(obj, key, contexts=['server', 'client']){
    obj = Object.assign(obj, obj[key] || {})
    return Object.keys(obj)
        .filter(k => contexts.indexOf(k) < 0)
        .reduce((resp, k) => {
            resp[k] = typeof(obj[k]) == 'object' ? flattenForContext(obj[k], key, contexts) : obj[k];
            return resp
        }, {})
}

export default function settings(configuration, contextMap={NODE: 'server', BROWSER: 'client'}){
    return new Domain.implementation({
        name: 'settings',
        ...flattenForContext(configuration, contextMap[$ES.CONTEXT])
    })
}
