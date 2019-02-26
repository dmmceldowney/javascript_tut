// Lecture: let and const

/*
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
// console.log(name5);      // "Jane Miller"

// ES6
const name6 = 'Jane Smith'; // we can not change this
let age6 = 23;              // we can change this
name6 = 'Jane Miller';
// console.log(name6);      // Error: can't change constants
*/
/*
// ES5
function driversLicense5(passedTest){
    if(passedTest){
        console.log(firstName);                // hoisted upon reading
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    
    console.log(firstName + ' ' + yearOfBirth);

}

driversLicense5(true);

// ES6
function driversLicense6(passedTest){

    console.log(firstName);                     // Can not use b/c it's not declared; it's not hoisted upon reading

    let firstName;
    const yearOfBirth = 1990;

    if(passedTest){
        firstName = 'John';                     // this is block scoped
    }                                           // those block scoped variables are no longer valid variables
    
    console.log(firstName + ' ' + yearOfBirth);
}

driversLicense6(true);

*/
/*
let i = 23;

for (let i = 0; i < 5; i++){ // this i variable is DIFFERENT than the OTHER i variable
    console.log(i);  // 0, 1, 2, 3, 4
}

console.log(i);
*/

/*
//////////////////////////////////////////////////////////////////////////
// Lecture: Blocks and IIFEs

// ES6
{   // This is basically an IIFE; lots of data privacy
    const a = 1;
    let b = 2;
    var c = 3;
}

// console.log(a + b);
console.log(c);

//console.log(a + b);

// ES5
(function() {
    var c = 3;
})();

// console.log(c);
*/

//////////////////////////////////////////////////////////////////////////
// Lecture: Strings
/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year){
    return 2019 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));     // true
console.log(n.startsWith('F'));     // false
console.log(n.startsWith('j'));     // false
console.log(n.startsWith('John'));  // true


console.log(n.endsWith('th'));      // true
console.log(n.endsWith('ge'));      // false

console.log(n.includes(' '));       // true
console.log(n.includes('oh'));      // true

console.log(firstName.repeat(5));   // JohnJohnJohnJohnJohn
console.log(`${firstName} `.repeat(5));   // John John John John John
*/


//////////////////////////////////////////////////////////////////////////
// Lecture: Arrow Functions
/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el){
    return 2019 - el;
});
console.log(ages5);

// ES6
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2019 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`;
});
console.log(ages6);
*/

//////////////////////////////////////////////////////////////////////////
// Lecture: Arrow Functions 2
/*
// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function(){
        var self = this;
        document.querySelector('.green').addEventListener('click', function(){
            var str = 'This box number is ' + self.position + '. And it is ' + self.color + '.';
            alert(str);
        });
    },
}
// box5.clickMe();


// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function(){

        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This box number is ' + this.position + '. And it is ' + this.color + '.';
            alert(str);
        });
    },
}
box6.clickMe();


/*
const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {        // "this." means the window object.
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This box number is ' + this.position + '. And it is ' + this.color + '.';
            alert(str);
        });
    },
}
// box66.clickMe(); 


function Person(name){
    this.name = name;
}

Person.prototype.myFriends5 = function(friends){
    // this points to Person (John)
    var arr = friends.map(function(el){
        // "this." points to the window
        return this.name + ' is friends with ' + el + '.';
    }.bind(this));

    console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
//new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function(friends){
    // this points to Person (John)
    var arr = friends.map(el => `${this.name} is friends with ${el}.`);
    console.log(arr);
};

new Person('Mike').myFriends6(friends);
*/


//////////////////////////////////////////////////////////////////////////
// Lecture: Destructuring
/*
// ES5
var john = ['John', 26];
//var name = john[0];
//var age = john[1];

// ES6
// const [name, age] = ['John', 26];
// console.log(name);
// console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    firstName, lastName // Must match the keys above
} = obj;
// console.log(firstName);
// console.log(lastName);

const {firstName: a, lastName: b} = obj;

// console.log(a);
// console.log(b);


function calcAgeRetirement(year){
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
};

const [age, retirement] = calcAgeRetirement(1990);
console.log(age);
console.log(retirement);
*/

/////////////////////////////////////////////////////////////////////////
// Lecture: Arrays

const boxes = document.querySelectorAll('.box');

// ES5
/*
var boxesArr5 = Array.prototype.slice.call(boxes);

boxesArr5.forEach(function(cur){
    cur.style.backgroundColor = 'dodgerblue';
});
*/

// ES6
/*
const boxesArr6 = Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');
*/

const boxesArr6 = Array.from(boxes);


// ES5
/*
for (var i = 0; i < boxesArr5.length; i++){
    if (boxesArr5[i].className === 'box blue'){
        continue;
    }
    boxesArr5[i].textContent = 'I changed to Blue!';
}
*/

// ES6 - "for of" loops
for (const cur of boxesArr6){ // This is like the python for in loop
    if (cur.className.includes('blue')){
        continue;
    }
    cur.style.backgroundColor = 'dodgerblue';
    cur.textContent = 'I changed to Blue!';
}

// ES5 
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function(cur){
    return cur >= 18;
});
//console.log(full);

//console.log(full.indexOf(true));
//console.log(ages[full.indexOf(true)]);


// ES6 - find index method
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
























