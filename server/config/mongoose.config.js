const { connect } = require('mongoose');

module.exports.connectMongo = () => {
    connect('mongodb://127.0.0.1:27017/pets-shelter')
        .then(() => console.log('We are making some connections with the database!!!'))
        .catch(() => console.log('Ohhhh, something went wrong!'));
} 
