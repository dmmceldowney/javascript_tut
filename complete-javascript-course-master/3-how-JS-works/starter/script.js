///////////////////////////////////////
// Lecture: Hoisting
/*
// functions
calculate_age(1965);

function calculate_age(year) {
    console.log(2019 - year);
}

// retirement(1999);
var retirement = function(year){
    console.log(65 - (2019 - year));
}

// variables
console.log(age);
var age = 23;


function foo() {
    var age = 65;
    console.log(age);
}

foo();

console.log(age);
*/
//////////////////////////////////////
// Lecture: Scoping


// First scoping example
/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/


// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}

*/


///////////////////////////////////////
// Lecture: The this keyword

// console.log(this);
/*
calculate_age(1985);

function calculate_age(year){
    console.log(2019 - year);
    console.log(this);
}
*/
var john = {
    name: 'John',
    year_of_birth: 1990,
    calculate_age: function() {
        console.log(this);
        console.log(2016-this.year_of_birth);

        /*
        function inner_function(){
            console.log(this);
        }
        
        inner_function();
        */
    }
};

john.calculate_age();

var mike = {
    name: 'Mike',
    year_of_birth: 1984
};

// Method "Borrowing"

mike.calculate_age = john.calculate_age;

mike.calculate_age();
