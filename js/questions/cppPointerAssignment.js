CppRandomNames =
{
    one: ["foo","bar","baz","fiddle","faddle","bim","bam","quux","snork","snap"],
    two: ["squish","squash","smoot","spiffle","splin","squal","spork","smop","smick","smock"],
    three: ["blarp","squeeble","blurgle","podiddle","tulopulop","porskidor","swamwam"],
    four: ["MOOP","MooP","mOOp","mooP","Moop","moop","minx","mox","mole","moof","moog"]
};

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

function cppPointerAssignmentQuestion(randomStream)
{
    var cppPAVars = [];
    var cppPAPointers = [];

    // 0: var name, 1: var value, 2: pointers pointing to this var
    for(var i1 = 0; i1 < 4; ++i1)
    {
        cppPAVars[i1] = [];
        cppPAVars[i1][0] = cppGetRandomId(randomStream,i1);
        cppPAVars[i1][1] = randomStream.nextIntRange(100);
        cppPAVars[i1][2] = [];
    }

    // ensure all variable values are unique
    for(var i2 = 0; i2 < 4; ++i2)
        for(var i3 = 0; i3 < 4; ++i3)
        {
            if(i2 === i3)
                continue;
            while(cppPAVars[i2][1] === cppPAVars[i3][1])
                cppPAVars[i2][1] = randomStream.nextIntRange(100);
        }

    // 0: var name, 1: var pointed to
    for(var i4 = 0; i4 < 4; ++i4)
    {
        cppPAPointers[i4] = [];
        cppPAPointers[i4][0] = cppGetRandomId(randomStream, i4);
        while(cppPAPointers[i4][0] == cppPAVars[i4][0])
            cppPAPointers[i4][0] = cppGetRandomId(randomStream, i4);
        cppPAPointers[i4][1] = i4;
    }

    // print out question state now, state will change in next step
    var cppPAQuestion = "<p>Based on the following code:</p><pre>";
    for(var i6 = 0; i6 < 4; ++i6)
    {
        cppPAQuestion += "int " + cppPAVars[i6][0] + " = " + cppPAVars[i6][1] + ";\n";
    }
    for(var i7 = 0; i7 < 4; ++i7)
    {
        cppPAQuestion += "int *" + cppPAPointers[i7][0] + " = &" + cppPAVars[i7][0] +  ";\n";
    }
    cppPAQuestion += "\n";

    // apply 3-5 changes
    var cppPAChangeCount = 3 + randomStream.nextIntRange(3);
    for(var i5 = 0; i5 < cppPAChangeCount; ++i5)
    {
        // set pointer to point with another pointer
        if(randomStream.nextIntRange(3) === 0)
        {
            var cppPAPtoP1 = randomStream.nextIntRange(4);
            var cppPaPtoP2 = randomStream.nextIntRange(4);
            while(cppPaPtoP2 === cppPAPtoP1)
                cppPaPtoP2 = randomStream.nextIntRange(4);
            cppPAPointers[cppPAPtoP1][1] = cppPAPointers[cppPaPtoP2][1];
            cppPAQuestion += cppPAPointers[cppPAPtoP1][0] + " = " +cppPAPointers[cppPAPtoP2][0] + ";\n";
        }
        // set value of non-pointer variable
        else if(randomStream.nextIntRange(2) === 0)
        {
            var cppPASetValIdx = randomStream.nextIntRange(4);
            var cppPASetValUnique = false;
            while(!cppPASetValUnique)
            {
                cppPAVars[cppPASetValIdx][1] = randomStream.nextIntRange(100);
                cppPASetValUnique = true;

                for(var i8 = 0; i8 < 4; ++i8)
                {
                    if(i8 === cppPASetValIdx)
                        continue;
                    if(cppPAVars[cppPASetValIdx][1] === cppPAVars[i8][1])
                        cppPASetValUnique = false;
                }
            }

            cppPAQuestion += cppPAVars[cppPASetValIdx][0] + " = " + cppPAVars[cppPASetValIdx][1] + ";\n";
        }
        // set value of dereferenced pointer
        else
        {
            var cppPASetDerefIdx = randomStream.nextIntRange(4);
            var cppPASetDerefUnique = false;
            var cppPASetDerefNewVal;
            while(!cppPASetValUnique)
            {
                cppPASetDerefNewVal = randomStream.nextIntRange(100);
                cppPASetDerefUnique = true;

                for(var i9 = 0; i9 < 4; ++i9)
                {
                    if(i9 === cppPASetDerefIdx) // TODO: change to if var pointed to by this pointer's idx === derefidx
                        continue;
                    if(cppPASetDerefNewVal === cppPAVars[i9][1])
                        cppPASetDerefUnique = false;
                }
            }

            cppPAQuestion += "(*" + cppPAPointers[cppPASetValIdx][0] + ") = " + cppPAVars[cppPASetValIdx][1] + ";\n";
        }
    }

    // generate question, answer, and distractors
    cppPAQuestion += "what is the value of ";
    this.answerChoices = [
        {value: 0, flag: true},
        {value: 0, flag: false},
        {value: 0, flag: false},
        {value: 0, flag: false} ];

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
        var questionText = "<p>Convert " + this.a.value + " from " + this.a.base + " to " + this.b.base + ".</p>";

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

