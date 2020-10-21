// see diagram of output here: https://raw.githubusercontent.com/artificialarea/DSA-Hashmaps/main/images/hashmap_open_address.jpg
// ^^ why does this output not equal this diagram?

const HashMap = require('./hashmap-fixed');

function main() {
    const set = new HashMap;

    // set.MAX_LOAD_RATIO = 0.5;
    // set.SIZE_RATIO = 3;

    // 1. add items to hashmap
    // testing to understand that although keys can share the same hash value, and thus be added via open addressing or chaining
    // keys are unique, ergo there the keys 'Hobbit' and 'Maiar' are unique and so can only have one value.
    // let addItems = [10, 22, 31, 4, 15, 28, 17, 88, 59];
    let addItems = [18, 22, 31, 9, 15, 28, 17, 32, 59];

    addItems.forEach(item => {
        set.set(item);
    });

    console.log(addItems);
    console.log(set);
}

main();
// console.log(main());