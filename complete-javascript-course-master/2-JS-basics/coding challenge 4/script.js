// Coding Challenge 4
/**
 * Mark & John compare BMIs
 * 1. For john and mark, make an object with properties for name, mass, and height
 * 2. Add a method to each object to calculate the BMI. Save it to the object, return it from the method.
 * 3. Log to the console who has the highest BMI, together with full name & the BMI.
 * 
 * BMI = mass/(height^2)
 */


var mark = {
    name: 'Mark',
    mass: 130,
    height: 70,
    calc_bmi: function(){
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

var john = {
    name: 'John',
    mass: 150,
    height: 74,
    calc_bmi: function(){
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

mark.calc_bmi();
john.calc_bmi();

if (mark.bmi > john.bmi){
    console.log('Mark\'s BMI is higher: ' + mark.bmi);
} else if (john.bmi > mark.bmi){
    console.log('John\'s BMI is higher: ' + john.bmi);
} else {
    console.log('They have the same BMI: ' + mark.bmi);
}
