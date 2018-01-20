var braintree = require('braintree');

require('dotenv').config();

// braintree connection
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.GATEWAY_ID,
    publicKey: process.env.GATEWAY_PUBLIC_KEY,
    privateKey: process.env.GATEWAY_PRIVATE_KEY
  })

module.exports = gateway;