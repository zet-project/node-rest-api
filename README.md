# node-rest-api #
Example of simple REST API with Node.

## Requirements ##
- [Node](http://nodejs.org) and [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.org)

## Installation ##
- Clone the repo: `git clone git@github.com:zet-project/node-rest-api.git`
- Install dependencies: `npm install`
- Start the server: `node server.js`

## Testing the API ##
Test API using frontend http://localhost:8080 or [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) in Chrome.

## API Routes ##

<table>
  <thead>
    <tr>
      <th>Route</th>
      <th>HTTP Verb</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/api/items</td>
      <td>GET</td>
      <td>Get all the items.</td>
    </tr>
    <tr>
      <td>/api/items</td>
      <td>POST</td>
      <td>Create an item.</td>
    </tr>
    <tr>
      <td>/api/items/:item_id</td>
      <td>GET</td>
      <td>Get a single item.</td>
    </tr>
    <tr>
      <td>/api/items/:item_id</td>
      <td>PUT</td>
      <td>Update an item with new info.</td>
    </tr>
    <tr>
      <td>/api/items/:item_id</td>
      <td>DELETE</td>
      <td>Delete an item.</td>
    </tr>
  </tbody>
</table>

## Tutorials and sources ##
- [Building a RESTful API in Node and Express 4](http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4)
- [Setting Up a MEAN Stack Single Page Application](https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application)
- [AngularJS](https://docs.angularjs.org/guide)
- [ExpressJS](http://expressjs.com/)
- [MongooseJS](http://mongoosejs.com/docs/index.html)