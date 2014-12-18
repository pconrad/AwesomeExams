CppRandomNames =
{
    one: ["foo","bar","baz","fiddle","faddle","bim","bam","quux","snork","snap"],
    two: ["squish","squash","smoot","spiffle","splin","squal","spork","smop","smick","smock"],
    three: ["blarp","squeeble","blurgle","podiddle","tulopulop","porskidor","swamwam"],
    four: ["MOOP","MooP","mOOp","mooP","Moop","moop","minx","mox","mole","moof","moog"]
};
CppRandomTypes = [ "int", "double", "bool", "void" ];

function cppGenerateRandomValue(randomStream, num)
{
    switch(num)
    {
        case 0:
            return randomStream.nextIntRange(100);
        case 1:
            return randomStream.nextIntRange(99) + "." + randomStream.nextIntRange(99);
        default:
            return ["true", "false"][randomStream.nextIntRange(2)];
    }
}

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

function cppFunctionOverloadingQuestion(randomStream)
{
    var funcOverName = cppGetRandomId(randomStream, 0);
    var funcOverArgs = [];
    var funcOverReturnType = randomStream.nextIntRange(CppRandomTypes.length);
    var funcOverArgCount = 2 + randomStream.nextIntRange(2);
    for(var i1 = 0; i1 < funcOverArgCount; ++i1)
    {   // TODO: a fun with 3 double args produces distractors with all 3 double args
        funcOverArgs[i1] = [];
        funcOverArgs[i1][0] = randomStream.nextIntRange(CppRandomTypes.length - 1);
        funcOverArgs[i1][1] = cppGetRandomId(randomStream, i1+1);
        funcOverArgs[i1][2] = cppGetRandomId(randomStream, i1+1);
        funcOverArgs[i1][3] = cppGenerateRandomValue(randomStream, funcOverArgs[i1][0]);
    }

    var funcOverCorrect = CppRandomTypes[funcOverReturnType] + " " + funcOverName + "(";
    funcOverCorrect += CppRandomTypes[funcOverArgs[0][0]] + " " + funcOverArgs[0][1];
    for(var i2 = 1; i2 < funcOverArgCount; ++i2)
    {
        funcOverCorrect += ", " + CppRandomTypes[funcOverArgs[i2][0]] + " " + funcOverArgs[i2][1];
    }
    funcOverCorrect += ");";

    var funcOverDistractors = [];
    for(var i3 = 0; i3 < 3; ++i3)
    {
        var fakeType;

        funcOverDistractors[i3] = CppRandomTypes[funcOverReturnType] + " " + funcOverName + "(";
        if(i3 == 0)
        {
            fakeType = randomStream.nextIntRange(CppRandomTypes.length-1);
            while(fakeType == funcOverArgs[0][0])
                fakeType = randomStream.nextIntRange(CppRandomTypes.length-1);
            funcOverDistractors[0] += CppRandomTypes[fakeType] + " " + funcOverArgs[0][1];
        }
        else
        {
            funcOverDistractors[i3] += CppRandomTypes[funcOverArgs[0][0]] + " " + funcOverArgs[0][1];
        }

        for(var i4 = 1; i4 < funcOverArgCount; ++i4)
        {
            if(i3 == i4)
            {
                fakeType = randomStream.nextIntRange(CppRandomTypes.length-1);
                while(fakeType == funcOverArgs[i4][0])
                    fakeType = randomStream.nextIntRange(CppRandomTypes.length-1);
                funcOverDistractors[i3] += CppRandomTypes[fakeType] + " " + funcOverArgs[i4][1];
            }
            else
            {
                funcOverDistractors[i3] += ", " + CppRandomTypes[funcOverArgs[i4][0]] + " " + funcOverArgs[i4][1];
            }

        }
        funcOverDistractors[i3] += ");";
    }

    this.answerChoices = [
        {value: funcOverCorrect, flag: true},
        {value: funcOverDistractors[0], flag: false},
        {value: funcOverDistractors[1], flag: false},
        {value: funcOverDistractors[2], flag: false} ];

    //randomStream.shuffle(this.answerChoices);

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
        var overVarOffset = randomStream.nextIntRange(funcOverArgCount);
        var questionText = "<p>Which function signature belongs to the function that is called?</p>";
        questionText += "<pre>";
        for(var i5 = 0; i5 < funcOverArgCount; ++i5)
            questionText += CppRandomTypes[funcOverArgs[(i5+overVarOffset)%funcOverArgCount][0]] + " " +
                funcOverArgs[(i5+overVarOffset)%funcOverArgCount][2] + " = " +
                funcOverArgs[(i5+overVarOffset)%funcOverArgCount][3] + ";\n";
        questionText += "\n" + funcOverName + "(" + funcOverArgs[0][2];
        for(var i6 = 1; i6 < funcOverArgCount; ++i6)
            questionText += ", " + funcOverArgs[i6][2];
        questionText += ");";
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
    };

}

