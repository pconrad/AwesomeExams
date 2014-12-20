CppRandomNames =
{
    one: ["foo","bar","baz","fiddle","faddle","bim","bam","quux","snork","snap"],
    two: ["squish","squash","smoot","spiffle","splin","squal","spork","smop","smick","smock"],
    three: ["blarp","squeeble","blurgle","podiddle","tulopulop","porskidor","swamwam"],
    four: ["MOOP","Moop","mooP","MooP","mOOp","moop","minx","mox","mole","moof","moog"]
};
RandomReturnTypes = ["int", "float", "double", "string"];

function cppGetRandomId(randomStream, num)
{//getRandomId
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

function getRandomReturnType(randomStream)
{
    return RandomReturnTypes[randomStream.nextIntRange(4)];
}

function cppFunctionParametersA(randomStream)
{
    var parameterPassTypes =
        [
            ["pass by value", "", 0],
            ["pass by reference", "&", -1],
            ["passing a pointer", "*", -1],
            ["passing an array", "[]", 1]
        ];

    var retType = getRandomReturnType(randomStream);
    var funcName = cppGetRandomId(randomStream, randomStream.nextIntRange(3));
    var paramType = getRandomReturnType(randomStream);
    var paramName = cppGetRandomId(randomStream, 3);

    this.answerChoices = [
        { value: parameterPassTypes[0][0], specialChar: parameterPassTypes[0][1],
            specialPos: parameterPassTypes[0][2], flag: false},
        { value: parameterPassTypes[1][0], specialChar: parameterPassTypes[1][1],
            specialPos: parameterPassTypes[1][2], flag: false},
        { value: parameterPassTypes[2][0], specialChar: parameterPassTypes[2][1],
            specialPos: parameterPassTypes[2][2], flag: false},
        { value: parameterPassTypes[3][0], specialChar: parameterPassTypes[3][1],
            specialPos: parameterPassTypes[3][2], flag: false}
    ];

    randomStream.shuffle(this.answerChoices);

    this.correctIndex = randomStream.nextIntRange(4);
    this.answerChoices[this.correctIndex][3] = true;

    this.formatQuestion = function(format) {
        switch (format) {
            case "HTML": return this.formatQuestionHTML();
        }
        return "unknown format";
    };

    this.formatQuestionHTML = function () {
        var questionText = "<p>The following prototype is an example of which type of parameter passing?</p>" +
            "<pre>" + retType + " " + funcName + "(" + paramType + " ";
        if(this.answerChoices[this.correctIndex].specialPos == -1)
            questionText += this.answerChoices[this.correctIndex].specialChar;
        questionText += paramName;
        if(this.answerChoices[this.correctIndex].specialPos == 1)
            questionText += this.answerChoices[this.correctIndex].specialChar;
        questionText += ");</pre>";

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

function cppFunctionParametersB(randomStream)
{
    var parameterPassTypes =
        [
            ["pass by value", "", 0],
            ["pass by reference", "&", -1],
            ["passing a pointer", "*", -1],
            ["passing an array", "[]", 1]
        ];

    ///// Generate randomness of the question
    // called function
    var calledFunReturnsIntNotVoid = randomStream.nextIntRange(2);
    var calledFunName = cppGetRandomId(randomStream, randomStream.nextIntRange(3));
    var calledFunParameterName1 = cppGetRandomId(randomStream, 3);
    var calledFunParameterName2 = calledFunParameterName1;
    while(calledFunParameterName2 == calledFunParameterName1)
        calledFunParameterName2 = cppGetRandomId(randomStream, 3);
    var calledFunUses2ndParameter;
    var calledFunMultiplier = randomStream.nextIntRange(10);
    var calledFunAdder = randomStream.nextIntRange(10);
    var calledFunCalculatedValue;
    var calledFunReturnValueIndex; // for pass array problems
    var calledFunReturnValue;
    var calledFunReturnsTrueFalseNeither = randomStream.nextIntRange(3) - 1;    // returns 1=true 0=false -1=neither

    // main function
    var mainVarName = calledFunParameterName1;
    while(mainVarName == calledFunParameterName1)
        mainVarName = cppGetRandomId(randomStream, 3);
    var mainVarInitialValue;// = 2 + randomStream.nextIntRange(97);
    var mainVarFinalValue;// = mainVarInitialValue;
    var mainVarRedHerringName = mainVarName;
    while(mainVarRedHerringName == mainVarName)
        mainVarRedHerringName = cppGetRandomId(randomStream, 3);
    var mainExpectsIntReturnNotVoid = randomStream.nextIntRange(2);    // TODO: if called doesn't return int, error

    /// decisions
    this.answerChoices = [ /*
        { value: 0, flag: true},
        { value: 1, flag: false},
        { value: 2, flag: false},
        { value: 3, flag: false} */
    ];

    // pass by...
    var passParameterByIndex = randomStream.nextIntRange(4);
    if(passParameterByIndex === 3 || randomStream.nextIntRange(4) ===0) // needs 2nd param or red herring
        calledFunUses2ndParameter = 1;
    else
        calledFunUses2ndParameter = 0;

    // what called function returns vs. what main expects
    if(calledFunReturnsIntNotVoid && mainExpectsIntReturnNotVoid)
    {   // mainVarFinalValue will become returned value (calledFunReturnValue)
        // possible answers: *0, 1*, original value, *modified value*, memory address(pointer), error

        // if passed in array, pick random value from final array to possibly return
        if(passParameterByIndex === 3)
        {
            calledFunCalculatedValue = [];
            mainVarInitialValue = [ randomStream.nextIntRange(13),
                randomStream.nextIntRange(13),
                randomStream.nextIntRange(13) ];
            for(var i = 0; i < 3; ++i)
                calledFunCalculatedValue[i] = mainVarInitialValue[i] * calledFunMultiplier + calledFunAdder;
            calledFunReturnValueIndex = randomStream.nextIntRange(3);
            calledFunCalculatedValue = calledFunCalculatedValue[calledFunReturnValueIndex];
        }
        // otherwise calculate value that might be returned
        else
        {
            mainVarInitialValue = randomStream.nextIntRange(13);
            calledFunCalculatedValue = mainVarInitialValue * calledFunMultiplier + calledFunAdder;
        }

        // does called fun return a variable value or succeed/fail 1/0?
        if(calledFunReturnsTrueFalseNeither !== -1)
            calledFunReturnValue = calledFunReturnsTrueFalseNeither;
        else
            calledFunReturnValue = calledFunCalculatedValue;

        // set returned value to main final value
        mainVarFinalValue = calledFunReturnValue;

        // TODO: could return pointer instead of dereferenced pointer
        // TODO: if returning 0/1, calculated value MUST be a distractor

        this.answerChoices = [
         { value: mainVarFinalValue, flag: true},
         { value: (mainVarFinalValue===0?mainVarInitialValue:0), flag: false}, // 0 or orig value
         { value: (mainVarFinalValue===1?randomStream.nextIntRange(97)+2:1), flag: false}, // 1 or random
         { value: (randomStream.nextIntRange(2)===1?"an error":"a memory address"),
             flag: false}  // error or unmodified
        ];
    }
    else if(!calledFunReturnsIntNotVoid && mainExpectsIntReturnNotVoid)
    {   // this is an error condition
        // possible answers: 0, 1, original value, modified value, memory address(pointer), *error*
        // if passed in array, pick random value from final array to possibly return
        if(passParameterByIndex === 3)
        {
            calledFunCalculatedValue = [];
            mainVarInitialValue = [ randomStream.nextIntRange(13),
                randomStream.nextIntRange(13),
                randomStream.nextIntRange(13) ];
            for(var i = 0; i < 3; ++i)
                calledFunCalculatedValue[i] = mainVarInitialValue[i] * calledFunMultiplier + calledFunAdder;
            calledFunReturnValueIndex = randomStream.nextIntRange(3);
            calledFunCalculatedValue = calledFunCalculatedValue[calledFunReturnValueIndex];
        }
        // otherwise calculate value that might be returned
        else
        {
            mainVarInitialValue = randomStream.nextIntRange(13);
            calledFunCalculatedValue = mainVarInitialValue * calledFunMultiplier + calledFunAdder;
        }

        // if passed in array, return random value from final array
        var cppDoBoolAnswer = randomStream.nextIntRange(2);
        this.answerChoices = [
         { value: "an error", flag: true},
         { value: (cppDoBoolAnswer===1?0:mainVarInitialValue), flag: false},
         { value: (cppDoBoolAnswer===1?1:calledFunCalculatedValue), flag: false},
         { value: (cppDoBoolAnswer===1?calledFunCalculatedValue:"a memory address"), flag: false}
        ];

    }
    else if(calledFunReturnsIntNotVoid && !mainExpectsIntReturnNotVoid)
    {   // called function returns value that is ignored by main
        // possible answers: 0, 1, *original value*, modified value, memory address(pointer), error
        // if passed in array, return random value from final array
        if(passParameterByIndex === 3)
        {
            calledFunCalculatedValue = [];
            mainVarInitialValue = [ randomStream.nextIntRange(13),
                randomStream.nextIntRange(13),
                randomStream.nextIntRange(13) ];
            for(var i = 0; i < 3; ++i)
                calledFunCalculatedValue[i] = mainVarInitialValue[i] * calledFunMultiplier + calledFunAdder;
            calledFunReturnValueIndex = randomStream.nextIntRange(3);
            calledFunCalculatedValue = calledFunCalculatedValue[calledFunReturnValueIndex];
        }
        // otherwise calculate value that might be returned
        else
        {
            mainVarInitialValue = randomStream.nextIntRange(13);
            calledFunCalculatedValue = mainVarInitialValue * calledFunMultiplier + calledFunAdder;
        }

        // does called fun return a variable value or succeed/fail 1/0?
        if(calledFunReturnsTrueFalseNeither !== -1)
            calledFunReturnValue = calledFunReturnsTrueFalseNeither;
        else
            calledFunReturnValue = calledFunCalculatedValue;

        // reference/pointer will change value
        if(passParameterByIndex === 2 || passParameterByIndex === 3)
        {
            mainVarFinalValue = calledFunCalculatedValue;
        }
        else    // value is never change, final value is initial value
        {
            mainVarFinalValue = mainVarInitialValue;
        }

        var cppIgnoredMemOrError = [ "an error", "a memory address" ];
        randomStream.shuffle(cppIgnoredMemOrError);
        this.answerChoices = [
            { value: mainVarFinalValue, flag: true},
            { value: (mainVarFinalValue===mainVarInitialValue?0:calledFunCalculatedValue), flag: false},
            { value: (mainVarFinalValue===mainVarInitialValue?1:cppIgnoredMemOrError[0]), flag: false},
            { value: cppIgnoredMemOrError[1], flag: false}
        ];
    }
    else
    {   // nothing returned, nothing expected
        // possible answers: 0, 1, *original value*, *modified value*, memory address(pointer), error
        // if passed in array, return random value from final array
        if(passParameterByIndex === 3)
        {
            calledFunCalculatedValue = [];
            mainVarInitialValue = [ randomStream.nextIntRange(13),
                randomStream.nextIntRange(13),
                randomStream.nextIntRange(13) ];
            for(var i = 0; i < 3; ++i)
                calledFunCalculatedValue[i] = mainVarInitialValue[i] * calledFunMultiplier + calledFunAdder;
            calledFunReturnValueIndex = randomStream.nextIntRange(3);
            calledFunCalculatedValue = calledFunCalculatedValue[calledFunReturnValueIndex];
        }
        // otherwise calculate value that might be returned
        else
        {
            mainVarInitialValue = randomStream.nextIntRange(13);
            calledFunCalculatedValue = mainVarInitialValue * calledFunMultiplier + calledFunAdder;
        }

        // does called fun return a variable value or succeed/fail 1/0?
        if(calledFunReturnsTrueFalseNeither !== -1)
            calledFunReturnValue = calledFunReturnsTrueFalseNeither;
        else
            calledFunReturnValue = calledFunCalculatedValue;

        // reference/pointer will change value
        if(passParameterByIndex === 2 || passParameterByIndex === 3)
        {
            mainVarFinalValue = calledFunCalculatedValue;
        }
        else    // value is never change, final value is initial value
        {
            mainVarFinalValue = mainVarInitialValue;
        }
        var cppDontCareMemOrError = [ "an error", "a memory address" ];
        randomStream.shuffle(cppDontCareMemOrError);
// TODO: these sometimes don't include the correct answer
        this.answerChoices = [
            { value: mainVarFinalValue, flag: true},
            { value: (mainVarFinalValue===mainVarInitialValue?0:calledFunCalculatedValue), flag: false},
            { value: (mainVarFinalValue===mainVarInitialValue?1:cppDontCareMemOrError[0]), flag: false},
            { value: cppDontCareMemOrError[1], flag: false}
        ];
    }

    // randomize all possible distractor answers, pick first 3, push correct, re-randomize (use arr.slice())
    //randomStream.shuffle(this.answerChoices);

    for(var ii = 0; ii < this.answerChoices.length; ++ii)
        if(this.answerChoices[ii].flag == true)
            this.correctIndex = ii;

    ///// write out the program
    var program = "";   // initialize program
    program += "#include &lt;iostream>\n\n";

    // called function
    program += (calledFunReturnsIntNotVoid===1?"int ":"void ") + calledFunName;
    program += "(int " +
        (parameterPassTypes[passParameterByIndex][2]===-1?parameterPassTypes[passParameterByIndex][1]:"") +
        calledFunParameterName1 +
        (parameterPassTypes[passParameterByIndex][2]===1?parameterPassTypes[passParameterByIndex][1]:"");
    if(calledFunUses2ndParameter === 1)
    {
        program += ", int " + calledFunParameterName2;
    }
    program += ")\n{\n";

    if(passParameterByIndex === 3)  // create an array algorithm
    {
        program += "  for(int i = 0; i < " + calledFunParameterName2 + "; i++)\n";
        program += "    " + calledFunParameterName1 + "[i] = " + calledFunParameterName1 + "[i] * " +
            calledFunMultiplier + " + " + calledFunAdder + ";\n\n";
    }
    else    // create a single value algorithm
    {
        program += "  " +
            (passParameterByIndex===2?"(*":"") +
            calledFunParameterName1 +
            (passParameterByIndex===2?")":"") +
            " = " +
            (passParameterByIndex===2?"(*":"") +
            calledFunParameterName1 +
            (passParameterByIndex===2?")":"") +
            " * " +
            calledFunMultiplier + " + " + calledFunAdder + ";\n";
    }

    if(calledFunReturnsIntNotVoid === 1)
    {
        program += "\n  return ";
        if(calledFunReturnsTrueFalseNeither === -1)
        {
            if(passParameterByIndex === 3)
            {
                program += calledFunParameterName1 + "[" + calledFunReturnValueIndex + "];\n";
            }
            else
            {
                program += calledFunParameterName1 + ";\n";
            }
        }
        else
        {
            program += calledFunReturnsTrueFalseNeither + ";\n";
        }
    }

    program += "}\n\n";

    // Write the main function
    program += "int main()\n{\n";
    program += "  int " + mainVarName;
    if(passParameterByIndex === 3)
        program += "[]";
    program += " = " + (passParameterByIndex===3?"[ ":"") + mainVarInitialValue +
        (passParameterByIndex===3?" ]":"") + ";\n";
    if(calledFunUses2ndParameter === 1)
    {
        program += "  int " + mainVarRedHerringName + " = ";
        if(passParameterByIndex === 3)
            program += "3;\n";
        else
            program += (randomStream.nextIntRange(13)+1) + ";\n";
    }

    if(mainExpectsIntReturnNotVoid === 1)
        program += "  " + mainVarName + " = ";
    else
        program += "  ";
    program += calledFunName + "(" + (passParameterByIndex===3?"&":"") + mainVarName;
    if(calledFunUses2ndParameter === 1)
        program += ", " + mainVarRedHerringName;
    program += ");\n\n";

    program += "  std::cout << " + mainVarName + " << std::endl;\n\n";
    program += "  return 0;\n}";

    this.formatQuestion = function(format) {
        switch (format) {
            case "HTML": return this.formatQuestionHTML();
        }
        return "unknown format";
    };

    this.formatQuestionHTML = function () {
        var questionText = "<p>What is the output of the following program?</p>" +
            "<pre>" + program + "</pre>";

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

function cppFunctionParametersQuestion(randomStream)
{
/*
    if(randomStream.nextIntRange(3) === 0)
        return new cppFunctionParametersA(randomStream);
    else
*/
        return new cppFunctionParametersB(randomStream);
}
