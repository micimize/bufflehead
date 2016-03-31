module.exports = {
    default: ($ES.CONTEXT == 'NODE' ? require('./node') : require('./browser'))
}
