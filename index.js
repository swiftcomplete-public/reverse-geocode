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

function parseDistanceUnits(str) {
    let result = '';
    let parsedStr = str.toLowerCase().trim();

    switch (parsedStr) {
        case 'metric':
            result = 'metric';
            break;
        case 'imperial':
            result = 'imperial';
            break;
        case 'km':
            result = 'km';
            break;
        case 'm':
            result = 'm';
            break;
        case 'mi':
            result = 'mi';
            break;
        case 'ft':
            result = 'ft';
            break;
    }

    return result;
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
 * @param {string} coordinate A WGS84 coordinate, in the format "latitude,longitude"
 * @param {Object} options Optional options object
 * @param {("metric"|"imperial"|"m"|"km"|"ft"|"mi")} [options.distanceUnits="metric"] Unit of measurement to display how far away the address is from your coordinate
 * @param {number} [options.maxResults=1] Max number of results to return (up to 5). Note that you are billed per result, so 4 results = 4 charges.
 * @returns {Promise} Array of matching results
 */
exports.reverseGeocode = function (coordinate, options) {
    if (apiKey.length == 0)
        throw 'You must set your API key first by calling setAPIKey(key)';

    let url = `https://api.swiftcomplete.com/v1/places/?key=${apiKey}&searchMode=reverseGeocode&biasTowards=${coordinate}`;

    if (options) {
        if ('distanceUnits' in options) {
            let parsedDistanceUnits = parseDistanceUnits(options.distanceUnits);

            if (parsedDistanceUnits.length > 0)
                url += `&distanceUnits=${parsedDistanceUnits}`;
        }

        if ('maxResults' in options) {
            let parsedMaxResults = parseInt(options.maxResults);

            if (!isNaN(parsedMaxResults) && parsedMaxResults >= 1 && parsedMaxResults <= 5)
                url += `&maxResults=${parsedMaxResults}`;
        }
    }

    return makeRequest(url);
}