module.exports = function deriveSettings(){
    try {
        return window.settings
    } catch(err) {
        return {}
    }
}
