if(!crossOriginIsolated) throw new Error('Cannot use SharedArrayBuffer');

const buffer = new SharedArrayBuffer(128);
const view = new Int32Array(buffer);
const now = Date.now();
let count = 4;

for(let i = 0; i<buffer.byteLength; i++){
    const worker = new Worker('worker.js');
    worker.postMessage({buffer, name: i});
    worker.onmessage = () => {
        console.log(`Ready; id=${i}, count=${--count}, time=${Date.now() - now}ms`);
        if(count === 0) {
            Atomics.notify(view, 0);
        }
    };
}