# Working with hash maps

**[Thinkful Data Structures & Algorithms assignment](https://courses.thinkful.com/dsa-v1/checkpoint/7#assignment)**

To run any of these scripts, in terminal command line enter: `node script-name.js`

<br />

## 1. Create a HashMap class

see: **[`hashmap.js`](https://github.com/artificialarea/DSA-Hashmaps/blob/main/hashmap.js)** + **[`HashMaps_drills.js`](https://github.com/artificialarea/DSA-Hashmaps/blob/main/HashMaps_drills.js)**

<br />

**Print your hash map and notice the length and items that are hashed in your hash map. Have you hashed all the items you were asked to? What are the values of Maiar and Hobbit that you have? Is there a discrepancy?** Discrepancy? Yes. The length of the Hash Map should be 11, not 9. Instances where there are two items/values with the same `key` -- `Hobbit` and `Maiar` -- only one of their values is displayed, presumably due to collision. Confused why the items weren't added to an empty slot in the array with open addressing... and why their respective second set values replace the first values in the original slots?

Points of confusion:
* Why is the Hash Table ordered the way it is? It's not in the order I set(), nor alphabetical, etc?
    * Answer: The address/index of each key is calculated via a hashing algorithm. It's essentially a memory address. `address = key Mod n`: "the address is the `key`, modulo `n`, where `n` is the number of available addresses."

* Why hasn't the open addressing worked for adding the second key values of `Hobbit` and `Maiar`?

* Why is the second value for a particular item/key replaced the first initial value in the Hash Table? I would have thought that value would have been rejected due to collision with the initial set value for that item?
    * Answer: Couldn't find it, per se... but it appears without the (explicit?) use of open addressing or chaining the value of the key is forced to be replaced?

Output
```
HashMap {
  length: 9,
  _hashTable: [
    <2 empty items>,
    { key: 'HalfElven', value: 'Arwen', DELETED: false },
    <1 empty item>,
    { key: 'LadyOfLight', value: 'Galadriel', DELETED: false },
    <1 empty item>,
    { key: 'Wizard', value: 'Gandalf', DELETED: false },
    { key: 'RingBearer', value: 'Gollum', DELETED: false },
    <4 empty items>,
    { key: 'Elf', value: 'Legolas', DELETED: false },
    { key: 'Hobbit', value: 'Frodo', DELETED: false },
    <6 empty items>,
    { key: 'Ent', value: 'Treebeard', DELETED: false },
    <1 empty item>,
    { key: 'Human', value: 'Aragorn', DELETED: false },
    { key: 'Maiar', value: 'Sauron', DELETED: false }
  ],
  _capacity: 24,
  _deleted: 0,
  MAX_LOAD_RATIO: 0.5,
  SIZE_RATIO: 3
}

```

Btw, initial output _without_ maximum load ratio
```
HashMap {
  length: 9,
  _hashTable: [
    { key: 'Maiar', value: 'Sauron', DELETED: false },
    { key: 'RingBearer', value: 'Gollum', DELETED: false },
    { key: 'LadyOfLight', value: 'Galadriel', DELETED: false },
    { key: 'HalfElven', value: 'Arwen', DELETED: false },
    { key: 'Elf', value: 'Legolas', DELETED: false },
    { key: 'Hobbit', value: 'Frodo', DELETED: false },
    { key: 'Wizard', value: 'Gandalf', DELETED: false },
    { key: 'Human', value: 'Aragorn', DELETED: false },
    undefined: { key: 'Ent', value: 'Treebeard', DELETED: false }
  ],
  _capacity: 8,
  _deleted: 0,
}
```



<br />

## 2.