//Parameter randomStream should be an instance of the RandomStream class.
function symbolicLogicQuestion(randomStream)
{

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
