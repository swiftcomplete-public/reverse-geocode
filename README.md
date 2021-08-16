# reverse-geocode
## Description
This package provides reverse geocoding using the **[Swiftcomplete Places API](https://www.swiftcomplete.com/places/address-autocomplete/)**.

Using this package, you can obtain a list of the closest addresses, streets or places to a latitude / longitude coordinate.

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

swiftcompleteReverseGeocoder.reverseGeocode('52.955771,-1.142881').then(function(results) {
    console.log(results);
});
```

## Data coverage

Swiftcomplete reverse geocoding is currently available in the following countries:

- Denmark
- France
- Liechtenstein
- Luxembourg
- Norway
- United Kingdom


We regularly update and expand our data coverage - **[contact us](https://www.swiftcomplete.com/contact-us/)** if there's a country or dataset that isn't listed and we'll let you know where it is on our priority list.

