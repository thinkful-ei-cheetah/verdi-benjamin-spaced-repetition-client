# Bonjour! Client App
Bonjour! is a French language learning app that utilizes the space repetition method for learning.  The app is currently a proof of concept and supports 8 seeded words.

This repo is the front-end client, built in React.  You can see the app live at [https://bonjour-app.now.sh](https://bonjour-app.now.sh)

The app is mobile optimized and scales nicely between 320px and 1200px.

## Introduction

Learning a new language can be daunting. The spaced repetition method is a proven way to enhance memorization which makes it ideal for learning a new language. To create the space repetition algorithm we used a singly linked list to move words into their proper invervals.

## Quick App Demo

![Demo Gif](https://i.imgur.com/TCrpdT6.gif)

## Technology

#### Front End

* React
  * Create React App
  * React Router
* HTML5
* CSS3 (scratch - no frameworks)

#### Testing

* Cypress

#### Production

* Deployed via Zeit

## Getting Started

Run `npm install` to load dependencies

Run `npm run cypress:open` to open the cypress dashboard and then hit `run all` to run all of the integration tests.

This is only the front end client, so develop locally you'll need the backend server as well.

To get the backend up and running see [https://github.com/thinkful-ei-cheetah/verdi-benjamin-spaced-repetition-server](https://github.com/thinkful-ei-cheetah/verdi-benjamin-spaced-repetition-server)

Deployments are handled through Zeit and can be run via `npm run deploy`
