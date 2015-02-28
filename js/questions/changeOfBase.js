
function changeOfBaseQuestion(randomStream)
{

    var number = randomStream.nextIntRange(240)+15;
   
    var baseArray = [ {base: "decimal", value: number.toString(10), radix: 10}, {base: "hexadecimal", value: number.toString(16), radix: 16}, {base: "binary", value: number.toString(2), radix: 2} ];

    randomStream.shuffle(baseArray);
    
    this.a = baseArray[0];
    this.b = baseArray[1];

    //Array of {String, bool} pairs: the string representation of a number in a particular base
    //and a flag indicating whether or not it is the correct answer.
    this.answerChoices = [ {value: this.b.value, flag: true}, 
                           {value: (randomStream.nextIntRange(240)+15).toString(this.b.radix), flag: false},
			               {value: (randomStream.nextIntRange(240)+15).toString(this.b.radix), flag: false},
			               {value: (randomStream.nextIntRange(240)+15).toString(this.b.radix), flag: false} ]

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
	    return "unknown format";
    };

    this.formatQuestionHTML = function () {
	    var questionText = "<p>Convert " + this.a.value + " from " + this.a.base + " to " + this.b.base + ".</p>";
    
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

