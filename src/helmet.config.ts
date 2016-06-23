const chromecon = require('images/chrome-ninja192-precomposed.png');
const applecon = require('images/apple-ninja152-precomposed.png');
const mscon = require('images/ms-ninja144-precomposed.png');
const favicon = require('images/favicon.png');
let assets;
if (!__CLIENT__) {
  const fs = require('fs');
  console.log('\n *START* \n');
  assets = JSON.parse(fs.readFileSync('webpack-assets.json'));
  console.log('Output css assets : \n' + assets);
  console.log('\n *EXIT* \n');
}

const config = {
  link: [
    // Add to homescreen for Chrome on Android
    { rel: 'icon', href: favicon },
    { rel: 'icon', sizes: '192x192', href: chromecon },
    // Add to homescreen for Safari on IOS
    { rel: 'apple-touch-icon', sizes: '152x152', applecon },
    { rel: 'stylesheet', href: assets.main.css }
    // SEO: If your mobile URL is different from the desktop URL,
    // add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones
    // { 'rel': 'canonical', 'href': 'http://www.example.com/' }
  ],
  meta: [
    { charset: 'utf-8' },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
    { name: 'description', content: 'An isomorphic React alt boilerplate with Express and MongoDB deployable to Heroku' },
    // Mobile Safari introduced this tag to let web developers control the viewport's size and scale
    // The width property controls the size of the viewport, the initial-scale property controls
    // the zoom level when the page is first loaded
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    // Add to homescreen for Chrome on Android
    { name: 'mobile-web-app-capable', content: 'yes' },
    // Add to homescreen for Safari on IOS
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'React Webpack Node' },
    // Tile icon for Win8 (144x144 + tile color)
    { name: 'msapplication-TileImage', content: mscon },
    { name: 'msapplication-TileColor', content: '#3372DF' }
  ]
};

export default config;
