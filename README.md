# @swiftcomplete/reverse-geocode

[![size](https://img.shields.io/bundlephobia/min/@swiftcomplete/reverse-geocode "dependencies")](https://img.shields.io/bundlephobia/min/@swiftcomplete/reverse-geocode)
[![npm](https://img.shields.io/npm/v/@swiftcomplete/reverse-geocode.svg?style=flat-square "npm")](https://www.npmjs.com/package/@swiftcomplete/reverse-geocode)
[![release](https://img.shields.io/github/release/swiftcomplete-public/reverse-geocode.svg?style=flat-square "release")](https://github.com/swiftcomplete-public/reverse-geocode)
[![license](http://img.shields.io/npm/l/@swiftcomplete/reverse-geocode.svg?style=flat-square "license")](https://github.com/swiftcomplete-public/reverse-geocode/blob/master/LICENSE)

## Description
This package provides reverse geocoding using the **[Swiftcomplete Reverse Geocoding API](https://www.swiftcomplete.com/places/reverse-geocoding/)**.

Using this package, you can convert GPS latitude longitude coordinates into readable addresses and locations.

For more documentation, code samples and installation instructions, head over to the **[Reverse Geocoding API Documentation](https://www.swiftcomplete.com/docs/api/places/reverse-geocoding/)**.

## Installation

```sh
npm install @swiftcomplete/reverse-geocode
```

## Authentication

Each request needs to be authenticated with an API key, which you can obtain by **[creating a Swiftcomplete account](https://www.swiftcomplete.com/account/register/)**.

## Making a request

```js
const swiftcompleteReverseGeocoder = require('@swiftcomplete/reverse-geocode');

swiftcompleteReverseGeocoder.setAPIKey('INSERT-KEY-HERE');

(async function () {
    let results = await swiftcompleteReverseGeocoder.reverseGeocode('51.499403,-0.127362', {});

    console.log(results);
}());
```

## Response
```json
[
  {
    "primary":{
      "text":"Westminster Abbey",
    },
    "secondary":{
      "text":"London",
    },
    "type":"address.residential.building.data.emptyroad",
    "geometry":{
      "centre":{
        "lat":51.499462,
        "lon":-0.127448,
        "type":"address"
      }
    },
    "distance":{
      "units":"m",
      "measurement":9,
      "type":"biasTowards",
      "geometry":{
        "centre":{
          "lat":51.499403,
          "lon":-0.127362
        }
      }
    },
    "populatedRecord":{
      "lines":[
        "Westminster Abbey",
        "",
        "London",
        "SW1P 3PA",
        "United Kingdom"
      ],
      "label":"Westminster Abbey\nLondon\nSW1P 3PA\nUnited Kingdom"
    }
  }
]
```

## Response field descriptions

- primary.text - A simple description of the address, usually the building & street
- secondary.text - A simple description of the location, usually the city
- geometry.centre - The coordinates of the address
- geometry.centre.type - The accuracy of the coordinates, either "address", "street" or "postcode"
- distance - How far the address is from your coordinates
- distance.geometry.centre - Your original coordinates
- populatedRecord.lines - The fully formatted postal address, line by line
- populatedRecord.label - The fully formatted postal address, in a simple label format

## Customising the response

It's possible to pass in an optional options object to customise the response. Each field is optional within the object:

- distanceUnits - Unit of measurement to display how far away the address is from your coordinate ("metric", "imperial", "m", "km", "ft", "mi", default: "metric")
- groupByCompass - Enabling groupByCompass returns addresses surrounding your coordinate, rather than just the closest. Useful to return an overview of an area and ignore several addresses that are grouped together (true, false, default: "false")
- maxResults - Max number of results to return (up to 5, default: 1). Note that you are billed per result, so 4 results = 4 charges.

```js
const swiftcompleteReverseGeocoder = require('@swiftcomplete/reverse-geocode');

swiftcompleteReverseGeocoder.setAPIKey('INSERT-KEY-HERE');

(async function () {
    let results = await swiftcompleteReverseGeocoder.reverseGeocode('45.421497,-75.702096', {
        maxResults: 3,
        distanceUnits: "ft"
    });

    console.log(results);
}());
```

## Data coverage

Swiftcomplete reverse geocoding is currently available in the following countries:

- Canada
- Great Britain (England, Scotland and Wales)

We'll be adding the following countries shortly:

- Denmark
- France
- Liechtenstein
- Luxembourg
- Norway

We regularly update and expand our data coverage - **[contact us](https://www.swiftcomplete.com/contact-us/)** if there's a country or dataset that isn't listed and we'll let you know where it is on our priority list.