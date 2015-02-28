//Parameter randomStream should be an instance of the RandomStream class.
function symbolicLogicQuestion(randomStream)
{
    // Bool Operator classes, for doing quick generation and execution boolean expressions.
    // Vector is associative array of bool values to be tested (used for building answer key)
    
    var literalList = ["A", "B", "C"];
    var ops = ["&and;", "&or;", "&equiv;", "&rarr;"];
    var depth = 4;//Number of operators in a question
    var probabilityOfNegation = 8; //This means a 1/8 chance of any expression being negated
    function Literal( name, isNegated ){
	this.name = name;
	console.log(this.name);
	this.isNegated = isNegated;
	this.exec = function( vector ){
	    return isNegated ? !vector[this.name] : vector[this.name];
	}
	this.render = function( ){
	    return isNegated ? "&not; " + this.name : this.name;
	}
    }
    
    function BoolExpr( a, b, op, isNegated ){
	this.a = a;
	this.b = b;
	this.op = op;
	this.isNegated = isNegated;
	this.exec = function( vector ){
	    //Go down the tree of subexpressions
	    var aVal = this.a.exec( vector );
	    var bVal = this.b.exec( vector );
	    var out;
	    switch( this.op ){
		case "&and;": 
		    out = aVal && bVal;
		break;
	        case "&or;": 
		    out = aVal || bVal;
		break;
	        case "&equiv;": 
		    out = (aVal && bVal) || ((!aVal) && (!bVal));
		break;
		case "&rarr;": 
		    out = aVal ? bVal : true;
		break;
	    }
	    
	    return isNegated ? !out : out;
	}
	
	this.render = function( ){
	    var out = "( " + this.a.render() + " "+ this.op + " " + this.b.render() + " )";
	    return isNegated ? "&not; " + out : out;
	}
    }

    //Generate the question.
    //Needs a little improvement. Randomize left/right assignment. Maybe make it so it takes two exps
    //instead of one literal and one expressions.
    var lit = literalList[randomStream.nextIntRange(literalList.length)]; //Assuming nextIntRange gives us a number between 0 and n-1
    var isNegated = (randomStream.nextIntRange(probabilityOfNegation)<1);
    console.log("lit is " + lit);
    this.exp = new Literal(lit, isNegated);

    for( var i = 0; i < depth; i++ ){
	lit = literalList[randomStream.nextIntRange(literalList.length)];
	op = ops[randomStream.nextIntRange(ops.length)];
	isNegated = (randomStream.nextIntRange(probabilityOfNegation) < 1);
	newLit = new Literal(lit, randomStream.nextIntRange(probabilityOfNegation)<1);

	console.log("newLit is "+newLit);

	if(randomStream.nextIntRange(2) == 0) {
	    this.exp = new BoolExpr( newLit, this.exp, op, isNegated );
	} else {
	    this.exp = new BoolExpr( this.exp, newLit, op, isNegated );
	}
				 
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
        return "Build a truth table for <br /> " + this.exp.render();
    };

    this.formatAnswer = function(format) {
      switch (format) {
         case "HTML": return this.formatAnswerHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswerHTML = function () {
        var ans = "<table><tr><td>A</td><td>B</td><td>C</td><td>Output</td></tr>\n";

	var vector = {};

	console.log(this.exp);

	for(var i = 0; i < 8; i++) {
	    vector["A"] = (i >= 4);
	    vector["B"] = ((i % 4) >= 2);
	    vector["C"] = ((i % 2) != 0);
	    
	    ans += "<tr><td>" + vector["A"] + "</td><td>" + vector["B"] + "</td><td>" + vector["C"] + "</td><td>" + this.exp.exec(vector) + "</td></tr>";
	}
	ans += "</table>"

        return ans;
    };

};
