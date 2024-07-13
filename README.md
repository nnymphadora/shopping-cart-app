# ShoppingCartApp

This Angular app allows you to manage a shopping cart with products fetched from an external API. The application includes product listing, filtering, pagination, product details view in a modal, cart management, checkout process, and a success page.

# Features

1. **Product List**

   - Fetches initial products from [dummyjson.com/products](https://dummyjson.com/products).
   - Displays basic product info
   - Allows filtering by product name
   - Implements pagination with selectable number of results per page (5, 10, 20, 50)

2. **Product Single View**

   - Displays detailed information about a selected product in a modal
   - Fetches product details from [dummyjson.com/products/{id}](https://dummyjson.com/products/{id}).
  

3. **Cart**

   - Icon button with a badge showing the total number of products in the cart
   - Cart view in a modal, allowing users to adjust quantities and delete items
   - Shows total price, clear cart button and a checkout button

4. **Checkout**

   - Shows the cart component and a reactive form with fields for name, address, email, and telephone number
   - Validates form fields and shows error messages
   - Users can edit cart item quantites or clear cart
   - Submits the form data to a mock API at [dummyjson.com/http/200](https://dummyjson.com/http/200).

5. **Success Page**
   - Displays checkout success information.

# Installation

To install and run this project locally, follow these steps:

- Clone this repository to your local machine.
- Navigate to the project directory.
- Run npm install to install the dependencies.
- Run npm start to start the development server.
- Open your browser and visit http://localhost:4200 to view the app.

# Dependencies

- Angular: ^17.2.0
- @ng-bootstrap/ng-bootstrap: ^16.0.0
- bootstrap: ^5.3.3
- RxJS: ~7.8.0
- Zone.js: ~0.14.3


# shopping-cart-app
