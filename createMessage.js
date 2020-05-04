const azure = require('azure-storage');

require('dotenv').config();

const queueSvc = azure.createQueueService()
queueSvc.createQueueIfNotExists('myqueue', (error, results, response) => {
  if (error) return;
})

const args = process.argv.slice(2)

for (let i=0;i<args[0];i++) {
  queueSvc.createMessage('myqueue', `Hello world! ${i}`, (error, results, response) => {
    if(!error) {
      // Message inserted
    }
  })
}
