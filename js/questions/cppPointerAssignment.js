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
            var cppPAPtoP2 = randomStream.nextIntRange(4);
            while(cppPAPtoP2 === cppPAPtoP1)
                cppPAPtoP2 = randomStream.nextIntRange(4);
            cppPAPointers[cppPAPtoP1][1] = cppPAPointers[cppPAPtoP2][1];
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
        // set value of dereferenced pointer to a value that is not hold by another variable
        else
        {
            var cppPASetDerefIdx = randomStream.nextIntRange(4);
            var cppPASetDerefUnique = false;
            var cppPASetDerefNewVal;
            while(!cppPASetDerefUnique)   // loop until we find a unique value
            {
                cppPASetDerefNewVal = randomStream.nextIntRange(100);
                cppPASetDerefUnique = true;

                for(var i9 = 0; i9 < 4; ++i9)   // look at each int
                {
                    if(i9 === cppPAPointers[cppPASetDerefIdx][1])   // if this int is the one changing, don't need to look
                        continue;
                    if(cppPASetDerefNewVal === cppPAVars[i9][1])
                    {
                        cppPASetDerefUnique = false;
                    }
                }
            }

            cppPAVars[cppPASetDerefIdx][1] = cppPASetDerefNewVal;
            cppPAQuestion += "(*" + cppPAPointers[cppPASetDerefIdx][0] + ") = " + cppPAVars[cppPASetDerefIdx][1] + ";\n";
        }
    }

    // generate question, answer, and distractors
    cppPAQuestion += "</pre>what is the value of ";

    this.answerChoices = [
        {value: 0, flag: true},
        {value: 0, flag: false},
        {value: 0, flag: false},
        {value: 0, flag: false} ];

    var cppPARandomIdx = randomStream.nextIntRange(4);
    if(randomStream.nextIntRange(3) === 0)  // pick int
    {
        this.answerChoices[0].value = cppPAVars[cppPARandomIdx][1];
        this.answerChoices[1].value = cppPAVars[(cppPARandomIdx+1)%4][1];
        this.answerChoices[2].value = cppPAVars[(cppPARandomIdx+2)%4][1];
        this.answerChoices[3].value = (randomStream.nextIntRange(2)===0?cppPAVars[(cppPARandomIdx+3)%4][1]:"a memory address");

        cppPAQuestion += cppPAVars[cppPARandomIdx][0];
    }
    else    // pick int *
    {
        if(randomStream.nextIntRange(2) === 0)  // dereferenced pointer
        {
            this.answerChoices[0].value = cppPAVars[cppPAPointers[cppPARandomIdx][1]][1];
            this.answerChoices[1].value = cppPAVars[cppPAPointers[(cppPARandomIdx+1)%4][1]][1];
            this.answerChoices[2].value = cppPAVars[cppPAPointers[(cppPARandomIdx+2)%4][1]][1];
            this.answerChoices[3].value = (randomStream.nextIntRange(2)===0?cppPAVars[cppPAPointers[(cppPARandomIdx+3)%4][1]][1]:"a memory address");

            cppPAQuestion += "(*" + cppPAPointers[cppPARandomIdx][0] + ")";
        }
        else    // pointer value (an address)
        {
            this.answerChoices[0].value = "a memory address";
            this.answerChoices[1].value = cppPAVars[cppPAPointers[cppPARandomIdx][1]][1];
            this.answerChoices[2].value = cppPAVars[cppPAPointers[(cppPARandomIdx+1)%4][1]][1];
            this.answerChoices[3].value = cppPAVars[cppPAPointers[(cppPARandomIdx+2)%4][1]][1];

            cppPAQuestion += cppPAPointers[cppPARandomIdx][0];
        }
    }

    cppPAQuestion += "?</p>";

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
        var questionText = cppPAQuestion;

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

