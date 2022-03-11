const Mutex = require('../ch6-mutex/mutex');

class RingBuffer {
    constructor(meta, buffer) {
        this.meta= meta;
        this.buffer = buffer;
    }
    get head() {
        return this.meta[0];
    }
    set head(n) {
        this.meta[0] = n;
    }
    get tail() {
        return this.meta[1];
    }
    set tail(n) {
        this.meta[1] = n;
    }
    get length() {
        return this.meta[2];
    }
    set length(n) {
        this.meta[2] = n;
    }

    write (data) {
        let bytesWritten = data.length;
        if (bytesWritten > this.buffer.length - this.length) {
            bytesWritten = this.buffer.length - this.length;
            data = data.subarray(0, bytesWritten);
        }
        if (bytesWritten === 0) {
            return bytesWritten;
        }
        if (
            (this.head >= this.tail && this.buffer.length - this.head >= bytesWritten) ||
            (this.head < this.tail && bytesWritten <= this.tail - this.head)
        ) {
            this.buffer.set(data, this.head);
            this.head += bytesWritten;
        } else {
            const endSpaceAvailable = this.buffer.length - this.head;
            const endChunk = data.subarray(0, endSpaceAvailable);
            const beginChunk = data.subarray(endSpaceAvailable);
            this.buffer.set(endChunk, this.head);
            this.buffer.set(beginChunk, 0);
            this.head = beginChunk.length;
        }
        this.length += bytesWritten;
        return bytesWritten;
    }
    read (bytes) {
        if(bytes > this.length) {
            bytes = this.length;
        }
        if (bytes === 0){
            return new Uint8Array(0);
        }
        let readData;
        if(this.head > this.tail || this.buffer.length - this.tail >= bytes){
            readData = this.buffer.slice(this.tail,bytes);
            this.tail += bytes;
        } else {
            readData = new Uint8Array(bytes);
            const endBytesToRead = this.buffer.length - this.tail;
            readData.set(this.buffer.subarray(this.tail, this.buffer.length));
            readData.set(this.buffer.subarray(0, bytes - endBytesToRead), endBytesToRead);
            this.tail = bytes - endBytesToRead;
        }
        this.length -= bytes;
        return readData;
    }
}


class SharedRingBuffer {
    constructor (shared) {
        this.shared = typeof shared === 'number' ?
            new SharedArrayBuffer(shared + 16) : shared;
        this.ringBuffer = new RingBuffer(
            new Uint32Array (this.shared, 4, 3),
            new Uint8Array (this.shared, 16)
        );
        this.lock = new Mutex (new Int32Array(this.shared, 0, 1));
    }
    write(data) {
        return this.lock.exec(() => this.ringBuffer.write(data));
    }
    read(bytes) {
        return this.lock.exec(() => this.ringBuffer.read(bytes));
    }
}


const {isMainThread, Worker, workerData} = require ('worker_threads');
const fs = require('fs');

if(isMainThread) {
    const shared  = new SharedArrayBuffer(116);
    const threads = [
        new Worker (__filename, { workerData: {shared, isProducer: true } }),
        new Worker (__filename, { workerData: {shared, isProducer: true } }),
        new Worker (__filename, { workerData: {shared, isProducer: false } }),
        new Worker (__filename, {workerData: {shared, isProducer: false } })
    ];
} else {
    const {shared, isProducer} = workerData;
    const ringBuffer = new SharedRingBuffer(shared);
    if (isProducer) {
        const buffer = Buffer.from('Hello, World\n');
        while(true) {
            ringBuffer.write(buffer);
        }
    } else {
        while(true){
            const readBytes = ringBuffer.read(20);
            fs.writeSync(1, `Read ${readBytes.length} bytes\n`);
        }
    }
}