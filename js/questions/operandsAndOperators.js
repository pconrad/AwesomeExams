//Parameter randomStream should be an instance of the RandomStream class.
function operandsAndOperatorsQuestion(randomStream)
{
    //Generate the three variables
    //from randomized array
    var numbers = [1,2,3,4,5,6,7,8,9];
    randomStream.shuffle(numbers);
    var firstNum  = numbers[0].toString();
    var secondNum = numbers[1].toString();
    var thirdNum  = numbers[2].toString();

    //Shuffle the operators
    this.ops = ["+", "*"];
    randomStream.shuffle(this.ops);
    
    //Shuffle for right or left operator question
    //Index 0 is chosen for the question. 
    var rightOrLeftOperand = ["right","left"];
    randomStream.shuffle(rightOrLeftOperand);
    
    
    var equation = firstNum + this.ops[0] + secondNum + this.ops[1] + thirdNum;

    var distract1;
    var distract2;
    var distract3;


    var operandInQuestion = rightOrLeftOperand[0];
    var operatorString = this.ops[0];
    var operatorInQuestion = new RegExp("\\" + operatorString);
    var operatorIndex = equation.match(operatorInQuestion).index;


    var correct = "";

    if (operatorInQuestion == "+")
    {
    	 console.log("operatorInQuestion is +");

        if (operandInQuestion == "left")
        {
                	    	 console.log("operandInQuestion is left");
            correct = equation.substring(0, operatorIndex);
        }
        else
        {   
        	    	 console.log("operandInQuestion is right");
            var rightSide = equation.substring(operatorIndex+1,length);
            var nextPlus = rightSide.match(/\+/);
            var nextPlusIndex = length;
            if (nextPlus)
            {
                nextPlusIndex = nextPlus.index;
				console.log("nextPlusIndex inside if: " + nextPlusIndex);

            }

            correct = rightSide.substring(0,nextPlusIndex);
            console.log("nextPlusIndex: " + nextPlusIndex);
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
            var nextPlusIndex = length;
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
