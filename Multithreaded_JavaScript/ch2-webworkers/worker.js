console.log('hello from worker.js')
self.onmessage = (msg) => {
    console.log('message from main:', msg.data);
    postMessage('message sent from worker');
}
console.log('end of worker.js')