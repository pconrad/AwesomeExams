//Parameter randomStream should be an instance of the RandomStream class.
function operandsAndOperatorsQuestion(randomStream)
{
	//Choose size of problem
	var numberOfOperators = 2;
	
    this.ops = ["+", "*"];
    var numbers = [1,2,3,4,5,6,7,8,9];
    
    //Add the first number in the equation
    randomStream.shuffle(numbers);
	var equation = numbers[0];
    var numberOfOperatorsEnumerated = [numberOfOperators]
    for(var i=0; i < numberOfOperators; i++)
    {
    	//Add a random operator...
	    randomStream.shuffle(this.ops);
	    equation += this.ops[0];
	    
	    //Add a random number...
	    randomStream.shuffle(numbers);
	    equation += numbers[0];  
    }
    
    //Shuffle for right or left operator question
    //Index 0 is chosen for the question. 
    var rightOrLeftOperand = ["right","left"];
    randomStream.shuffle(rightOrLeftOperand);

    var distract1;
    var distract2;
    var distract3;


    var operandInQuestion = rightOrLeftOperand[0];
    
    var operatorIndex = randomStream.shuffle();
    var operatorString = equation.charAt(operatorIndex);
    var operatorInQuestion = new RegExp("\\" + operatorString);
        console.log(equation + ", " + operatorString);


    var correct = "";

    if (operatorString == "+")
    {
        if (operandInQuestion == "left")
        {
            correct = equation.substring(0, operatorIndex);
        }
        else
        {   
            var rightSide = equation.substring(operatorIndex+1, equation.length);
            var nextPlus = rightSide.match(/\+/);
            var nextPlusIndex = equation.length;
            				console.log("Rightside" + rightSide);

            if (nextPlus)
            {
                nextPlusIndex = nextPlus.index;

            }

            correct = rightSide.substring(0,nextPlusIndex);
        }
    }
    //* times-ing
    else
    {
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
        else
        { 
            correct = equation.charAt(operatorIndex+1);
        }
    }

    

    //console.log(correct);   
    
    this.answerChoices = [
                    {value: correct,   flag: true},
                    {value: distract1, flag: false},
                    {value: distract2, flag: false},
                    {value: distract3, flag: false} 
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

	    //Generate the question text
        var questionText = "<p>What is the " + operandInQuestion + " operand of " + operatorString;
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
