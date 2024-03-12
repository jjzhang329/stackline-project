// server.js
import jsonServer from 'json-server';

const server = jsonServer.create()
const router = jsonServer.router('db.json') // Make sure db.json is in the root of your project
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
