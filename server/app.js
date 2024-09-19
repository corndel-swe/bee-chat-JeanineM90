import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 5001 })

server.on('connection', (socket) => { // do what we want with the socket, e.g:
    //socket.on('message', handleMessage)
    //socket.on('close', cleanUp)
    console.log('Someone connected!');

    socket.on('message', (message) => {
        /*
        for (let client of server.clients) {
        client.send(message)
        */
        // (all connected users will receive any message sent by any other user)
        console.log(`Recieved message: ${message}`);
        const parsedMessage = JSON.parse(message)
        broadcast(parsedMessage.content);
    })
})

function broadcast(content) {
    server.clients.forEach(client => {
        const sendable = JSON.stringify({
            "content": content
        })
        client.send(sendable);
    })
}

/* Tech Docs:

Sending a message back: 
socket.send('Hello from the server!')

--

If a user sends a message without specifying an ID, the message should be sent to every connected client:

{
  "recipientId": "",
  "content": "Hello, world"
}

--

Next for Stage 2: 

Create an `allUsers` list (the user "id" is just the index)

  {
     "recipientId": 3,
     "content": "Hello, number 3!"
   }

*/