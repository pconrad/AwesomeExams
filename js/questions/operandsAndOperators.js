//Parameter randomStream should be an instance of the RandomStream class.
function operandsAndOperatorsQuestion(randomStream)
{
    /////////
    //Setup//
    /////////
    
    //numberOfOperators indicated the size of the problem.
    //Maximum numberOfOperators = 8 
    //(because we want to do all unique numbers)
    //Minimum numberOfOperators = 2  
    //(if numberOfOperators = 1 then there could only be three answer choices a, b, c)
	var numberOfOperators = 2;
	
    //For now, only + and *, this can be 
    //expanded to other operations like - and /
    this.ops = ["+", "*"];
    var numbers = [1,2,3,4,5,6,7,8,9];
    
    
    //Shuffle numbers and then fill equation
    //There are (numberOfOperators + 1) unique numbers in the equation.
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

    //The array holds an enumeration of 
    //odd indecies from 1 to the total number of operators+1
    //For 2 operators it would hold: [1,3]
    //This is so we can randomly shuffle numberOfOperatorsEnumerated later
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

    //Shuffle for "right" or "left" operator question
    //Index 0 is chosen for the question. 
    var rightOrLeftOperand = ["right","left"];
    randomStream.shuffle(rightOrLeftOperand);
    var operandInQuestion = rightOrLeftOperand[0];
    
    //Shuffle numberOfOperatorsEnumerated to choose which index we 
    //want to go to in the equation.  We extract the actual operator 
    //at that index, to put in the quiz question
    randomStream.shuffle(numberOfOperatorsEnumerated);
    var operatorIndex = numberOfOperatorsEnumerated[0];
    var operatorInQuestion = equation.charAt(operatorIndex);

    
    //The correct answer, and the other distractor answer choices
    //The possible distractors is a larger array we construct full
    //possible wrong answers, we take three unique strings from this
    //array to put into "distractors"
    var correct = "";
    var distractors = ["", "", ""];
    var possibleDistractors = ["", "", "", "", ""];
    
    //Number to the left of the operand
    possibleDistractors[0] = equation.substring(operatorIndex-1, operatorIndex);
    //Number to the right of the operand
    possibleDistractors[1] = equation.substring(operatorIndex+1, operatorIndex+2);
    //Entire left substring
    possibleDistractors[2] = equation.substring(0, operatorIndex);
    //Entire right substring
    possibleDistractors[3] = equation.substring(operatorIndex+1, equation.length);
    //Operator in question, and number to its left and right
    possibleDistractors[4] = equation.substring(operatorIndex-1, operatorIndex+2);
    
    //////////////////////////
    //Finding correct answer//
    //////////////////////////
    
    //Four main cases for the quiz question
        //Left operator of +
        //Right operator of +
        //Left operator of *
        //Right operator ot *
        
    if ((operatorInQuestion == "+"))
    {
        //Case: Left operand of +
        //Answer is just the entire left part of the 
        //string.  Correct answer might be confusing for 
        //long equations.
        if (operandInQuestion == "left")
        {
            correct = equation.substring(0, operatorIndex);                           
        }
        
        //Case: Right operand of +
        //Answer is the substring from the operator index to the next +
        else
        {   
            var rightSide = equation.substring(operatorIndex+1, equation.length);
            var nextPlus = rightSide.match(/\+/);
            var nextPlusIndex = equation.length;

            //If there is another plus index in the equation
            //use it to create the substring.  Otherwise, it's
            //the entire right side of the equation.
            if (nextPlus)
            {
                nextPlusIndex = nextPlus.index;

            }

            correct = rightSide.substring(0,nextPlusIndex);
        }//End right operand of + 
    }//End operator is + 

    else
    {        
        //Case: Left operand of *
        //Reverses the string on the left side and 
        //finds the LAST index of a plus
        //Effectively this goes through the string from 
        //right to left starting at the operand index and 
        //ending at index 0.  The index is the substring that 
        //spans that index all the way to the 
        //index of the current operator
        if (operandInQuestion == "left")
        {
            //Similar to the right operand of + code...
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
        //Answer is just the next number in the equation
        else
        { 
            correct = equation.charAt(operatorIndex+1);
        }//End right operand of *
    }//End operator is NOT +


    //////////////////////////
    //Generating distractors//
    //////////////////////////
    
    //Loop through the possbible distractor 
    //array and pull out ones that are not 
    //equal to the correct answer, or one another
    var numberOfDistractors = 0;
    
    for (var i = 0; i < 5; i++)
    {
        //Loop and use this int to see if the distractor 
        //from possible distractors has been put into the 
        //distracots array yet
        var existsInDistractors = 0;
        for (var j = 0; j < 3; j++)
        {
            if (distractors[j].localeCompare(possibleDistractors[i]) == 0)
            {
                existsInDistractors = 1;
            }
            
        }
        
        //We add this distractor to the final array if 
        //it wasn't already present and isn't the correct answer
        if ((existsInDistractors == 0) && (correct.localeCompare(possibleDistractors[i]) != 0))
        {
            distractors[numberOfDistractors] = possibleDistractors[i];
            numberOfDistractors++;
        }

    }
    
    ///////////////////////////
    //Setting up the question//
    ///////////////////////////
    
    //Adding all choices to array, and shuffle
    this.answerChoices = [
                    {value: correct,        flag: true},
                    {value: distractors[0], flag: false},
                    {value: distractors[1], flag: false},
                    {value: distractors[2], flag: false} 
                          ];

    randomStream.shuffle(this.answerChoices);

    //Finding the right answer
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
