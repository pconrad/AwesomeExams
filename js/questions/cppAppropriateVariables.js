function cppGenerateIntAnswer(randomStream)
{
    if(randomStream.nextIntRange(2) === 0)
        return "" + randomStream.nextIntRange(99);
    else
    {
        var intRandOp;
        switch(randomStream.nextIntRange(4))
        {
            case 0:
                intRandOp = " + ";
                break;
            case 1:
                intRandOp = " - ";
                break;
            case 2:
                intRandOp = " / ";
                break;
            default:
                intRandOp = " * ";
        }

        return randomStream.nextIntRange(99) + intRandOp + randomStream.nextIntRange(99);
    }
}

function cppGenerateDoubleAnswer(randomStream)
{
    if(randomStream.nextIntRange(2) === 0)
        return randomStream.nextIntRange(99) + "." + randomStream.nextIntRange(99);
    else
    {
        var doubleRandOp;
        switch(randomStream.nextIntRange(4))
        {
            case 0:
                doubleRandOp = " + ";
                break;
            case 1:
                doubleRandOp = " - ";
                break;
            case 2:
                doubleRandOp = " / ";
                break;
            default:
                doubleRandOp = " * ";
        }

        return randomStream.nextIntRange(99) + "." + randomStream.nextIntRange(99) + doubleRandOp +
            randomStream.nextIntRange(99) + "." + randomStream.nextIntRange(99);
    }

}

function cppGenerateCharAnswer(randomStream)
{
    if(randomStream.nextIntRange(2) === 0)
        return "'" + String.fromCharCode(Math.floor(Math.random() * 24) + 65) + "'";
    else
        return "'" + String.fromCharCode(Math.floor(Math.random() * 24) + 65) + "' + '" +
            String.fromCharCode(Math.floor(Math.random() * 24) + 65) + "'";
}

function cppGenerateBoolAnswer(randomStream)
{
    if(randomStream.nextIntRange(2) === 0)
        return (randomStream.nextIntRange(2)?"true":"false");
    else
    {
        var boolRandOp;
        switch(randomStream.nextIntRange(6))
        {
            case 0:
                boolRandOp = " == ";
                break;
            case 1:
                boolRandOp = " != ";
                break;
            case 2:
                boolRandOp = " >= ";
                break;
            case 3:
                boolRandOp = " <= ";
                break;
            case 4:
                boolRandOp = " > ";
                break;
            default:
                boolRandOp = " < ";
        }

        var boolRetStr = "";
        switch(randomStream.nextIntRange(3))
        {
            case 0: // int
                boolRetStr += randomStream.nextIntRange(99) + boolRandOp + randomStream.nextIntRange(99);
                break;
            case 1: // double
                boolRetStr += randomStream.nextIntRange(99) + "." + randomStream.nextIntRange(99) +
                    boolRandOp + randomStream.nextIntRange(99) + "." + randomStream.nextIntRange(99);
                break;
            default: // mixed
                var boolDoub = randomStream.nextIntRange(99) + "." + randomStream.nextIntRange(99);
                var boolInt = randomStream.nextIntRange(99);
                if(randomStream.nextIntRange(2) === 0)
                    boolRetStr += boolDoub + boolRandOp + boolInt;
                else
                    boolRetStr += boolInt + boolRandOp + boolDoub;

        }

        return boolRetStr;
    }
}

function CppApproVar(randomStream, params) {

    console.log("CppApproVar randomStream=" + JSON.stringify(randomStream) + " params=" + JSON.stringify(params));

    this.pts=0;
    if ('pts' in params) {
	this.pts = params.pts;	
    }

    var testVarTypes = [ "int", "double", "char", "bool" ];
    var typeAnswer;

    /*
    if(randomStream.nextIntRange(5) === 0)
        typeAnswer = 2 + randomStream.nextIntRange(2);
    else
        typeAnswer = randomStream.nextIntRange(2);
    */

    typeAnswer = randomStream.nextIntRange(4);

    this.typeQuestion = "<p>" + formatPts(this.pts);

    // 2 types of question
    if(randomStream.nextIntRange(2) === 0) // given statement, choose type
    {
        this.typeQuestion != "Which type will store the following statement or literal?</p><pre>";
        switch(typeAnswer)
        {
            case 0:
                this.typeQuestion += cppGenerateIntAnswer(randomStream);
                break;
            case 1:
                this.typeQuestion += cppGenerateDoubleAnswer(randomStream);
                break;
            case 2:
                this.typeQuestion += cppGenerateCharAnswer(randomStream);
                break;
            default:
                this.typeQuestion += cppGenerateBoolAnswer(randomStream);
        }
        this.typeQuestion += "</pre>";

        this.answerChoices = [
            { value: testVarTypes[0], flag: false },
            { value: testVarTypes[1], flag: false },
            { value: testVarTypes[2], flag: false },
            { value: testVarTypes[3], flag: false }
        ];
        this.answerChoices[typeAnswer].flag = true;
        //randomStream.shuffle(this.answerChoices);
    }
    else // given type, choose statement
    {
        this.typeQuestion = "Which statement or literal is of the following type?</p><pre>" +
            testVarTypes[typeAnswer] + "</pre>";

        this.answerChoices = [
            { value: cppGenerateIntAnswer(randomStream), flag: (typeAnswer===0) },
            { value: cppGenerateDoubleAnswer(randomStream), flag: (typeAnswer===1) },
            { value: cppGenerateCharAnswer(randomStream), flag: (typeAnswer===2) },
            { value: cppGenerateBoolAnswer(randomStream), flag: (typeAnswer===3) }
        ];
        //randomStream.shuffle(this.answerChoices);
    }

    this.correctIndex = typeAnswer;
    //this.answerChoices[this.correctIndex][3] = true;

    this.formatQuestion = function(format) {
        switch (format) {
            case "HTML": return this.formatQuestionHTML();
        }
        return "unknown format";
    };

    this.formatQuestionHTML = function () {


        var questionText = this.typeQuestion;

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
        return "unknown format";
    };

    this.formatAnswerHTML = function () {
        return String.fromCharCode(this.correctIndex+97); //0 = 'a', 1 = 'b', 2 = 'c', etc...
    };

}


function cppAppropriateVariablesQuestion(randomStream,params)
{
    return new CppApproVar(randomStream,params);
}
