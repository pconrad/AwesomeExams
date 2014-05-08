function Quiz(seed,num,type)
{
    this.seed = seed;
    this.num = num;
    this.type = type;

   
    // NEW-QUESTION-TYPE: add to questionFunctions dictionary below

    questionTypes = {
	"changeOfBase":          {"f": changeOfBaseQuestion,       title: "Change of Base"},
	"orderOfOperations":     {"f": orderOfOperationsQuestion,  title: "Order of Operations"},
	"operandsAndOperators":  {"f":operandsAndOperatorsQuestion,title: "Operands and Operators"},
	"pythonProgramOutput":   {"f":pythonProgramOutputQuestion, title: "Python Program Output"},
	"pythonStringSlice":    {"f":pythonStringSliceQuestion,    title: "Python String Slice"},
	"symbolicLogic":         {"f":symbolicLogicQuestion,       title: "Symbolic Logic"},
	"CvariableType":         {"f":CvariableTypeQuestion,       title: "C Variable Type"},
	"cStrings":              {"f":cStringsQuestion,            title: "C Strings"},
	"pyStrings":             {"f":pyStringsQuestion,           title: "Python Strings"}
    };

    var questionFunc = ((type in questionTypes) ? questionTypes[type].f : null);
    this.quizname = ((type in questionTypes) ? questionTypes[type].title  :  "Question Type Not Found");

    /*
    if (type == "changeOfBase") 
        questionFunc = changeOfBaseQuestion;
    else if (type == "orderOfOperations")
        questionFunc = orderOfOperationsQuestion;
    else if (type == "operandsAndOperators")
        questionFunc = operandsAndOperatorsQuestion;
    else if (type == "pythonProgramOutput")
        questionFunc = pythonProgramOutput;
    else if (type == "pythonStringSlice") 
        questionFunc = pythonStringSliceQuestion;
    else if (type == "symbolicLogic")
	questionFunc = symbolicLogicQuestion;
    else if (type == "CvariableType")
	questionFunc = CvariableTypeQuestion;
    else if (type == "cStrings") 
        questionFunc = cStringsQuestion;
    else if (type == "pyStrings") 
        questionFunc = pyStringsQuestion;
    }
    */



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
