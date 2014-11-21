RandomIdentifiers =
{
    one: ["foo","bar","baz","fiddle","faddle","bim","bam","quux","snork","snap"],
    two: ["squish","squash","smoot","spiffle","splin","squal","spork","smop","smick","smock"],
    three: ["blarp","squeeble","blurgle","podiddle","tulopulop","porskidor","swamwam"],
    four: ["a","b","c","d","e","moop","minx","mox","mole","f","g"]
};
RandomReturnTypes = ["int", "float", "double", "string"];

function getRandomId(randomStream, num)
{
    var id;

    switch(num){
        case 0:
            id = RandomIdentifiers.one[randomStream.nextIntRange(RandomIdentifiers.one.length)];
            break;
        case 1:
            id = RandomIdentifiers.two[randomStream.nextIntRange(RandomIdentifiers.two.length)];
            break;
        case 2:
            id = RandomIdentifiers.three[randomStream.nextIntRange(RandomIdentifiers.three.length)];
            break;
        case 3:
            id = RandomIdentifiers.four[randomStream.nextIntRange(RandomIdentifiers.four.length)];
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
    var funcName = getRandomId(randomStream, randomStream.nextIntRange(3));
    var paramType = getRandomReturnType(randomStream);
    var paramName = getRandomId(randomStream, 3);

    randomStream.shuffle(parameterPassTypes);

    this.answerChoices = [
        { value: parameterPassTypes[0][0], flag: true},
        { value: parameterPassTypes[1][0], flag: false},
        { value: parameterPassTypes[2][0], flag: false},
        { value: parameterPassTypes[3][0], flag: false}
    ];

    randomStream.shuffle(this.answerChoices);

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
        var questionText = "<p>The following prototype is an example of which type of parameter passing?</p>" +
            "<pre>" + retType + " " + funcName + "(" + paramType + " ";
        if(parameterPassTypes[this.correctIndex][2] == -1)
            questionText += parameterPassTypes[this.correctIndex][1];
        questionText += paramName;
        if(parameterPassTypes[this.correctIndex][2] == 1)
            questionText += parameterPassTypes[this.correctIndex][1];
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


function cppFunctionParametersQuestion(randomStream)
{
        return new cppFunctionParametersA(randomStream)
}
