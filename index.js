const https = require('https');

let apiKey = '';

async function makeRequest(url) {
    return new Promise((resolve) => {
        https.get(url, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                let results = JSON.parse(data);

                resolve(results);
            });

        }).on("error", (err) => {
            resolve({
                fail: err
            })
        });
    });
}

/**
 * Sets the API key to authenticate your request to the Swiftcomplete API. You can obtain an API key at https://www.swiftcomplete.com
 * @param key
 */
exports.setAPIKey = function (key) {
    console.log(key);
    if (key && typeof key === 'string' && key.length > 0)
        apiKey = key;
    else
        throw 'Invalid key provided';
}

/**
 * Returns the nearest address, street or places to a coordinate
 * @param {String} coordinate A WGS84 coordinate, in the format "latitude,longitude"
 * @param {Object} options Optional options object
 * @param {Integer} options.maxResults Max number of results to return (up to 5). Note that you are billed per result, so 4 results = 4 charges.
 * @returns {Promise} Array of matching results
 */
exports.reverseGeocode = function (coordinate, options) {
    if (apiKey.length == 0)
        throw 'You must set your API key first by calling setAPIKey(key)';

    let requestOptions = {
        maxResults: 1
    };

    if (options) {
        if ('maxResults' in options) {
            let parsedMaxResults = parseInt(options.maxResults);

            if (!isNaN(parsedMaxResults) && parsedMaxResults >= 1 && parsedMaxResults <= 5)
                requestOptions.maxResults = options.maxResults;
        }
    }

    let url = `https://api.swiftcomplete.com/v1/places/?key=${apiKey}&biasTowards=${coordinate}&maxResults=${requestOptions.maxResults}&populateIndex=0`;

    return makeRequest(url);
}