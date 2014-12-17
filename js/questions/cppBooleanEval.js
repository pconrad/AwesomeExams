CppRandomNames =
{
    one: ["foo","bar","baz","fiddle","faddle","bim","bam","quux","snork","snap"],
    two: ["squish","squash","smoot","spiffle","splin","squal","spork","smop","smick","smock"],
    three: ["blarp","squeeble","blurgle","podiddle","tulopulop","porskidor","swamwam"],
    four: ["MOOP","MooP","mOOp","mooP","Moop","moop","minx","mox","mole","moof","moog"]
};
CppBoolComparisons = [ "==", "!=", ">", "<", ">=", "<=" ];

function cppGetRandomId(randomStream, num)
{
    var id;

    switch(num){
        case 0:
            id = CppRandomNames.one[randomStream.nextIntRange(CppRandomNames.one.length)];
            break;
        case 1:
            id = CppRandomNames.two[randomStream.nextIntRange(CppRandomNames.two.length)];
            break;
        case 2:
            id = CppRandomNames.three[randomStream.nextIntRange(CppRandomNames.three.length)];
            break;
        case 3:
            id = CppRandomNames.four[randomStream.nextIntRange(CppRandomNames.four.length)];
            break;
        default:
            break;
    }

    return id;
}

function cppBooleanEvalQuestion(randomStream)
{
    var varName1 = cppGetRandomId(randomStream, 3);
    var varName2 = varName1;
    while(varName2 == varName1)
    {
        varName2 = cppGetRandomId(randomStream, 3);
    }
    var varVal1;
    var varVal2;

    var evalBoolNotInt = randomStream.nextIntRange(2);
    var possibleAnswer1 = (evalBoolNotInt===0?[false, true][randomStream.nextIntRange(2)]:randomStream.nextIntRange(100));
    var possibleAnswer2 = possibleAnswer1;
    if(evalBoolNotInt === 1)
    {
        while(possibleAnswer2 === possibleAnswer1)
            possibleAnswer2 = randomStream.nextIntRange(100);
    }
    else
    {
        possibleAnswer2 = !possibleAnswer2;
    }
    var distractorAnswer1 = (evalBoolNotInt===1?[false, true][randomStream.nextIntRange(2)]:randomStream.nextIntRange(100));
    var distractorAnswer2 = distractorAnswer1;
    if(evalBoolNotInt === 0)
    {
        distractorAnswer2 = !distractorAnswer2;
    }
    else
    {
        while(distractorAnswer2 === distractorAnswer1)
            distractorAnswer2 = randomStream.nextIntRange(100);
    }
    var correctAnswer;

    var boolCompareIdx;
    if(evalBoolNotInt === 0)    // eval ints
    {
        varVal1 = randomStream.nextIntRange(100);
        varVal2 = randomStream.nextIntRange(100);
        boolCompareIdx = randomStream.nextIntRange(6);
        switch(boolCompareIdx)
        {
            case 0:
                if(varVal1 === varVal2)
                    correctAnswer = possibleAnswer1;
                else
                    correctAnswer = possibleAnswer2;
                break;
            case 1:
                if(varVal1 !== varVal2)
                    correctAnswer = possibleAnswer1;
                else
                    correctAnswer = possibleAnswer2;
                break;
            case 2:
                if(varVal1 > varVal2)
                    correctAnswer = possibleAnswer1;
                else
                    correctAnswer = possibleAnswer2;
                break;
            case 3:
                if(varVal1 < varVal2)
                    correctAnswer = possibleAnswer1;
                else
                    correctAnswer = possibleAnswer2;
                break;
            case 4:
                if(varVal1 >= varVal2)
                    correctAnswer = possibleAnswer1;
                else
                    correctAnswer = possibleAnswer2;
                break;
            default:
                if(varVal1 <= varVal2)
                    correctAnswer = possibleAnswer1;
                else
                    correctAnswer = possibleAnswer2;
        }
    }
    else                        // eval bools
    {
        varVal1 = [false, true][randomStream.nextIntRange(2)];
        varVal2 = [false, true][randomStream.nextIntRange(2)];
        boolCompareIdx = randomStream.nextIntRange(2);
        switch(boolCompareIdx)
        {
            case 0:
                if(varVal1 == varVal2)
                    correctAnswer = possibleAnswer1;
                else
                    correctAnswer = possibleAnswer2;
                break;
            default:
                if(varVal1 != varVal2)
                    correctAnswer = possibleAnswer1;
                else
                    correctAnswer = possibleAnswer2;
        }
    }

    this.answerChoices = [
        {value: possibleAnswer1, flag: (possibleAnswer1===correctAnswer) },
        {value: possibleAnswer2, flag: (possibleAnswer2===correctAnswer) },
        {value: distractorAnswer1, flag: false},
        {value: distractorAnswer2, flag: false} ];

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
        var questionText = "<p>What is the final value of <pre>answer</pre>?</p>"+
            "<pre>";

        if(evalBoolNotInt === 0)
        {
            questionText += "int " + varName1 + " = " + varVal1 + ";\n";
            questionText += "int " + varName2 + " = " + varVal2 + ";\n";
            questionText += "bool answer;\n";
        }
        else
        {
            questionText += "bool " + varName1 + " = " + varVal1 + ";\n";
            questionText += "bool " + varName2 + " = " + varVal2 + ";\n";
            questionText += "int answer;\n";
        }

        questionText += "if(" + varName1 + " " + CppBoolComparisons[boolCompareIdx] + " " + varName2 + ")\n";
        questionText += "  answer = " + possibleAnswer1 + ";\n";
        questionText += "else\n";
        questionText += "  answer = " + possibleAnswer2 + ";\n";

        questionText += "</pre>";

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
        return String.fromCharCode(this.correctIndex + 97); //0 = 'a', 1 = 'b', 2 = 'c', etc...
    }

}
