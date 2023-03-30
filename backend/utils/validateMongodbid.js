const mongoose = require('mongoose')
const validateMongoDbid = (id) =>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        throw new Error ('Not Valid');
    }
}

module.exports = validateMongoDbid;