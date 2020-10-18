const HashMap = require('./hashmap');   // v1
// const { HashMap } = require('./hashmap-class-v2');

function removeDuplicates(str) {

    // v1 mine ///////////////////////////////////////////////////
    // let map = new HashMap;

    // // populate hashmap with characters from the string
    // let strArr = str.split('');
    // console.log(strArr);
    // strArr.forEach(char => {
    //     map.set(char);
    // });


    // console.log(map)
    //return modifiedString;

    // v2 marius ///////////////////////////////////////////////////
    const lib = new HashMap;

    let result = '';

    for (let char of str) {
        if (!lib.get(char)) { // If the char is not in the library, add the char to our result and then add it to the library
            result += char;
            lib.set(char, true);
        }
    }

    console.log(result)
    return result;

}

removeDuplicates('google');
removeDuplicates('google all that you think can think of');