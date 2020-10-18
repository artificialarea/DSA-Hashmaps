const HashMap = require('./hashmap');

function main() {
    const lotr = new HashMap;

    lotr.MAX_LOAD_RATIO = 0.5;
    lotr.SIZE_RATIO = 3;

    // 1. add items to hashmap
    let addItems = [
        {'Hobbit': 'Bilbo'}, 
        {'Hobbit': 'Frodo'},
        {'Wizard': 'Gandalf'}, 
        {'Human': 'Aragorn'}, 
        {'Elf': 'Legolas'}, 
        {'Maiar': 'The Necromancer'},
        {'Maiar': 'Sauron'}, 
        {'RingBearer': 'Gollum'}, 
        {'LadyOfLight': 'Galadriel'}, 
        {'HalfElven': 'Arwen'},
        {'Ent': 'Treebeard'},
    ];

    addItems.forEach(item => {
        for (let key in item) {
            lotr.set(key, item[key]);
        }
    });

    // 2. retreive the values of...
    lotr.get('Maiar');
    lotr.get('Hobbit');
    console.log(lotr.get('Maiar'));
    console.log(lotr.get('Hobbit'));

    console.log(lotr);
    return lotr;
}

main();
// console.log(main());