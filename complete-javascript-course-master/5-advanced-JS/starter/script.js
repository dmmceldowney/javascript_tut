//////////////////////////////////////////////////////////////////////
// Bind, Call, and Apply   
/*
var john = {
    name: 'John',
    age: 26, 
    job: 'teacher',
    presentation: function(style, time_of_day) {
        if (style === 'formal') {
            console.log(
                'Good ' + time_of_day + ', ladies and gentlemen. I\'m ' + this.name + 
                '. I\'m a ' + this.job +  ' and I\'m ' + this.age + ' years old.'
            )
        } else if (style === 'friendly') {
            console.log(
                'Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job +
                ' and I\'m ' + this.age + ' years old. Have a great ' + time_of_day + '!'
            )
        }
    }
};

var emily = {
    name: 'Emily',
    age: 36,
    job: 'designer'
};

john.presentation('formal', 'morning');
// .call() allows us to set the 'this' variable as Emily
john.presentation.call(emily, 'friendly', 'evening');

// This won't work because the method doesn't expect an array
// john.presentation.apply(emily, ['friendly', 'evening']);

var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('afternoon'); // This is called 'currying'
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

*/
//////////////////////////////////////////////////////////////////////
// Part 2 of ^^^ ("real world example")

/*
var years = [
    2000, 1991, 1989, 1956, 1904
]

function arrayCalc(arr, fn){
    var arrRes = [];
    for (var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2019 - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);

var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullJapan);
*/


















/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/
/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/



function getRandom(val){
    return Math.floor(Math.random() * Math.floor(val));
}


function Player(){
    this.score = 0;

    this.increaseScore = function(){
        this.score++;
    };
    this.decreaseScore = function(){
        this.score-=1;
    };
    this.logScore = function(){
        console.log('Score: ' + this.score);
    };

}


function Question(q, a, c, player1){
    this.question = q;
    this.answers = a;
    this.correct_index = c;

    this.logQuestion = function(){
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++){
            console.log(i + ': ' + this.answers[i]);
        }
    };

    this.checkAnswer = function(x){
        if (x === 'exit'){
            return 1;
        }
        console.log('Your answer: ' + this.answers[x] + '.');
        if (x == this.correct_index){
            console.log('Correct!')
            player1.increaseScore();
        } else {
            console.log('Wrongo!');
            player1.decreaseScore();
        }
        console.log(player1.logScore());
        return 0;
    }
}

function askQuestions(player1){
    var questions = [];
    questions.push(new Question('What is the best music genre?', ['metal', 'jazz', 'opera', 'polka'], 3, player1));
    questions.push(new Question('Is World of Warcraft good?', ['no','yes'], 0, player1));
    questions.push(new Question('What is your name?', ['Yngwie', 'David', 'Jim', 'Cosmo'], 1, player1));


    var chosenQuestion = questions[getRandom(3)];
    chosenQuestion.logQuestion();   

    answer_result = chosenQuestion.checkAnswer(prompt('Please enter an answer.'));

    return answer_result;
}


var player1 = new Player();

do{
    answer_result = askQuestions(player1);
} while (answer_result === 0);



