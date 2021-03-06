const {
    Worker, isMainThread, workerData
} = require('worker_threads');

const Mutex  = require ('./mutex');

const assert = require('assert');

if (isMainThread) {
    // In the main thread, this instantiates 4 workers working with the same memory
    const shared = new SharedArrayBuffer(5*4);
    const sharedInts = new Int32Array(shared);
    sharedInts.set([2,3,5,7,0]);
    for (let i = 0; i<3; i++) {
        new Worker(__filename, {workerData: {i, shared }});
    }
} else {
    // in child workers threads we try to execue a multiplication using a memory address shared  with other threads
    // The mutex class will ensure the execution will work as expected
    const { i, shared } = workerData;
    const sharedInts = new Int32Array(shared);
    const mutex = new Mutex(sharedInts, 4);
    mutex.exec(() => {
        const a = sharedInts[i];
        for(let j=0; j<1_000_000; j++) {}
        const b = sharedInts[3];
        sharedInts[3] = a * b;
        assert.strictEqual(sharedInts[3], a * b);
    });
}