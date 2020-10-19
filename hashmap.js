class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
        // this.MAX_LOAD_RATIO = 0.5;
        // this.SIZE_RATIO = 3;
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
        // [f3] check maximum load ratio
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;

        if (loadRatio > this.MAX_LOAD_RATIO) {  
            this._resize(this._capacity * this.SIZE_RATIO); 
        }
        // previously from Thinkful (didn't work)
        // if (loadRatio > HashMap.MAX_LOAD_RATIO) {
        //     this._resize(this._capacity * HashMap.SIZE_RATIO); 
        // }
        
        //Find the slot where this key should be in
        const index = this._findSlot(key);

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
                return index;
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


// FOOTNOTES

// Left shift operator (<<) 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift

// Unsigned right shift operator (>>>)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift

// [f3]
// Check maximum load ratio
// Notice that we have two attributes there MAX_LOAD_RATIO and SIZE_RATIO. Using MAX_LOAD_RATIO, we keep track of how full the hashmap is. When it is a certain % full, we move to a bigger hash table using the SIZE_RATIO so we reduce the number of collisions. By having a maximum load ratio you can minimize the chances that a value ends up a long way away from its hash position due to the slots being almost totally full. This helps to improve the performance of value retrieval.
// This has an O(1) best and average case, and an O(n) worst case (if collision takes place).

// [f4]
// "Resizing a hash map" is really a bit of a misnomer. To make sure that each item lives in the correct location you really just recreate the hash map from scratch with larger capacity.
// Because you have to call `set()` 1 time for each item, and each set call is O(1) in the best and average case, and O(n) in the worst case, this is O(n) in the best and average case and O(n^2) in the worst case.

// [f5]
// Deleting items becomes a bit tricky with open addressing.
// There are some clever (although complex) solutions involving tracing through and moving out-of-place items when something is removed. But the simplest solution is to not actually delete the item at all, and just put a deleted marker in the slot. Then on resize you can actually clear out all of the deleted items. This means that the hash map loads up slightly more quickly, but simplifies the code significantly.
// The most important things to note here are the addition of a `_deleted` count, a `deleted` property in each filled slot, and the `delete()` method. This simply finds the correct slot for the key, and sets the `DELETED` flag to `true`, decreasing the length and increasing the deleted count. There are also small changes to the `_resize()` and `_findSlot()` methods to handle deleted slots correctly.