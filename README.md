# Webshop Node.js

## Project Description

*The Precious Webshop* is an e-commerce web application built with Node.js, Express, and EJS.  
It allows users to browse a shop of gemstones and jewelry, add products to their cart, and manage their session.

### Key Features
- Browse shop products
- Add and remove products from the cart
- User session management with express-session
- Dynamic interface using EJS templates

## Installation and Running the App

1. **Clone the repository**  
`git clone https://github.com/MaxHenrotin/Webshop-nodejs.git`  
`cd Webshop-nodejs`

2. **Install dependencies**  
`npm install`

3. **Start the server**  
`node server.js`

4. **Access the application**  
Open a browser and go to `http://localhost:{PORT}` (usually PORT = 3000)

## Project Structure

```
server.js            # Main file that configures Express server, sessions, and routes
routes/              # Contains the application routes
    home.routes.js
    cart.routes.js
views/               # EJS templates for pages and partials
    cart.ejs
    home.ejs
public/              # Static files (images, JS, CSS)
    images/
    scripts/
    styles/
data/
    data.js          # Product data in JSON format
package.json
```
