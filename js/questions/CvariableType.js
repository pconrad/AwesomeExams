
function CvariableTypeQuestion(randomStream)
{
    //List of the possible answers and where it is   
    var typeArray = [{value:"int",ans:"a"},{value:"double",ans:"b"},{value:"char",ans:"c"},{value:"char*",ans:"d"}];
    var mathSymbols = ["+", "-", "*", "/", "%"];
    var symbolsNoMod = ["+", "-", "*", "/"];
    var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var numsWith0 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    randomStream.shuffle(numbers);
    randomStream.shuffle(typeArray);
    randomStream.shuffle(mathSymbols);
    randomStream.shuffle(symbolsNoMod);
    randomStream.shuffle(numsWith0);
    

    this.type = typeArray[0];
    

    this.getExpression = function(exprType){
	var quest = "";
		
	function makeInt(){
	    var question = "";
            if (randomStream.nextIntRange(2) == 1)
                question = numbers[0] + " " + mathSymbols[0] + " " + numbers[1];
            else question = numbers[0];
	    return question;
	}

	function makeDouble(){
	    var question = "";
            if (randomStream.nextIntRange(2) == 1)
                question = numsWith0[0] + "." + numsWith0[1];
            else {
                if (randomStream.nextIntRange(2) == 1)
                    question = numsWith0[0] + "." + numsWith0[1] + " " + symbolsNoMod[0] + " " + numbers[0];
                else
                    question = numbers[0] + " " + symbolsNoMod[0] + " " + numsWith0[0] + "." + numsWith0[1];
            }
	    return question;
	}

	switch(exprType.value) {
	case "int":
	    quest = makeInt();
	    break;
	    
	case "double":
            quest = makeDouble();
	    break;

	case "char":
	    quest = "'" + numsWith0[0] + "'";
	    break;

	case "char*":
	    if (randomStream.nextIntRange(2) == 1)
		quest = makeInt();
	    else
		quest = makeDouble();

	    quest = "\"" + quest + "\"";

	    break;	    
	}
	return quest;
    }


    this.formatQuestion = function(format) {

	switch (format) {
	    case "HTML": return this.formatQuestionHTML();
	    }
	    return "unknown format";
    };

    this.formatQuestionHTML = function () {
	    var questionText = "<p>What type is this: " + this.getExpression(typeArray[0]);
    
        questionText += "<p><strong>a) </strong> int<br><strong>b) </strong> double<br><strong>c) </strong> char<br><strong>d) </strong> char*<br>"

        return questionText;
    };

    this.formatAnswer = function(format) {
        switch (format) {
            case "HTML": return this.formatAnswerHTML();
        }  
        return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswerHTML = function () {
        var text = typeArray[0].ans;
        return text;
    };

};

