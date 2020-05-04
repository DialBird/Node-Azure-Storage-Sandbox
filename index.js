const http = require('http')
const azure = require('azure-storage');

require('dotenv').config();

const queueSvc = azure.createQueueService()
queueSvc.createQueueIfNotExists('myqueue', (error, results, response) => {
  if (error) return;
})

queueSvc.createMessage('myqueue', `Hello world! ${new Date()}`, (error, results, response) => {
  if(!error) {
    // Message inserted
  }
})

// queueSvc.peekMessages('myqueue', (error, results, response) => {
//   if(!error) {
//     text = results.messageText
//   }
// })

let text

queueSvc.getMessages('myqueue', {numOfMessages: 1}, (error, results, response) => {
  if(!error && results.length !== 0) {
    const { messageId , popReceipt, messageText } = results[0]
    text = messageText
    queueSvc.deleteMessage('myqueue', messageId, popReceipt, (error, response) => {
      if(!error){
        console.log(response)

        const server = http.createServer((request, response) => {
          response.writeHead(200, { 'Content-Type': 'text/plain' });
          response.end(text);
        })

        const port = process.env.PORT || 1337;

        server.listen(port);

        console.log('Server running at http://localhost:%d', port);
      }
    })
  }
})
