class HashMap {
    constructor(initialCapacity = 11) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            return null;
            // throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }

    // NOTE! regarding load ratio...
    // Thinkful code had:
    // HashMap.MAX_LOAD_RATIO
    // HashMap.SIZE_RATIO
    // which was ignored... so changed the reference from `HashMap` to `this`:
    // this.MAX_LOAD_RATIO
    // this.SIZE_RATIO
    set(key, value){
        //Find the slot where this key should be in
        const index = this._findSlot(key);
        console.log(index, key)

        if(!this._hashTable[index]){
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }; 
    }

    // [f5]
    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    // internal private helper functions /////////////////////////////////////

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;
        // We use a for loop to avoid collisions by open addressing
        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            // console.log('index: ', index);
            // console.log('slot: ', slot);
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                // console.log('undefined slot found')
                return index;
            } else {
                // console.log('undefined slot NOT FOUND... next?')
            }
        }
    }

    // [f4]
    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    /* "The hash function described in this lesson (_hashString(string)) uses the ASCII value of the characters in the string, adds them together, and uses other information to get a better distribution in the hash table." */
    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negtive number. 
        return hash >>> 0;
    }
}

module.exports = HashMap;