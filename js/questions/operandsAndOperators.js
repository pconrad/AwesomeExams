//Parameter randomStream should be an instance of the RandomStream class.
function operandsAndOperatorsQuestion(randomStream)
{
	//Choose size of problem
    //For now, 2 operators shuold suffice, 
    //but this exists for the creation of more complex problems
    //It would have been overkill to make the problem completely 
    //expandable for different sizes of operators because 2 operators shuold 
    //suffice in getting the point accorss to students.
    //The creaton of the problem and correct answer ormation are dynamic and expandable
    //Howerver, the creation of distractors is specific to a 2 operator problem, so it 
    //may need to be redone if this parameter shuold change
	var numberOfOperators = 2;
	
    //For now, only + and *, this can be 
    //expanded to other operations
    this.ops = ["+", "*"];
    var numbers = [1,2,3,4,5,6,7,8,9];
    
    //Shuffle the numbers so we can have a random assortment
    //Begin ewuation with a singel number
    //Add the first number in the equation
    randomStream.shuffle(numbers);
	var equation = numbers[0];
    for(var i=0; i < numberOfOperators; i++)
    {
    	//Add a random operator...
	    randomStream.shuffle(this.ops);
	    equation += this.ops[0];
	    
	    //Add a random number...
	    equation += numbers[i+1];  
    }

    //This is kind of ugly, the array holds an enumeration of 
    //odd numbers from 1 to the total number of operators+1
    //So for 2 operators it would hold: [1,3]
    //This is so the random suffling method can be used properly in the future
    //This code block jutst creates the array
    var numberOfOperatorsEnumerated = [numberOfOperators];
    var numberOfOpEnumIndex = 0;
    for (var j=0; j < numberOfOperators+2; j++)
    {
        if (j%2 != 0)
        {
            numberOfOperatorsEnumerated[numberOfOpEnumIndex] = j;
            numberOfOpEnumIndex++;
        }
    }
    
    //Shuffle for right or left operator question
    //Index 0 is chosen for the question. 
    var rightOrLeftOperand = ["right","left"];
    randomStream.shuffle(rightOrLeftOperand);
    //These variabbles used throughout, we are usigng regex 
    //to find the indes of the operator we are askign about
    var operandInQuestion = rightOrLeftOperand[0];
    randomStream.shuffle(numberOfOperatorsEnumerated);
    var operatorIndex = numberOfOperatorsEnumerated[0];
    var operatorString = equation.charAt(operatorIndex);
    var operatorInQuestion = new RegExp("\\" + operatorString);

    //The correct answer
    var correct = "";

    //Four main cases:
        //Left operator of +
        //Right operator of +
        //Left operator of *
        //Right operator ot *
    if ((operatorString == "+"))
    {
        //Case: Left operand of +
        //Answer is just the entire left part of the 
        //string becaseu the equation is read from left to right
        //This works great for a 2 operator problem, but the 
        //logic might get more complex for a problem with a 
        //higher number of opeators
        if (operandInQuestion == "left")
        {
            correct = equation.substring(0, operatorIndex);
        }
        //Case: Right operand of +
        //This finds the index of the next plus, 
        //then substrings the equation using the index.
        //Note that this implementation assumes use of only + and * operators
        else
        {   
            //Finding next plus index
            var rightSide = equation.substring(operatorIndex+1, equation.length);
            var nextPlus = rightSide.match(/\+/);
            var nextPlusIndex = equation.length;

            if (nextPlus)
            {
                nextPlusIndex = nextPlus.index;

            }

            //Correct answer is the sring spanning the 
            //currenct index to the next plus index
            correct = rightSide.substring(0,nextPlusIndex);
        }
    }

    else
    {        
        //Case: Left operand of *
        //Similar to the right operand of *
        //Reverses the string on the left side and 
        //finds the LAST index of a plus
        //Effectively this goes through the string from 
        //right to left starting at the operand index and 
        //ending at index 0.  Usig the index it finds, it 
        //creates the answer, which is the substring that 
        //spans that index all the way to the 
        //index of the current operator
        //Note that this also assumes use of only the * and +
        if (operandInQuestion == "left")
        {
            var leftSide = equation.substring(0,operatorIndex);
            var reversedLeftSide = leftSide.split("").reverse().join("");

            var nextPlus = reversedLeftSide.match(/\+/);
            var nextPlusIndex = equation.length;
            if (nextPlus)
            {
                nextPlusIndex = nextPlus.index;
            }

            var reversedCorrectAnswer = reversedLeftSide.substring(0,nextPlusIndex);

            correct = reversedCorrectAnswer.split("").reverse().join("");
        }
        //Case: Right operand of *
        //Easy, answer is just the net number in the equation
        else
        { 
            correct = equation.charAt(operatorIndex+1);
        }
    }

    //This string is used to generate distractors
    //This code is very specific to the 2 operator structur
    //There are two main cases:
        //1) The correct answer is one number
        //2) The correct answer is two numbers with an operator in between
    var distractors = ["", "", ""];
    var distractorsIndex = 0;

    //Case 1)
    //Here, two of our distractors are just 
    //the two other numbers in the equation
    //Last distractor is the first three characters of the equation
    if (correct.length == 1)
    {
        for (var i = 0; i < equation.length; i++)
        {
            //Getting the two numbers from the equation that are not the correct answer
            if ((i%2 == 0) && (equation.charAt(i) != correct))
            {   
                distractors[distractorsIndex] = equation.charAt(i);
                distractorsIndex++;
            }
            //Last distractor is found using substring
            distractors[distractorsIndex] = equation.substring(0,3);
        }
    }
    //Case 2)
    //If the correct answer has two numbers in it,
    //our distractors will each be a number from the equation
    else
    {
        //Finding all the numbers in the equation
        for (var i = 0; i < equation.length; i++)
        {
            if (i%2 == 0)
            {
                distractors[distractorsIndex] = equation.charAt(i);
                distractorsIndex++;
            }
        }

    }
     

    //Adding all answers
    this.answerChoices = [
                    {value: correct,   flag: true},
                    {value: distractors[0], flag: false},
                    {value: distractors[1], flag: false},
                    {value: distractors[2], flag: false} 
                          ];

    randomStream.shuffle(this.answerChoices);

    this.correctIndex;
    for(var i=0; i < this.answerChoices.length; i++)
    {
        if(this.answerChoices[i].flag == true)
        {
            this.correctIndex = i;           
        }
    }
    
    this.formatQuestion = function(format) 
    {
      switch (format) 
      {
         case "HTML": return this.formatQuestionHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };
    
    this.formatQuestionHTML = function () 
    {
    	var numberSuffix = "th";
		if(Math.ceil(operatorIndex/2) == 1)
    	{
	    	numberSuffix = "st";
    	}
    	else if(Math.ceil(operatorIndex/2) == 2)
    	{
	    	numberSuffix = "nd";
    	}
    	else if(Math.ceil(operatorIndex/2) == 3)
    	{
	    	numberSuffix = "rd";
    	}

	    //Generate the question text
        var questionText = "<p>What is the " + operandInQuestion + " operand of the " + Math.ceil(operatorIndex/2) + numberSuffix + " operator";
        questionText += " in the equation: " + equation + "?";

	    //Add the answer options
        questionText += "<p><strong>a) </strong>" 
            + this.answerChoices[0].value + "<br><strong>b) </strong>" 
            + this.answerChoices[1].value + "<br><strong>c) </strong>" 
            + this.answerChoices[2].value + "<br><strong>d) </strong>" 
            + this.answerChoices[3].value + "</p>";

	    return questionText;
    };

    this.formatAnswer = function(format) 
    {
      switch (format) 
      {
         case "HTML": return this.formatAnswerHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswerHTML = function () 
    {
        //0 = 'a', 1 = 'b', 2 = 'c', etc...
        var text = String.fromCharCode(this.correctIndex + 97); 
        return text;
    };
};
