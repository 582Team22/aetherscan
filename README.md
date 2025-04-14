# AetherScan

## Setup
1. `npm i` in `aetherscan/` to install all dependencies. If you are having trouble with running the web app, run `rm -rf node_modules && rm package-lock.json`.
2. Ensure `.env` file is placed in root directory. (Should be here -> `aetherscan/.env`)

## Running the app:
1. `npx vite` in `aetherscan/` to start frontend server @ `http://localhost:5173/`

## Deploying the app:
1. Ideally, make sure the changes are up to date and pushed to main.
2. Then run `npm run predeploy && npm run deploy`. The app should be deployed now (takes about a minute for changes to propogate to website).
3. Visit [https://582team22.github.io/aetherscan]!

## Managing the database
Supabase is the host of our database. If you need to make a new table, navigate to the Team22 organization and then to the AetherScan project. 
