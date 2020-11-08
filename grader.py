import sys


# new class grader with name, assignment, and grade
class Grader:
    def __init__(self, name, assignment, grade):
        self._name = name
        self._assignment = assignment
        self._grade = grade
        self._outputgrade = -1

    # grader method with conditional to check the grade and output the results
    # there should be no other values since this has already been validated
    def grademethod(self):
        if self._grade >= 90:
            self._outputgrade = 'A'
        elif self._grade >= 80:
            self._outputgrade = 'B'
        elif self._grade >= 70:
            self._outputgrade = 'C'
        elif self._grade >= 60:
            self._outputgrade = 'D'
        else:
            self._outputgrade = 'F'

    # output the grade after they have supplied information
    # check if student got an F or D and output that
    # else if C output that line
    # else print for grade A or B
    # should be no others since the grade has already been validated
    def printgrade(self):
        self.grademethod()
        if self._outputgrade == 'F' or self._outputgrade == 'D':
            print('Sorry ' + self._name + ', with your score of ' + str(self._grade) +
                  ' you got an ' + self._outputgrade + ' on ' + self._assignment + ' and did not pass.')
        elif self._outputgrade == 'C':
            print(+self._name + ', with your score of ' + str(self._grade) +
                  ' you got a' + self._outputgrade + ' on ' + self._assignment +
                  '. You missed some and should brush up but you did pass.')
        else:
            print('Good job ' + self._name + '! With your score of ' + str(self._grade) +
                  ' you got an ' + self._outputgrade + ' on ' + self._assignment + ' and passed.')


# gather the user's input and store in variables
inputName = raw_input('What is your name? ')
inputAssignment = raw_input('What is the assigment name? ')
inputGrade = raw_input('What grade did you receive on '+inputAssignment+'? (0-100) ')

# while statement to validate the users input of a grade. Verify it can be converted to an INT before moving on
boolgrade = False
while not boolgrade:
    try:
        inputGrade = float(inputGrade)
        if 0 <= inputGrade <= 100:
            boolgrade = True
            break
        else:
            inputGrade = raw_input('That was an invalid grade, '
                                   'please enter a numeric grade between 0-100 for ' + inputAssignment + ': ')
    except Exception as e:
        inputGrade = raw_input('That was an invalid grade, '
                               'please enter the numeric grade for ' + inputAssignment + ': ')

# create new student with the gathered user inputs
student = Grader(inputName, inputAssignment, float(inputGrade))
# run the student printgrade method
student.printgrade()
