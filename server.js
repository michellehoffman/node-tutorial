const http = require('http');
const url = require('url');
const server = http.createServer();

let id = 4
let messages = [{
  'id': 1,
  'user': 'britney spears',
  'message': 'its britney, bitch'
},
{
  'id': 2,
  'user': 'bob loblaw',
  'message': 'check out my law blog'
},
{
  'id': 3,
  'user': 'lorem ipsum',
  'message': 'dolor sit amet'
}];

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

function getAllMessages(response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.write(JSON.stringify(messages));
  response.end();
}

function addMessage(newMessage, response) {
  messages = [... messages, newMessage],

  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.write(JSON.stringify(messages));
  response.end();
}

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  } else if (request.method === 'POST') {
    let newMessage = {
      'id': id++
    };

    request.on('data', data => {
      newMessage = Object.assign(newMessage, JSON.parse(data))
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});