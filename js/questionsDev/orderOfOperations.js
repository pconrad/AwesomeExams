//Parameter randomStream should be an instance of the RandomStream class.
function orderOfOperationsQuestion(randomStream)
{
    //Generate the three variables
    var numbers = [2,3,4,5,6,7,8,9];
    randomStream.shuffle(numbers);
    this.a = numbers[0];
    this.b = numbers[1];
    this.c = numbers[2];    

    //Shuffle the operators
    this.ops = [" + ", " * "];
    randomStream.shuffle(this.ops);

    //Calculate the correct answer and the distractor obtained by applying Order of Operations incorrectly
    if(this.ops[0] == "+")
    {
        var correct = this.a + this.b*this.c;
        var distract = (this.a+this.b)*this.c;
    }
    else
    {
        var correct = this.a * this.b + this.c;
        var distract = this.a * (this.b + this.c);
    }

    //Pick two more distractors from within a range
    var delta = distract - correct;
    var lowerEnd = correct - delta ;
    var upperEnd = distract + delta;
    lowerEnd < 0 ? lowerEnd = 0 : lowerEnd = lowerEnd;

    //Array of {int, bool} pairs, representing an answer option and whether or not it is the correct one
    this.answerChoices = [ {value: correct, flag: true},
                          {value: distract, flag: false},
                          {value: randomStream.nextIntRange(upperEnd-lowerEnd) + lowerEnd, flag: false},
                          {value: randomStream.nextIntRange(upperEnd-lowerEnd) + lowerEnd, flag: false} ];

    randomStream.shuffle(this.answerChoices);

    //Find the correct answer
    this.correctIndex = 0;
    for(var i=0; i<this.answerChoices.length; i++)
    {
        if(this.answerChoices[i].flag == true)
            this.correctIndex = i;           
    }
    
    this.formatQuestion = function(format) {
      switch (format) {
         case "HTML": return this.formatQuestionHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };
    
    this.formatQuestionHTML = function () {

	    //Generate the question text
        var questionText = "<p>What is " + this.a + this.ops[0] + this.b + this.ops[1] + this.c + "?";

	    //Add the answer options
        questionText += "<p><strong>a) </strong>" 
            + this.answerChoices[0].value + "<br><strong>b) </strong>" 
            + this.answerChoices[1].value + "<br><strong>c) </strong>" 
            + this.answerChoices[2].value + "<br><strong>d) </strong>" 
             + this.answerChoices[3].value + "</p>";

	    return questionText;
    };

    this.formatAnswer = function(format) {
      switch (format) {
         case "HTML": return this.formatAnswerHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswerHTML = function () {
        var text = String.fromCharCode(this.correctIndex + 97); //0 = 'a', 1 = 'b', 2 = 'c', etc...
        return text;
    };

};
