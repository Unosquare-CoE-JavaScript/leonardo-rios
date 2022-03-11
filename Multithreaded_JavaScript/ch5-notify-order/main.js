if(!crossOriginIsolated) throw new Error('Cannot use SharedArrayBuffer');

const buffer = new SharedArrayBuffer(8);
const view  = new Int32Array(buffer);

for(let i = 0; i<buffer.byteLength; i++) {
    const worker = new Worker('worker.js');
    worker.postMessage({buffer, name: i});
}
setTimeout(()=>{
    Atomics.notify(view, 0);
}, 500);