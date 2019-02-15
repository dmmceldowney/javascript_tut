mark_height = prompt("What is Mark's height?");
mark_mass = prompt("What is Mark's mass?");

john_height = prompt("What is John's height?");
john_mass = prompt("What is John's mass?");

mark_bmi = mark_mass / (Math.pow(mark_height, 2));
john_bmi = john_mass / (Math.pow(john_height, 2));

output_string = "Is Mark's BMI higher than John's? " + (mark_bmi > john_bmi);

console.log(output_string);

