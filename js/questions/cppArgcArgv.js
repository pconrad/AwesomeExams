function cppArgcArgvQuestion(randomStream, params)
{
    this.pts = 0;
    if (params.hasOwnProperty('pts')) {
	this.pts = params.pts;
    }

    var argcQuestion;
    var commandName = cppGetRandomId(randomStream, randomStream.nextIntRange(4));
    var argumentCount = 3 + randomStream.nextIntRange(3);
    var argumentList = [];

    var argcWhichArg;
    var argcWhichIdx;
    var distractor1;
    var distractor2;
    var distractor3;

    argumentList[0] = "./" + commandName;
    for(var argci1 = 1; argci1 < argumentCount; ++argci1)
    {
        argumentList[argci1] = commandName;
        while(argumentList[argci1] == commandName)
            argumentList[argci1] = cppGetRandomId(randomStream, randomStream.nextIntRange(4));
    }

    if(randomStream.nextIntRange(3) === 0)
    {   // what's argc?
        this.answerChoices = [
            {value: argumentCount, flag: true},
            {value: argumentCount + 1, flag: false},
            {value: argumentCount - 1, flag: false},
            {value: (randomStream.nextIntRange(2)===0?argumentCount-2:argumentCount+2), flag: false} ];

        argcQuestion = "<p>What is the value of argc after the following command is typed?</p><pre>";
        argcQuestion += /*"./" +*/ argumentList[0];
        for(var argci2 = 1; argci2 < argumentCount; ++argci2)
            argcQuestion += " " + argumentList[argci2];
        argcQuestion += "</pre>";
    }
    else
    {   // ID character in argument
        argcWhichArg = randomStream.nextIntRange(argumentCount);
        argcWhichIdx = randomStream.nextIntRange(argumentList[argcWhichArg].length);
        var argcCorrect = argumentList[argcWhichArg][argcWhichIdx];
        var argcIdx;

        distractor1 = argumentList[argcWhichArg][argcWhichIdx];
        while(distractor1 == argcCorrect)
        {
            argcIdx = randomStream.nextIntRange(argumentCount);
            distractor1 = argumentList[argcIdx][randomStream.nextIntRange(argumentList[argcIdx].length)];
        }

        if(argcWhichArg - 1 > -1)
        {   // typical for students to confuse argv[0] and argv[1]
            distractor2 = argumentList[argcWhichArg - 1];
            if(argcWhichIdx >= distractor2.length)
                distractor2 = distractor2[distractor2.length - 1];
            else
                distractor2 = distractor2[argcWhichIdx];

            while(distractor2 == argcCorrect || distractor2 == distractor1)
            {
                argcIdx = randomStream.nextIntRange(argumentCount);
                distractor2 = argumentList[argcIdx][randomStream.nextIntRange(argumentList[argcIdx])];
            }

        }
        else
        {
            distractor2 = argcCorrect;
            while(distractor2 == argcCorrect || distractor2 == distractor1)
            {
                argcIdx = randomStream.nextIntRange(argumentCount);
                distractor2 = argumentList[argcIdx][randomStream.nextIntRange(argumentList[argcIdx].length)];
            }
        }

        if(argcWhichIdx - 1 > -1)
        {   // typical for students to confuse argv[c][0] and argv[c][1]
            distractor3 = argumentList[argcWhichArg];
            distractor3 = distractor3[argcWhichIdx-1];

            while(distractor3 == argcCorrect || distractor3 == distractor2 || distractor3 == distractor1)
            {
                argcIdx = randomStream.nextIntRange(argumentCount);
                distractor3 = argumentList[argcIdx][randomStream.nextIntRange(argumentList[argcIdx].length)];
            }

        }
        else
        {
            distractor3 = argcCorrect;
            while(distractor3 == argcCorrect || distractor3 == distractor2 || distractor3 == distractor1)
            {
                argcIdx = randomStream.nextIntRange(argumentCount);
                distractor3 = argumentList[argcIdx][randomStream.nextIntRange(argumentList[argcIdx].length)];
            }
        }
        this.answerChoices = [
            {value: argcCorrect, flag: true},
            {value: distractor1, flag: false},
            {value: distractor2, flag: false},
            {value: distractor3, flag: false} ];

        argcQuestion = "<p>What is the value of argv[" + argcWhichArg + "][" + argcWhichIdx +
            "] after the following command is typed?</p><pre>";
        argcQuestion += "./" + commandName;
        for(var argci3 = 1; argci3 < argumentCount; ++argci3)
            argcQuestion += " " + argumentList[argci3];
        argcQuestion += "</pre>";
    }

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
        var questionText = formatPts(this.pts);
        questionText += argcQuestion;

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

