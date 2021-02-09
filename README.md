# ticketlive-backend

## Setup

```sh
# Rodar script do banco
psql -U username -d myDataBase -a -f scriptDB.sql

# Install dependencies
npm install || yarn

# Rodar migration 
npm run typeorm migration:run || yarn typeorm migration:run

# Run develpment
npm run dev:server || yarn dev:server

```
