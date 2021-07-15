## Loving Sitter

Loving Sitter is a full-stack CRUD website that helps dog owners find dogsitters. Users can create accounts and find dogsitters based on their location and schedule. The site also includes real-timemessaging functionality between users for streamlined communication between dog owners and dogsitters. Payments to dogsitters is done using Stripe. Dog owners can submit reviews of dogsitters after receiving dogsitting services.

**Tech Stack:** MongoDB, Express.js, React.js, Node.js, Typescript
**Technologies/Libraries:** Socket.io, Stripe, Cloudinary

**Contributors**: [Wilson Fong](https://github.com/siuwafong), [David Lee](https://github.com/davidleecodes), [Alex Duria](https://github.com/Duria73)

---

### Getting Started

1. Clone or download repository

---

## Server

1. Go into the server directory `cd server`
2. Run `npm install` to install packages
3. Create your environment variable (.env) file. The following envrionment variables are required:
 * JWT_SECRET - [link](https://www.npmjs.com/package/jsonwebtoken)
 * MONGO_URI - [link](https://www.mongodb.com/)
 * CLOUDINARY_CLOUD_NAME - [link](https://cloudinary.com/)
 * CLOUDINARY_KEY - [link](https://cloudinary.com/)
 * CLOUDINARY_SECRET - [link](https://cloudinary.com/)
 * STRIPE_KEY - [link](https://stripe.com/docs/keys)
4. Run `npm run dev` to start the server

---

## Client

1. Go into the client directory `cd client`
2. Run `npm install` to install packages
3. Create your environment variable (.env) file. The following envrionment variables are required:
  * REACT_APP_STRIPE_PKEY - [link](https://stripe.com/docs/keys)
4. Run `npm start` to start the client side

---

### Demo

1. Registration. Users will be able to create a new account using their email and password

![Signup Demo](demo/images/loving-sitter-signup.png)

2. Dashboard. Here is a description about what a user can expect to see

![Dashboard](demo/images/dashboard.png)
