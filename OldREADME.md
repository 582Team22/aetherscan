# Old README instructions ...

## Get started:

1. `npm run dev` in `AetherScan/server` to start backend server @ `http://localhost:8080/api`
2. Create another tab in your terminal...
3. `npx vite` in `AetherScan/client` to start frontend server @ `http://localhost:5173/`

[Video used to init the repo](https://www.youtube.com/watch?v=mKmxc8TcWQ8)

## To run DB migrations:

1. `npx knex migrate:latest` from `server` directory

### To check on the DB schema:

1. `./scripts/check-schema.js` from `server` directory

### To check on a table schema:

1. `./scripts/check-table-schema.js <table_name>` from `server` directory

### To add a new executable script:

1. Write your script. Use `./scripts/check-schema.js` as a reference. Place it in `server/scripts`
2. Ensure `#!/usr/bin/env node` is at the top of the file, including the `#!`. This is a special comment that allows us to not have to type `node` before our script call
3. Run `chmod +x <path/to/script_file_name>` to make it executable. This is a permanent change (unless we manually change it later)
4. Done!

## To run tests:
1. `npm test` from `server` directory
