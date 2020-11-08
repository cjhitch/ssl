// use readline and set the input output interface
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
// new class grader with name, assignment, and grade
class Grader {
    constructor(name, assignment, grade) {
        this._name = name
        this._assignment = assignment
        this._grade = grade
        this._outputgrade = -1
    }

    // grader method with conditional to check the grade and output the results
    // there should be no other values since this has already been validated
    grademethod() {
        if (this._grade >= 90) {
            this._outputgrade = 'A'
        } else if (this._grade >= 80) {
            this._outputgrade = 'B'
        } else if (this._grade >= 70) {
            this._outputgrade = 'C'
        } else if (this._grade >= 60) {
            this._outputgrade = 'D'
        } else {
            this._outputgrade = 'F'
        }
    }

    // output the grade after they have supplied information
    // check if student got an F or D and output that
    // else if C output that line
    // else print for grade A or B
    // should be no others since the grade has already been validated
    printgrade() {
        this.grademethod()
        if (this._outputgrade == 'F' || this._outputgrade == 'D') {
            console.log(`Sorry ${this._name}, with your score of ${this._grade} you got an ${this._outputgrade} on ${this._assignment} and did not pass.`);
        } else if (this._outputgrade == 'C') {
            console.log(`${this._name}, with your score of ${this._grade} you got a ${this._grade} on ${this._assignment}. You missed some and should brush up but you did pass.`);
        } else {
            console.log(`Good job ${this._name}, with your score of ${this._grade} you got a ${this._outputgrade} on ${this._assignment} and passed.`);
        }
    }
}

// create question as a function so it can be recursively called if user doesn't give a valid response
const askQuestion = (name, assignment) => {
    // ask question
    rl.question(`What grade did you receive on ${assignment} (0-100)? `,(grade) => {
        // check if values land between 0 and 100
        if (grade >= 0 && grade <= 100) {
            // instantiate new student and run print grade then close the question
            const student = new Grader(name, assignment, grade);
            student.printgrade();
            return rl.close();
        }
        else {
            // prompt user invalid response and run function again asking question
            console.log(`That's an invalid grade please enter a numeric value from 0-100`);
            askQuestion(name, assignment)
        }
    })
}

// ask user for name and assignment name, run function asking for grade
rl.question('What is your name? ',(name) => {
    rl.question('What is the assignment name? ',(assignment) => {
        askQuestion(name, assignment)    
    })
})
