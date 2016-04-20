import { Domain } from 'strictduck-domain-driven-fullstack'

function flattenForContext(original, key, contexts=['server', 'client']){
    let obj = Object.assign({}, original)
    obj = Object.assign(obj, obj[key] || {})
    return Object.keys(obj)
        .filter(k => contexts.indexOf(k) < 0)
        .reduce((resp, k) => {
            resp[k] = ((!Array.isArray(obj[k])) && typeof(obj[k]) == 'object') ? flattenForContext(obj[k], key, contexts) : obj[k];
            return resp
        }, {})
}

let deriveSettingsFromEnv = ($ES.CONTEXT == 'NODE') ? require('./nodeSettings') : require('./browserSettings')

export default function settings({literal={}, context=$ES.CONTEXT, fullstack=true, contextMap={NODE: 'server', BROWSER: 'client'}} = {}){
    let configuration = Object.assign(deriveSettingsFromEnv(), literal)
    return new Domain.implementation({
        name: 'settings',
        ...flattenForContext(configuration, contextMap[context]),
        ...( fullstack && context == 'NODE' ?
            {client: flattenForContext(configuration, 'client')} :
            {})
    })
}
