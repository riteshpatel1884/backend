var arr = [1,2,3,4];

arr.forEach(function(val){
    console.log(val+ " hello");
})

// 1 hello
// 2 hello
// 3 hello
// 4 hello




// Map: It returns a new array with the same size as of original array. If we want to create 
// a new array then we use map
var arr2 = [1,2,3,4]

var ans = arr2.map(function(val){  // val me 1,2,3,4 aayega then wo return 13 ki value se replace ho jayega
    return 13;
})

console.log(ans)    //[ 13, 13, 13, 13 ] all 4 nums will be replaced by 13

var ans2 = arr2.map(function(val){ // val me 1,2,3,4 aayega then wo apne hi val ki valse se replace ho jayega
    return val;
})

console.log(ans2)   // [ 1, 2, 3, 4 ]

var ans3 = arr2.map(function(val){ // val me 1,2,3,4 aayega then wo apne hi val ki valse se replace ho jayega
    return val*4;
})

console.log(ans3)  // [ 4, 8, 12, 16 ]





// Filter: It will not the the original array. It will return a new filtered array
var arr = [1,2,3,4]

var ans4 = arr.filter(function(val){
    if(val>=3) return true;
})

console.log(ans4) // [ 3, 4 ]




// find
var arr = [1,2,2,3,4]
var ans5 = arr.find(function(val){
    if(val === 2) return 2
})

console.log(ans5)   // 2 (index 1 wala 2 dega means pehla 2)  otherwise it will return undefined



// IndexOf: 

console.log(arr.indexOf(12))    // -1
console.log(arr.indexOf(3))     // 3




// Objects

{} // blank object


// {
//     a: kolu // It is not an object it will be treated as variable 
// }


{
    a:"kolu"   // This is object as we  need to write value thats why object are called key value pair
}

var obj = {
    name: "Ritesh"
}

// To access value
// M1
console.log(obj.name)  // Ritesh

// M2
console.log(obj['name'])  // Ritesh


// To avoid changing any value in object use freeze
var obj2 = {
    name: "Ritesh"
}

Object.freeze(obj2);
obj2.name ="Raman"

console.log(obj2.name)  // Ritesh


// To find length of a function

function abcd(a,b,c){

}
console.log("Length of abcd: " + abcd.length)    // Length of abcd: 3 no of parameter = length of a function becoz at last function is an onbject and object has length




// Async js: Jo bhi code async nature ka ho, usse side stack me bhej do, amag aage ka code 
// chalao jo bhi sync nature ka ho, jab sara sync chode chal jaye tab check kro async code 
// complete hua hai ki nahi and agar wo complete hua ho then usko main stakc me le ao and 
// chala do. 

//  sync me code line by line chalta hai

async function abcd() {
    await fetch(`https://randomuser.me/api`)
    var ans = await blob.json()

    console.log(ans.results[0]);
}

abcd();