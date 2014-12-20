CppRandomNames =
{
    one: ["foo","bar","baz","fiddle","faddle","bim","bam","quux","snork","snap"],
    two: ["squish","squash","smoot","spiffle","splin","squal","spork","smop","smick","smock"],
    three: ["blarp","squeeble","blurgle","podiddle","tulopulop","porskidor","swamwam"],
    four: ["MOOP","MooP","mOOp","mooP","Moop","moop","minx","mox","mole","moof","moog"]
};
RandomReturnTypes = ["int", "float", "double", "string"];

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



function cppFunctionParametersB(randomStream) {
    var parameterPassTypes =
        [
            ["pass by value", "", 0],
            ["pass by reference", "&", -1],
            ["passing a pointer", "*", -1],
            ["passing an array", "[]", 1]
        ];
    var returnTypes = ["void", "int"];

    /////// choose all the random values for this problem
    var funName = cppGetRandomId(randomStream, randomStream.nextIntRange(3));
    var funParamPassTypeIndex = randomStream.nextIntRange(4);

    var mainVarName = cppGetRandomId(randomStream, 3);
    var mainVarValue;
    var mainVarFinalValue;

    var mainVarAssignedToReturn;
    if(randomStream.nextIntRange(2) === 0)
        mainVarAssignedToReturn = 0;
    else
        mainVarAssignedToReturn = 1;

    var funParameter1Name = cppGetRandomId(randomStream, 3);
    var funParameter2Name;
    var useFunParameter2;
    var funMultiplier = randomStream.nextIntRange(4) + 1;
    var funAdder = randomStream.nextIntRange(4) + 2;
    if ((funParamPassTypeIndex === 3) || (randomStream.nextIntRange(3) === 0)) { // need 2nd parameter if passing or array or as red herring
        useFunParameter2 = 1;
        do
        {
            funParameter2Name = cppGetRandomId(randomStream, 3);
        } while (funParameter2Name == funParameter1Name);
        mainVarValue = [];
        mainVarFinalValue = [];
        for (var i = 0; i < 3; ++i) {
            mainVarValue.push(randomStream.nextIntRange(10));
            mainVarFinalValue.push(mainVarValue[i] * funMultiplier + funAdder);
        }
    }
    else {
        useFunParameter2 = 0;
        mainVarValue = randomStream.nextIntRange(10)+2;
        mainVarFinalValue = mainVarValue * funMultiplier + funAdder;
    }

    var funReturnTypeIndex = randomStream.nextIntRange(2);
    var funReturnValue;
    var useFunReturnValue = randomStream.nextIntRange(2);
    if (useFunReturnValue === 0)
        funReturnValue = randomStream.nextIntRange(2);

    var program = '#include &lt;iostream>;\n\n';

    /////// build fun
    program += returnTypes[funReturnTypeIndex] + " " + funName + "(int ";
    if (parameterPassTypes[funParamPassTypeIndex][2] == -1)
        program += parameterPassTypes[funParamPassTypeIndex][1];
    program += funParameter1Name;
    if (parameterPassTypes[funParamPassTypeIndex][2] == 1)
        program += parameterPassTypes[funParamPassTypeIndex][1];
    if (useFunParameter2 == 1) {
        program += ", int " + funParameter2Name;
    }
    program += ")\n{\n";

    if (funParamPassTypeIndex === 3) // build an array algorithm
    {
        program += "  for(int i = 0; i < " + funParameter2Name + "; ++i)\n  {\n";
        program += "    " + funParameter1Name + "[i] *= " + funMultiplier + " + " + funAdder + ";\n";
        program += "  }\n";
    }
    else // build some other algorithm
    {
        if (funParamPassTypeIndex === 2)
            program += "  (*" + funParameter1Name + ") = " + "(*" + funParameter1Name + ") * " +
                funMultiplier + " + " + funAdder + ";\n";
        else
            program += "  " + funParameter1Name + " = " + funParameter1Name + " * " +
                funMultiplier + " + " + funAdder + ";\n";
    }

    program += "  return";
    if ((funParamPassTypeIndex != 3) && (funReturnTypeIndex === 1))    // can we even return a value?
    {
        if (useFunReturnValue === 0)    // return a fake answer?
        {
            program += " " + funReturnValue;
            mainVarFinalValue = funReturnValue;
        }
        else
        {
            if(funParamPassTypeIndex === 2)
                program += " (*" + funParameter1Name + ")";
            else
                program += " " + funParameter1Name;
        }
    }
    program += ";\n}\n\n";

    /////// build main
    program += "int main()\n{\n";

    if(funParamPassTypeIndex === 3)
    {
        program += "  int " + mainVarName + "[] = { " + mainVarValue[0] + ", " + mainVarValue[1] +
            ", " + mainVarValue[2] + " };\n";
        program += "  int sz = 3;\n";
    }
    else
    {
        program += "  int " + mainVarName + " = " + mainVarValue + ";\n";
        // TODO: add fake sz definition if 2nd parameter engaged
    }
    program += "\n";

    if((mainVarAssignedToReturn === 1) && (funReturnTypeIndex === 1))
        program += "  " + mainVarName + " = " + funName + "(";
    else
        program += "  " + funName + "(";
    switch (funParamPassTypeIndex)
    {
//        case 1:
//            program += "&";
//            break;
        case 2:
            program += "*";
            break;
    }
    program += mainVarName;
    if(funParamPassTypeIndex === 3)
        program += "[]";
    if(useFunParameter2 === 1)
        program += ", sz";
    program += ");\n\n";

    if(funParamPassTypeIndex != 3)
        program += "  std::cout << " + mainVarName + " << std::endl;";
    else
        program += "  std::cout << " + mainVarName + "[1] << std::endl;";

    program += "\n\n  return 0;\n}";

    if(funParamPassTypeIndex === 3)
        this.answerChoices = [
            { value: mainVarFinalValue[1], flag: true},
            { value: (mainVarFinalValue[1] === 0 || mainVarValue[1] === 0 ? randomStream.nextIntRange(23)+2 : 0),
                flag: false},
            { value: (mainVarFinalValue[1] === 1 || mainVarValue[1] === 1 ? randomStream.nextIntRange(23)+2 : 1),
                flag: false},
            { value: mainVarValue[1], flag: false}
        ];
    else
        this.answerChoices = [
            { value: mainVarFinalValue, flag: true},
            { value: (mainVarFinalValue === 0 || mainVarValue === 0 ? randomStream.nextIntRange(23)+2 : 0),
                flag: false},
            { value: (mainVarFinalValue === 1 || mainVarValue === 1 ? randomStream.nextIntRange(23)+2 : 1),
                flag: false},
            { value: mainVarValue, flag: false}
        ];

    //randomStream.shuffle(this.answerChoices);

    //this.correctIndex = randomStream.nextIntRange(4);
    //this.answerChoices[this.correctIndex][3] = true;

    for(var ii = 0; ii < 4; ++ii)
    {
        if(this.answerChoices[ii].flag == true)
        {
            this.correctIndex = ii;
            break;
        }
    }

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
    if(randomStream.nextIntRange(3) == 0)
        return new cppFunctionParametersA(randomStream);
    else
*/
        return new cppFunctionParametersB(randomStream);
}
