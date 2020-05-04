const http = require('http')
const azure = require('azure-storage');

require('dotenv').config();

const queueSvc = azure.createQueueService()
queueSvc.createQueueIfNotExists('myqueue', (error, results, response) => {
  if (error) return;
})


// 毎秒32件づつ読み込む
setInterval(() => {
  queueSvc.getMessages('myqueue', {numOfMessages: 32}, (error, results, response) => {
    if (!error && results.length !== 0) {
      console.log(results.length)
      results.forEach(result => {
        const { messageId , popReceipt, messageText } = result
        console.log(messageText)
        queueSvc.deleteMessage('myqueue', messageId, popReceipt, (error, response) => {
          if(!error){
          }
        })
      })
    }
  })
}, 1000)

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('now dequing');
})

const port = process.env.PORT || 1337;

server.listen(port);

console.log('Server running at http://localhost:%d', port);
