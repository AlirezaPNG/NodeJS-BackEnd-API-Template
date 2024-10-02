
const mongoose = require('mongoose');

module.exports = function (config, debug) {
    
    mongoose.connect(config.get('db.address')).then(r => {
        debug('connected to mongo')
    }).catch(e => {
        debug(e)
    })


}
