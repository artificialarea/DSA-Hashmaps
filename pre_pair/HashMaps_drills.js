const HashMap = require('./hashmap');

function main() {
    const lotr = new HashMap;

    lotr.MAX_LOAD_RATIO = 0.5;
    lotr.SIZE_RATIO = 3;

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

    console.log(lotr);

}

main();