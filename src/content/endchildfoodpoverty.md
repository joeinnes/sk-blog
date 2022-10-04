---
title: "#endchildfoodpoverty"
date: 2020-10-25T11:29:24.000Z
date_updated: 2020-10-25T13:10:54.000Z
featured_image: /media/uploads/endchildfoodpoverty.jpeg
---

[[I](https://traist.co.uk)](/) built a little something on my day off after the UK government decided not to extend free school meals to children during the October half-term.

Although children do not normally receive free school meals outside of term time, the unprecedented economic situation caused by COVID-19 and mass layoffs means that many parents face the very real threat of being unable to feed their children properly over the coming week.

[@MarcusRashford](https://twitter.com/MarcusRashford) started an initiative to encourage local businesses to step in to fill the gap left when the government failed.

The site allows parents to quickly identify businesses near them who will feed their children for free over the coming week.

You can check it out at [https://free-meals.glitch.me](https://free-meals.glitch.me)

The data is from various sources, consolidated here [bit.ly/kidsmealsmap](https://www.google.com/maps/d/u/0/viewer?hl=en&hl=en&mid=1FY2YP3o-Yl6XfmquSB8ONAdEOfT-37su&ll=53.52267271392029%2C-3.6800511181780977&z=7) by the folks at [https://allofustogether.uk/](https://allofustogether.uk/)

## Technical Details

This is a relatively simple [Express](https://expressjs.com/) app. There is a master data repository on [Airtable](https://airtable.com/), where it can be updated prior to syncing to the site.

For performance reasons, and to minimise the API calls out to Airtable, locations are synced into a local [SQLite](https://sqlite.org/index.html) database, which is cached in memory for thirty seconds (theoretically if the server was persistent, it would be enough to cache in memory until the next sync with Airtable, but Glitch may spin this site down for inactivity, so we can't rely on in-memory stores).

On the front-end, the site uses [Leaflet.js](https://leafletjs.com/) and the Geolocation API, but no user data is sent back to the server.

### Requirements

- [Node.js](https://nodejs.org/en/) (with NPM)

### Installation

1. Clone the project (or [remix on Glitch](http://glitch.com/edit/#!/remix/free-meals))
2. Run `npm install`
3. Run `npm run start`
