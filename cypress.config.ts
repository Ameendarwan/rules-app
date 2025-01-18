import { defineConfig } from 'cypress';
import * as process from 'node:process';

// Load environment variables from .env file
require('dotenv').config({
  path: './env/.env.development',
});

const baseUrl = process.env.E2E_BASE_URL;

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    // Give us more time since we're running the dev server
    // when we're using localhost
    defaultCommandTimeout: baseUrl?.includes('localhost') ? 20_000 : 15_000,
    // We have to disable this otherwise our Auth0 login
    // command starts bugging.
    // If we don't use it, we have to drop baseUrl for some reason.
    chromeWebSecurity: false,
    baseUrl: baseUrl,
    setupNodeEvents(on, config) {
      console.log(on, config);
      // implement node event listeners here
    },
    env: {
      AUTH0_USERNAME: process.env.AUTH0_USERNAME,
      AUTH0_PASSWORD: process.env.AUTH0_PASSWORD,
      AUTH0_CLIENT_ID: process.env.VITE_REACT_APP_AUTH0_CLIENT_ID,
      AUTH0_DOMAIN: process.env.VITE_REACT_APP_AUTH0_DOMAIN,
      E2E_BASE_URL: baseUrl,
    },
  },
  video: false,
});
