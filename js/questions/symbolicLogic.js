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

    // --Begin Evin Edits--
    // Bool Operator classes, for doing quick generation and execution boolean expressions.
    // Vector is associative array of bool values to be tested (used for building answer key)
    
    var literalList = ["A", "B", "C"];
    var depth = 4;//Number of operators in a question
    function Literal( name ){
	this.name = name;
	this.exec = function( vector ){
	    return vector[this.name];
	}
	//Todo: add a render function here.
    }
    
    function BoolExpr( a, b, op ){
	this.a = a;
	this.b = b;
	this.op = op;
	this.exec = function( vector ){
	    //Go down the tree of subexpressions
	    var aVal = this.a.exec( vector );
	    var bVal = this.b.exec( vector );
	    switch( this.op ){
		//We really should have a better method of encoding these operations.
		" and ": return aVal && bVal;
		" or ": return aVal || bVal;
		" if and only if ": return (aVal&&bVal) || ((!aVal)&&(!bVal));
		" only if ": return aVal?bVal:true;
	    }
	}
	//Todo: add a render function here
    }
    //Generate the question.
    //Needs a little improvement. Randomize left/right assignment. Maybe make it so it takes two exps
    //instead of one literal and one expressions.
    var lit = literalList[randomStream.next()%(literalList.length-1)];
    var exp = new Literal(literalList[initLit]);
    for( var i=0; i<depth; var++ ){
	lit = literalList[randomStream.next()%(literalList.length-1)];
	op = this.ops[randomStream.next()%(this.ops.length-1)];
	exp = new BoolExpr( lit, op, exp );
    }
    // With a simple exp.render() you can make everything come to life
    // The kind of magical rendering energy that Walt Disney prepared you for
    // --End Evin Edits--

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
