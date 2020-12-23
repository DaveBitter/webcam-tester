# Webcam Test
[![Netlify Status](https://api.netlify.com/api/v1/badges/847365d7-0830-41e1-849a-37be9ce8e8e0/deploy-status)](https://app.netlify.com/sites/webcam-test/deploys)

## Demo
You can have a look at the Webcam Test app [here](https://webcam-test.davebitter.com/).

## Getting started
Webcam Test is a vanilla project build with [Parcel.js](https://parceljs.org/). You probably won't need to master Parcel to work on this project, but can read the docs to get up to speed

### Run development environment
`yarn dev` or `npm run dev` - starts the development environment with auto reloading and all that good stuff.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Scripts
Besides the development script, there are many more scripts set up:

* `start` - Starts the production server
* `dev` - Starts the development server
* `build` - Creates a fresh build to be deployed

### PWA with Workbox
Webcam test is a simple PWA with offline support. You can add the app to your homescreen as well.

### Netflify (CI/CD)
Webcam Test uses [Netlify](https://www.netlify.com/) (♥️) to build, deploy and optimise. Every push to the master branch will trigger the deploy pipeline.