const crypto = require('crypto');

function verifySignature(secret, header, payload) {
    if (!header) {
        return false;  // Return false if header is undefined or empty
    }

    const parts = header.split('=');
    const receivedSig = parts[1];
    const expectedSig = crypto.createHmac('sha256', secret)
                               .update(payload)
                               .digest('hex');

    return receivedSig === expectedSig;
}

module.exports = { verifySignature };
