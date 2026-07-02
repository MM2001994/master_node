const fs = require('fs');

function logRequest(filename) {
    return function (req, res, next) {
        const logMessage = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;

        fs.appendFile(filename, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
        next();
    };
}

module.exports = logRequest;