import {SIZE, syncOffset, imageOffset, BLACK, WHITE, THREADS} from './constants.js';

let sharedImageBuf;
let nextCells;
let cells;
let sync;

self.onmessage = initListener;
function initListener(msg) {
    const opts = msg.data;
    let sharedMemory = opts.sharedMemory;
    sync = new Int32Array(sharedMemory, syncOffset);
    self.removeEventListener('message', initListener);

    self.onmessage = runCoord;
    cells = new Uint8Array(sharedMemory);
    nextCells = new Uint8Array(sharedMemory, SIZE * SIZE);
    sharedImageBuf = new Uint32Array(sharedMemory, imageOffset);
    runCoord();
}


function runCoord() {
    for (let i=0; i<THREADS; i++) {
        Atomics.store(sync, i, 1);
        Atomics.notify(sync, i);
    }
    for(let i=0; i<THREADS; i++) {
        Atomics.wait(sync, i, 1);
    }
    const oldCells = cells;
    cells = nextCells;
    for (let x = 0; x<SIZE; x++) {
        for (let y =0; y<SIZE; y++) {
            sharedImageBuf[SIZE * x + y] = cells[SIZE * x + y] ? BLACK : WHITE;
        }
    }
    self.postMessage({});
}