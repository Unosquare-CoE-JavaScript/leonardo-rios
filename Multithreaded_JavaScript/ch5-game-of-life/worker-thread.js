
import { SIZE, syncOffset } from './constants.js';
import Grid from './Grid.js';

self.onmessage = function ({data: {range, sharedMemory, i}}) {
    const grid = new Grid(SIZE, sharedMemory);
    const sync = new Int32Array(sharedMemory, syncOffset);
    while (true) {
        Atomics.wait(sync, i, 0);
        grid.iterate(...range);
        Atomics.store(sync, i, 0);
        Atomics.notify(sync, i);
    }
}