
function pythonStringSliceQuestion(randomStream) {
    var nameArray = ["Malibu", "Ventura", "Goleta", "Lompoc", "Oxnard", "Montecido", "Camarillo", "Moorpark"];

    this.name = nameArray[randomStream.nextIntRange(nameArray.length)];
    //obtains two random indices, if they are equal, then that index is used
    this.index2 = randomStream.nextIntRange(this.name.length+1);//if index2=this.name.length, print nothing
    this.index1 = randomStream.nextIntRange(this.index2 + 1);//if index1=0, print nothing
    this.index = 0;
    if(this.index2 === 0) {
        this.index = -1;
    }
    else if (this.index2 === this.index1) {
            this.index=this.index2;
    }

//Array of {String, bool} pairs: string and a flag indicating whether or not it is the correct answer.
    this.answerChoices = new Array(4);
    if (this.index === 0) {
        if (this.index1 === 0 && this.index2 === this.name.length) {
            this.answerChoices[0] = {value: this.name, flag: true};
            this.answerChoices[1] = {value: this.name.substring(1, this.name.length), flag: false};
            this.answerChoices[2] = {value: this.name.substring(0, this.name.length - 1), flag: false};
            this.answerChoices[3] = {value: this.name.substring(1, this.name.length - 1), flag: false};
        } else if (this.index1 === 0 && this.index2 === 1) {
            this.answerChoices[0] = {value: this.name[0], flag: true};
            this.answerChoices[1] = {value: this.name[1], flag: false};
            this.answerChoices[2] = {value: " ", flag: false};
            this.answerChoices[3] = {value: this.name.substring(0, 2), flag: false};
        }  else if (this.index1 === 0 && this.index2 === 2) {
            this.answerChoices[0] = {value: this.name.substring(0, 2), flag: true};
            this.answerChoices[1] = {value: this.name[0], flag: false};
            this.answerChoices[2] = {value: this.name[1], flag: false};
            this.answerChoices[3] = {value: this.name.substring(0, 3), flag: false};
        } else if (this.index1 === this.name.length-1 && this.index2 === this.name.length) {
            this.answerChoices[0] = {value: this.name[this.name.length - 1], flag: true};
            this.answerChoices[1] = {value: this.name.substring(this.name.length - 2, this.name.length), flag: false}; 
            this.answerChoices[2] = {value: " ", flag: false};             
            this.answerChoices[3] = {value: this.name[this.name.length - 2], flag: false};
        } else if (this.index1+1 === this.index2) {
            this.answerChoices[0] = {value: this.name.substring(this.index1, this.index2), flag: true};
            this.answerChoices[1] = {value: this.name.substring(this.index1, this.index2 + 1), flag: false};
            this.answerChoices[2] = {value: this.name.substring(this.index1 - 1, this.index2), flag: false};
            this.answerChoices[3] = {value: " ", flag: false};
        } else if (this.index1 === 0) {
            this.answerChoices[0] = {value: this.name.substring(0, this.index2), flag: true};
            this.answerChoices[1] = {value: this.name.substring(1, this.index2 + 1), flag: false};
            this.answerChoices[2] = {value: this.name.substring(0, this.index2-1), flag: false};
            this.answerChoices[3] = {value: this.name.substring(1, this.index2-1), flag: false};
        } else if(this.index2 === this.name.length) {
            this.answerChoices[0] = {value: this.name.substring(this.index1, this.name.length), flag: true};
            this.answerChoices[1] = {value: this.name.substring(this.index1, this.name.length-1), flag: false};
            this.answerChoices[2] = {value: this.name.substring(this.index1 - 1, this.name.length), flag: false};
            this.answerChoices[3] = {value: this.name.substring(this.index1 - 1, this.name.length-1), flag: false};
        } else {
            this.answerChoices[0] = {value: this.name.substring(this.index1, this.index2), flag: true};
            this.answerChoices[1] = {value: this.name.substring(this.index1, this.index2 + 1), flag: false};
            this.answerChoices[2] = {value: this.name.substring(this.index1 - 1, this.index2), flag: false};
            this.answerChoices[3] = {value: this.name.substring(this.index1 - 1, this.index2 + 1), flag: false};
        } 
    } else {
        if(this.index === this.name.length) {
            this.answerChoices[0]= {value: "IndexError: string index out of range", flag: true};
            this.answerChoices[1]= {value: this.name[this.index-1], flag: false};
            this.answerChoices[2]= {value: " ", flag: false};
            this.answerChoices[3]= {value: this.name[0], flag: false};
        } else if (this.index === 0) {
            this.answerChoices[0] = {value: this.name[0], flag: true};
            this.answerChoices[1] = {value: this.name[1], flag: false};
            this.answerChoices[2] = {value: this.name.substring(0, 2), flag: false};
            this.answerChoices[3] = {value: " ", flag: false};
        } else if (this.index === this.name.length - 1) {
            this.answerChoices[0] = {value: this.name[this.name.length - 1], flag: true};
            this.answerChoices[1] = {value: this.name[this.name.length - 2], flag: false};
            this.answerChoices[2] = {value: this.name.substring(this.name.length - 2, this.name.length), flag: false};
            this.answerChoices[3] = {value: " ", flag: false};
        } else if (this.index == -1) {
            this.answerChoices[0]= {value: this.name[this.name.length-1], flag: true};
            this.answerChoices[1]= {value: this.name[this.name.length-2], flag: false};
            this.answerChoices[2]= {value: this.name[0], flag: false};
            this.answerChoices[3]= {value: this.name.substring(0,this.name.length-1), flag: false};
        } else {
            this.answerChoices[0] = {value: this.name[this.index], flag: true};
            this.answerChoices[1] = {value: this.name[this.index - 1], flag: false};
            this.answerChoices[2] = {value: this.name[this.index + 1], flag: false};
            this.answerChoices[3] = {value: this.name.substring(this.index, this.name.length), flag: false};
        }
    }

                
    randomStream.shuffle(this.answerChoices);

    //Find the correct answer
    this.correctIndex = 0;
    for (var i = 0; i < this.answerChoices.length; i++) {
        if (this.answerChoices[i].flag === true) {
             this.correctIndex = i;           
        }
    }

    this.formatQuestion = function(format) {
        switch (format) {
	case "HTML": return this.formatQuestionHTML();
        }
	return "unknown format";
    };

    this.formatQuestionHTML = function () {
        var questionText = "<p>In Python, if we assign: city= \"" + this.name + "\" then what is the value of city";
        if (this.index === 0) {
            if (this.index1 === 0 && this.index2 === this.name.length) {
                questionText += "[:]?";
            } else if (this.index1 === 0) {
                questionText += "[:" + this.index2 + "]?";
            } else if (this.index2 === this.name.length) {
                questionText += "[" + this.index1 + ":]?";
            } else {
                questionText += "[" + this.index1 + ":" + this.index2 + "]?";
            }
        } else {
            questionText += "[" + this.index + "]?";
        }
            questionText += "<br>";
        var x=["a", "b", "c", "d"];
        if(this.index === this.name.length) {
            questionText+="<p>";
            for(i=0;i<4;i++) {
                if(i!=0)questionText+="<br>";
                if(this.answerChoices[i].flag==true) {
                    questionText+="<strong>"+x[i]+") </strong>" + this.answerChoices[i].value;
                }    
                else {
                    questionText+="<strong>" +x[i]+ ") </strong>"+"\'" + this.answerChoices[i].value + "\'";
                }
             }
             questionText+="</p>";
        }
        else {
            questionText += "<p><strong>a) </strong>" 
                + "\'" + this.answerChoices[0].value +"\'" + "<br><strong>b) </strong>"
                + "\'" + this.answerChoices[1].value +"\'" +  "<br><strong>c) </strong>"
                + "\'" + this.answerChoices[2].value +"\'" +  "<br><strong>d) </strong>"
                + "\'" + this.answerChoices[3].value +"\'" + "</p>";
        }
        return questionText;
    };

    this.formatAnswer = function (format) {
        switch (format) {
            case "HTML": return this.formatAnswerHTML();
        }  
        return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswerHTML = function () {
        var text = String.fromCharCode(this.correctIndex + 97); //0 = 'a', 1 = 'b', 2 = 'c', etc...
        return text;
    };

}


