# NestJS Microservices Monorepo (Products + Orders + Gateway)

Minimal monorepo containing:
- products-service (NestJS + TypeORM)
- orders-service (NestJS + TypeORM)
- gateway (NestJS reverse-proxy + API Key guard)
- libs/shared (DTOs)
- docker-compose to run Postgres + services (builds containers; you must run `docker-compose up --build` after `npm install` in each app or build custom images)

## Quickstart (developer machine)
1. Unzip project and `cd` into each app to install dependencies:
   - `cd apps/products-service && npm install`
   - `cd apps/orders-service && npm install`
   - `cd apps/gateway && npm install`
2. From project root run:
   - `docker-compose up --build`
3. Services:
   - Gateway: http://localhost:3000
   - Products: http://localhost:3001/docs
   - Orders: http://localhost:3002/docs


If postgres installation issue occurs then run this 

docker pull postgres:15

If any issue occurs

Run this command in Orders and Products src folder

npm install @nestjs/swagger@7.3.1 swagger-ui-express
npm install @nestjs/typeorm typeorm pg

Run this command in Gateway src folder

npm install @nestjs/config -- For APIKEY validation
npm install @nestjs/jwt jsonwebtoken -- For JWT Token Validation

To create a token again because expiry is 1 hour, use the below command in Gateway src folder 

node -e "console.log(require('jsonwebtoken').sign({ user: 'manish' }, '62A8FBC7FFCDC9CB35A4734A863F2', { expiresIn: '1h' }))"

> Note: This is a minimal scaffold intended to be expanded. TypeORM `synchronize: true` is enabled for development convenience.

