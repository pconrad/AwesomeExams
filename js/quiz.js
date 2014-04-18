function Quiz(seed,num,type)
{
    this.seed = seed;
    this.num = num;
    this.type = type;

    var questionFunc = null;

    if (type == "changeOfBase") 
        questionFunc = changeOfBaseQuestion;
    else if (type == "orderOfOperations")
        questionFunc = orderOfOperationsQuestion;
    else if (type == "CvariableType")
	questionFunc = CvariableTypeQuestion;

    var randomStream = new RandomStream(seed);

    //Generate the questions, put them in an array
    this.questions = [];
    if(questionFunc != null)
    {
        for(var i=0; i<num; i++)
        {
            this.questions.push(new questionFunc(randomStream));
        }
    }

    //Create a string that is a list of all the questions
    this.formatQuestionsHTML = function() {
        var text = "";
        for(var i=0; i<this.questions.length; i++)
            text += "<h3>Question " + (i+1) + ":</h3>" + this.questions[i].formatQuestion("HTML") + "<br>";
        return text;
    }

    //Create a string that is a list of all the answers
    this.formatAnswersHTML = function() {
        var text = "";
        for(var i=0; i<this.questions.length; i++)
            text += "<strong>" + (i+1) + ". </strong>" + this.questions[i].formatAnswer("HTML") + "<br>";
        return text;
    }

    this.answers = this.formatAnswersHTML();


}
