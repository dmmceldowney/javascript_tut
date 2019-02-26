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

// ES5
/*

const boxes = document.querySelectorAll('.box');
var boxesArr5 = Array.prototype.slice.call(boxes);

boxesArr5.forEach(function(cur){
    cur.style.backgroundColor = 'dodgerblue';
});


// ES6

// const boxesArr6 = Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');


const boxesArr6 = Array.from(boxes);


// ES5

for (var i = 0; i < boxesArr5.length; i++){
    if (boxesArr5[i].className === 'box blue'){
        continue;
    }
    boxesArr5[i].textContent = 'I changed to Blue!';
}


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
*/

/////////////////////////////////////////////////////////////////////////
// Lecture: Spread operator
/*
function addFourAges(a, b, c, d){
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);      // 81
///////////////////////////////////////

var ages = [18, 30, 12, 21];

// ES5
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);      // 81

// ES6 

// spreading arrays
const sum3 = addFourAges(...ages);
console.log(sum3);      // 81

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, ...familyMiller];
console.log(bigFamily);    // [ "John", "Jane", "Mark", "Mary", "Bob", "Ann" ]
console.log(familySmith);  // [ "John", "Jane", "Mark" ]

const newBigFamily = [...familySmith, 'Lilly', ...familyMiller];
console.log(newBigFamily); // [ "John", "Jane", "Mark", "Lilly", "Mary", "Bob", "Ann" ]

// With a node list:
const h = document.querySelector('h1'); // not a node list, just a node
const boxes = document.querySelectorAll('.box'); // node list

const allItems = [h, ...boxes]; // h is a node, so don't spread it

Array.from(allItems).forEach(cur => cur.style.color = 'purple');
*/

/////////////////////////////////////////////////////////////////////////
// Lecture: Rest parameters

// ES5
/*
function isFullAge5() {
    // console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);
    console.log(argsArr);
    
    argsArr.forEach(function (cur) {
        console.log((2019 - cur) >= 18);
    });
}

// isFullAge5(1990, 1999, 1965);
// isFullAge5(1990, 1999, 1965, 2016, 1987);


// ES6
function isFullAge6(...years){
    years.forEach(cur => console.log((2019 - cur) >= 18));
}

isFullAge6(1990, 1999, 1965);
// isFullAge6(1990, 1999, 1965, 2016, 1987);
*/

// ES5
/*
function isFullAge5(limit) {
    // console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1);
    console.log(argsArr);
    
    argsArr.forEach(function (cur) {
        console.log((2019 - cur) >= limit);
    });
}

//isFullAge5(16, 1990, 1999, 1965);
//isFullAge5(1990, 1999, 1965, 2016, 1987);


// ES6
function isFullAge6(limit, ...years){
    years.forEach(cur => console.log((2019 - cur) >= limit));
}

isFullAge6(18, 1990, 1999, 1965);
*/

/////////////////////////////////////////////////////////////////////////
// Lecture: Default parameters
/*
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality){

    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'American' : nationality = nationality;

    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
};

var john = new SmithPerson('john', 1990); 
console.log(john); // { firstName: "john", yearOfBirth: 1990, lastName: "Smith", nationality: "American" }

var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');
console.log(emily); // { firstName: "Emily", yearOfBirth: 1983, lastName: "Diaz", nationality: "Spanish" }


// ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American'){
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}

var john = new SmithPerson('john', 1990); 
console.log(john); // { firstName: "john", yearOfBirth: 1990, lastName: "Smith", nationality: "American" }

var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');
console.log(emily); // { firstName: "Emily", yearOfBirth: 1983, lastName: "Diaz", nationality: "Spanish" }
*/


/////////////////////////////////////////////////////////////////////////
// Lecture: maps

/*
const question = new Map();
question.set('question', 'What is the official name of the latest ~major~ Javascript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer!');
question.set(false, 'Wrong answer.');

console.log(question.get('question')); // What is the official name of the latest ~major~ Javascript version?
// console.log(question.size); // 8

//question.delete(4);
//console.log(question.size); // 7

//question.delete(4);
//console.log(question.size); // 7

//if (question.has(4)){ // does not have a 4
  //  question.delete(4); 
//} // does nothing

// question.clear();
//console.log(question); // Map(0)

// question.forEach((value, key) => console.log(`This is ${key} and it's set to ${value}.`));

for (let [key, value] of question.entries()){
    if (typeof(key) === 'number'){
        console.log(`Answer: ${key}: ${value}.`);
    }
}

const ans = parseInt(prompt('Write the correct answer.'));

console.log(question.get(ans === question.get('correct'))); 
*/


/////////////////////////////////////////////////////////////////////////
// Lecture: Classes

// ES5
/*
var Person5 = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function(){
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
};

var john5 = new Person5('John', 1990, 'teacher');

// ES6
class Person6 {
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    static greeting(){
        console.log('Hello, there!');
    }
}

const john6 = new Person6('John', 1990, 'teacher');
console.log(Person6.greeting());         // 'Hello, there!'
console.log(john6.greeting());          // TypeError: john6.greeting is not a function[Learn More]
*/


/////////////////////////////////////////////////////////////////////////
// Lecture: Classes and subclasses
/*
var Person5 = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function(){
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
};

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals){
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function(){
    this.medals++;
    console.log(this.medals);
};

var johnAthlete5 = new Athlete5('John', 1989, 'swimmer', 3, 10);
*/
/*
// ES6
class Person6 {
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals){
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal(){
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1989, 'swimmer', 3, 10);
*/


/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Project {
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Project {
    constructor(name, buildYear, area, treeCount){
        super(name, buildYear);
        this.treeCount = treeCount;
        this.area = area;
    }

    getTreeDensity(){
        const density = this.treeCount / this.area;
        console.log(`${this.name} Park has a tree density of ${density} trees per square km.`) ;
    }
}

class Street extends Project {
    constructor(name, buildYear, length, size = 3){
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classifyStreet() { //   tiny/small/normal/big/huge
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name} Street, built in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }   
}

const allParks = [];
const allStreets = [];

allParks.push(new Park('MacArthur', 1987, .2, 215));
allParks.push(new Park('Hyde', 1894, 2.9, 3541));
allParks.push(new Park('LeVeon', 1953, 0.4, 949));

allStreets.push(new Street('Main', 1875, 1, 1));
allStreets.push(new Street('Butler', 1940, 10, 5));
allStreets.push(new Street('Nugent', 1910, 4, 4));
allStreets.push(new Street('Juniper', 1969, 1));


function calc(arr) {

    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);

    return[sum, sum / arr.length];

}

function reportParks(parks){
    console.log('------PARKS REPORT------');
    
    // Density
    parks.forEach(el => el.getTreeDensity());

    // Avg age
    const ages = parks.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = calc(ages)
    console.log(`Our ${parks.length} parks have an average of ${avgAge} years.`);

    // Which park has > 1000 trees
    const parkIndex = parks.map(el => el.treeCount).findIndex(el => el >= 1000);
    console.log(`${parks[parkIndex].name} Park has more than 1000 trees.`);
    
}

function reportStreets(streets){
    console.log('------STREETS REPORT------');

    // total and average length of streets
    const [totalLength, avgLength] = calc(streets.map(el => el.length));
    console.log(`Our ${streets.length} streets have a total length of ${totalLength} km with an average of ${avgLength} km.`);

    // classify sizes
    streets.forEach(el => el.classifyStreet());

}

reportParks(allParks);
reportStreets(allStreets);


