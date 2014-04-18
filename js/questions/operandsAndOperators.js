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
    this.ops = [" + ", " * "];
    randomStream.shuffle(this.ops);
    var firstOperator = this.ops[0];
    var secondOperator = this.ops[1];
    
    //Shuffle for right or left operator question
    //Index 0 is chosen for the question. 
    var rightOrLeftOperand = ["right","left"];
    randomStream.shuffle(rightOrLeftOperand);
    
    var firstOperatorLeftOperand;
    var firstOperatorRightOperand;
    var secondOperatorLeftOperand;
    var secondOperatorRightOperand;
    
    var correct;
    var distract1;
    var distract2;
    var distract3;

	//For LEFT operand question, in either + or * case
	// the answer is always first number
    if(rightOrLeftOperand[0]== "left" )
    {           
	   correct = firstNum;
        //e.x. 2
       distract1 = secondNum + secondOperator + thirdNum;
        //e.x. 4
       distract2 = secondNum;
        //e.x. 5
       distract3 = thirdNum;
    }
    //e.x. 2 + 4 * 5
    else if(firstOperator == " + ")
    {
        firstOperatorLeftOperand = firstNum;
        firstOperatorRightOperand = secondNum + secondOperator + thirdNum;
        secondOperatorLeftOperand = secondNum;
        secondOperatorRightOperand = thirdNum;
         
        //e.x. 4*5
        correct = firstOperatorRightOperand;
        //e.x. 2
        distract1 = firstNum;
        //e.x. 4
        distract2 = secondNum;
        //e.x. 5
        distract3 = thirdNum;
    }
    else
    {
        //e.x. 2 * 4 + 5
        firstOperatorLeftOperand = firstNum;
        firstOperatorRightOperand = secondNum;
        secondOperatorLeftOperand = firstNum + firstOperator + secondNum;
        secondOperatorRightOperand = thirdNum;
        
        //e.x. 4
        correct = firstOperatorRightOperand;
        //e.x. 4+5 
        distract1 = secondNum + secondOperator + thirdNum;
        //e.x. 2
        distract2 = firstNum;
        //e.x. 5
        distract3 = thirdNum;
    }
    
    
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
	    var equation = firstNum + firstOperator + secondNum 
	                            + secondOperator + thirdNum;
        var questionText = "<p>What is the " + rightOrLeftOperand[0] + " operand of " + firstOperator;
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
