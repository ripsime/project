const fs = require('fs');

const connectionOptions = {
    'port': 18884,
    'protocol': 'mqtt',
    'host': 'localhost',
    'rejectUnauthorized': false,
    'trustedCA': 'path',
    'cert': fs.readFileSync('path'),
    'key': fs.readFileSync('path'),
    'clientId': 'clientId',
};

module.exports = connectionOptions;