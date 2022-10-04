---
title: Building a Webshop in Apostrophe 3 Alpha
date: 1970-01-01T00:00:00.000Z
date_updated: 2020-11-21T14:02:42.000Z
draft: true
---

We're going to build a webshop in Apostrophe using their latest version 3 release, which is currently in alpha and not recommended for production.

## Step -1: Preparing your environment

Apostrophe needs Node.js to be installed, and needs a MongoDB server running on port 27017 on the local machine by default (although this can be changed). Once you've installed Node, and worked out how you're going to access Mongo, run the following commands:

git clone https://github.com/apostrophecms/a3-boilerplate myproject
cd myproject
npm install

Obviously you can change 'myproject' to a more appropriate name.

Next up, you need to make a few quick set-up changes in the `app.js` file.

First up, look for the `shortName` property and give it something a bit more exciting than `a3-boilerplate`. This will be your database name too, so for simplicity, try to pick something relevant that won't change.

Next up, I like to use `.env` files for secrets and other things, so I can add them to my `.gitignore`, and keep my code secret-free (don't forget this step!).

npm i dotenv

Then, add `require('dotenv').config();` at the very top of your `app.js`.

Next you can add in your secrets in the `.env` file, and access them as usual in your code, using `process.env.SECRET`. As an example:

```
'@apostrophecms/db': {
  options: {
uri: process.env.MONGO_URI
  }
},
'@apostrophecms/express': {
  options: {
port: process.env.PORT,
session: { secret: process.env.SECRET}
  }
}
```

Thanks to Arnim on the Apostrophe Discord.

Note: if your Mongo is running locally on port 27017, and you're happy with Apostrophe running on port 3000, you don't need to do any of the above set up.

Last step is to add in an admin user so you can log in to Apostrophe:

node app @apostrophecms/user:add admin

(you can give the user a different name, admin here is just an example).

For frontend, I'm using Tailwind CSS. If you're using something else, then skip ahead.

Tailwind can be installed through NPM and configured with the Webpack config that Apostrophe already uses.

npm i tailwindcss postcss-loader
npx tailwindcss init

Next up create a `postcss.config.js` file in the root of the project and add:

```
module.exports = {
plugins: [require('tailwindcss')],
}
```

Add the following line into `tailwind.config.js`

purge: ['./src/**/*.html', './modules/**/*.html', './views/**/*.html']

Add the following into `src/index.scss`:

@tailwind base;

@tailwind components;

@tailwind utilities;

Finally, we need to let Webpack know how to process our files. For this, order is important, so make sure you put postcss-loader in the right place in the `use` array:

use: [
'style-loader',
'css-loader',
'postcss-loader',
'sass-loader'
]

## Step 0: Planning

So we're just about ready to go. But before even spinning up Apostrophe, I am planning out my web shop. This is pretty easy for me because I am rebuilding an existing site.

I see that my 'products' will need the following:

- Title
- Featured Image
- Secondary Images
- Description
- Price
- Old price (for calculating % discounts)
- Category
- Tags
- Reviews
- SKU

My plan is to have four main tables which drive this webshop:

- Products
- Categories
- Tags
- Reviews

In Apostrophe, 'tables' are 'pieces', so I'll start first of all with the 'products' piece.

## Step 1: Building a simple product piece

First off, I need to create the module under `modules`, which will be called `product`. Into the `modules/product` directory, I need to add an `index.js` which will configure our product piece.

Here's my completed product piece:

```
module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
label: 'Product',
pluralLabel: 'Products'
  },

  fields: {
add: {
  title: {
type: 'string',
required: true,
label: 'Product Name'
  },
  _featuredPhoto: {
type: 'relationship',
label: 'Featured Photo',
max: 1,
required: true,
withType: '@apostrophecms/image'
  },
  _secondaryPhotos: {
type: 'relationship',
label: 'Secondary Photos',
withType: '@apostrophecms/image'
  },
  description: {
type: 'area',
label: 'Description',
options: {
  widgets: {
'@apostrophecms/rich-text': {
  toolbar: [
'bold',
'italic',
'link'
  ],
}
  }
}
  },
  sku: {
type: 'string',
label: 'SKU'
  },
  price: {
type: 'float',
label: 'Price'
  },
  oldPrice: {
type: 'float',
label: 'Old Price'
  },
  // TODO: Make currency either a relationship to a currency piece or a choice
  currency: {
type: 'string',
label: 'Currency'
  },
},
group: {
  details: {
label: 'Product Details',
fields: ['title', '_featuredPhoto', '_secondaryPhotos', 'description', 'sku']
  },
  utility: {
label: 'Pricing',
fields: ['price', 'oldPrice', 'currency', 'slug', 'trash']
  }
},
  },
  columns: {
add: {
  title: {
label: 'Title'
  },
  description: {
label: 'Description'
  },
  sku: {
label: 'SKU'
  },
  price: {
label: 'Price'
  }
}
  }
};
```

Last step is to activate the `product` piece by adding it into the root folder's `app.js` file:

```
modules: {
  // Other modules here
  'product': {}
}
```
