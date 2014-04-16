//Parameter randomStream should be an instance of the RandomStream class.
function symbolicLogicQuestion(randomStream)
{
    //Generate the list of variables for use
    var A = "A";
    var B = "B";
    var C = "C";
    this.values = [A,A,A,B,B,B,C,C,C];
    randomStream.shuffle(values);
    //this.a = {name: "A", value: values[0]};
    //this.b = {name: "B", value: values[1]};
    //this.c = {name: "C", value: values[2]};    

    //Shuffle the operators
    this.ops = [" and ", " or ", " only if ", " if and only if "];
    randomStream.shuffle(this.ops);


    //The following statements decide what the symbolic logic should be in the given situation, based on the first two operators
    

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
        var questionText = "<p>What is " + this.values[0] + this.ops[0] + this.values[1] + this.ops[1] + this.values[2] + "?";

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
