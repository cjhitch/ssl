# class for the grade
class Grader
    # class constructor
    def initialize(name, assignment, grade, outputgrade = -1)
        @name = name
        @assignment = assignment
        @grade = grade
        @outputgrade = outputgrade
    end

    # grader method with conditional to check where the value lands and return an output grade
    def grademethod
        if @grade >= 90
            @outputgrade = "A"
        elsif @grade >= 80
            @outputgrade = "B"
        elsif @grade >= 70
            @outputgrade = "C"
        elsif @grade >= 60
            @outputgrade = "D"
        else
            @outputgrade = "F"
        end
    end

    # method to puts for output based on the grade received for the user
    def printgrade
        grademethod
        if @outputgrade == "F" or @outputgrade == "D"
            puts("Sorry #{@name}, with your score of #{@grade} you got a #{@outputgrade} on #{@assignment} and did not pass.")
        elsif @outputgrade == "C"
            puts("#{@name}, with your score of #{@grade} you got a #{@outputgrade} on #{@assignment}. You missed some and should brush up but you did pass.")
        else
            puts("Good job #{@name}! With your score of #{@grade} you got a #{@outputgrade} on #{@assignment} and passed.")
        end
    end

end

# ask user their name and record with gets
puts("What is your name? ")
$name = gets
# ask user the assignment name and record with gets
puts("What is the assigment name? ")
$assignment = gets
# ask user what grade they got on the assignment and record with gets
puts("What grade did you receive on #{$assignment}? (0-100) ")
$grade = gets

# while loop to validate the user input a valid number and that the number falls within the 0-100 constraints
$boolgrade = FALSE
while $boolgrade == FALSE
	begin
		$grade = Float $grade
		if $grade >= 0 && $grade <= 100
			$boolgrade = TRUE
			break
		else
			puts("That was an invalid grade, please enter a numeric grade between 0-100 for #{$assignment}: ")
			$grade = gets
		end
	rescue
        puts("That was an invalid grade, please enter a numeric grade for #{$assignment}: ")
        $grade = gets
	end
end

# instantiate new class and run the printgrade method where it begins prompting the user
student = Grader.new($name, $assignment, $grade)
puts(student.printgrade)
