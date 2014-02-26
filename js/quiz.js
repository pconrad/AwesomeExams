function Quiz(seed,num,type)
{
    var questionFunc = null;

    if (type == "changeOfBase") 
        questionFunc = changeOfBaseQuestion;
    else if (type == "orderOfOperations")
        questionFunc = orderOfOperationsQuestion;

    var randomStream = new randomStream(seed);

    //Generate the questions, put them in an array
    this.questions = [];
    if(questionFunc != null)
    {
        for(int i=0; i<num; i++)
        {
            questions.push(new questionFunc(randomStream));
        }
    }

    //Create a string that is a list of all the questions
    this.formatQuestionsHTML = function() {
        var text = "";
        for(int i=0; i<questions.length; i++)
            text += "<h3>Question " + (i+1) + ":</h3>" + question.formatQuestion("HTML") + "<br>";
        return text;
    }

    //Create a string that is a list of all the answers
    this.formatAnswersHTML = function() {
        var text = "";
        for(int i=0; i<questions.length; i++)
            text += "<strong>" + (i+1) + ". </h3>" + question.formatAnswer("HTML") + "<br>";
        return text;
    }


}
