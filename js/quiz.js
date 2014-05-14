function Quiz(seed,num,type)
{
    this.seed = seed;
    this.num = num;
    this.type = type;

    var questionFunc = ((type in questionTypes) ? questionTypes[type].f : null);
    this.quizname = ((type in questionTypes) ? questionTypes[type].title  :  "Question Type Not Found");

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

    this.key = this.formatAnswersHTML();


}


function buildQuiz() {

        var url = purl(); //Parse the current URL using the purl library

        var num = url.param("numQuestions");
        var questionType = url.param("questionType");
	var questions = url.param("questions");
	var key = url.param("key");

	// Try pulling out the seed as a hex number

        var seed = parseInt(url.param("seed"),16);

	// In case that seed was bogus, calculuate an alternative backup seed.

	altSeed = function (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}(0,0xFFFFFFFF);

	// Use the alternative if the seed passed in was not a legit number

	seed = isNaN(seed) ? altSeed : seed;   

	// generate the quiz using the seed

        var quiz = new Quiz(seed,num,questionType);

	// TODO: Fill in the parts of the document TODO: Refactor using JQuery instead of long form JavaScript calls
	// TODO: Only fill it in if it is asked for in the URL
	
	$("#linkBack").html("<a href='" + url.attr("protocol") + "://" + url.attr("host") + url.attr("directory") + "start.html'>generate new quiz</a>");

        $("#quizname").html(quiz.quizname);



	var newUrl = url.attr("source");	
	// remove #key and #answers from end, and answers or key from middle

	newUrl = newUrl.replace(/#key$/,"");	    
	newUrl = newUrl.replace(/#questions$/,"");	    

	newUrl = newUrl.replace(/[\&]?key=[A-Za-z]+/g,"");	    
	newUrl = newUrl.replace(/[\&]?questions=[A-Za-z]+/g,"");	    

	$("#seed").html("<h2>Quiz #: " + seed.toString(16).toUpperCase() + "</h2> <hr> <br>");

	var showQuestions = ("<p><a href='"+newUrl+ "&key=" + (key=="yes"?"yes":"no") + "&questions=yes#questions'>Show Questions</a></p>");
	var hideQuestions = ("<p><a href='"+newUrl+ "&key=" + (key=="yes"?"yes":"no") + "&questions=no#questions'>Hide Questions</a></p>");

	var showKey = ("<p><a href='"+newUrl+ "&questions=" + (questions=="yes"?"yes":"no") + "&key=yes#key'>Show Key</a></p>");
	var hideKey = ("<p><a href='"+newUrl+ "&questions=" + (questions=="yes"?"yes":"no") + "&key=no#key'>Hide Key</a></p>");


        if (questions=="yes") { 
	    $("#questions").html("<h2>Questions</h2>\n" + hideQuestions + quiz.formatQuestionsHTML()); 
	} else {
	    $("#questions").html(showQuestions);
	}

        if (key=="yes") { 
	    $("#key").html("<h2>Key</h2>\n" + hideKey + quiz.formatAnswersHTML());
	} else {
	    $("#key").html(showKey);
	}

}