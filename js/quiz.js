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


function QuizFromJson(seed,jsonString)
{
    this.seed = seed;
    this.jsonString = jsonString;

    this.jsonObject = JSON.parse(jsonString);

    this.randomStream = new RandomStream(seed);
    this.questions = parseQuizJSON(this.jsonObject.quiz, this.randomStream);

    this.quizname = this.jsonObject.quizTitle;

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


function randIntBetweenInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


// return seed as a hex number converted from rawTextSeed,
// or if that is not possible, return a random seed that is a
// legit positive integer between 0 and 2^32-1.


function determineSeed(rawTextSeed) {
    
    var seedToReturn = parseInt(rawTextSeed,16);

    // Use the alternative if the seed passed in was not a legit number
    
    if (isNaN(seedToReturn)) {
	return randIntBetweenInclusive(0,0xFFFFFFFF);
    }
   
    return seedToReturn;
}


// pass in url returned by purl
function linkToQuiz(url,extraParams) {
    return url.attr("protocol") + "://" + url.attr("host") + url.attr("directory") + "quiz.html" + 
	"?seed" + seed.toString(16) +
	"&numQuestions" + url.param("numQuestions") +
	"&questionType" + url.param("questionType") +
	extraParams;
}

// pass in url returned by purl
function linkToQuizFromJSON(url) {
    return url.attr("protocol") + "://" + url.attr("host") + url.attr("directory") + "quiz.html" + 
	"?seed" + seed.toString(16) +
	"&jsonString" + url.param("numQuestions") +
	extraParams;
}


function buildQuiz() {

        var url = purl(); //Parse the current URL using the purl library

        var num = url.param("numQuestions");
        var questionType = url.param("questionType");
	var questions = url.param("questions");
	var key = url.param("key");

	var seed = determineSeed(url.param("seed"));

	// generate the quiz using the seed

        var quiz = new Quiz(seed,num,questionType);

	// TODO: Fill in the parts of the document TODO: Refactor using JQuery instead of long form JavaScript calls
	// TODO: Only fill it in if it is asked for in the URL
	
	$("#linkBack").html("<a href='" + url.attr("protocol") + "://" + url.attr("host") + url.attr("directory") + "start.html'>generate new quiz</a>");
        $("#quizname").html(quiz.quizname);

	var showQuestions = ("<p><a href='" + linkToQuiz(url,"&questions=yes") + "'>Show Questions</a></p>");
	var showKey = ("<p><a href='" + linkToQuiz(url,"key=yes") + "'>Show Answer Key</a></p>");


        if (questions=="yes") { 
	    $("#questions").html("<h2>Questions</h2>\n" + quiz.formatQuestionsHTML()); 
	} else {
	    $("#questions").html(showQuestions);
	}

        if (key=="yes") { 
	    $("#key").html("<h2>Key</h2>\n" + quiz.formatAnswersHTML());
	} else {
	    $("#key").html(showKey);
	}

}


function buildQuizFromJSON() {

        var url = purl(); //Parse the current URL using the purl library

        var num = url.param("numQuestions");
        var jsonString = url.param("jsonString");
	var questions = url.param("questions");
	var key = url.param("key");
	var showJson = url.param("showJson");

	var seed = determineSeed(url.param("seed"));

	// generate the quiz using the seed

        var quiz = new QuizFromJson(seed,jsonString);

	// TODO: Fill in the parts of the document TODO: Refactor using JQuery instead of long form JavaScript calls
	// TODO: Only fill it in if it is asked for in the URL
	
	$("#linkBack").html("<a href='" + url.attr("protocol") + "://" + url.attr("host") + url.attr("directory") + "startJSON.html'>generate new quiz</a>");
        $("#quizname").html(quiz.quizname);


	var showQuestions = ("<p><a href='" + linkToQuiz(url,"&questions=yes") + "'>Show Questions</a></p>");
	var showKey = ("<p><a href='" + linkToQuiz(url,"key=yes") + "'>Show Answer Key</a></p>");
	var showJsonLink = ("<p><a href='" + linkToQuiz(url,"showJson=yes") + "'>Show JSON</a></p>");


        if (questions=="yes") { 
	    $("#questions").html("<h2>Questions</h2>\n" + quiz.formatQuestionsHTML()); 
	} else {
	    $("#questions").html(showQuestions);
	}

        if (key=="yes") { 
	    $("#key").html("<h2>Key</h2>\n" +  quiz.formatAnswersHTML());
	} else {
	    $("#key").html(showKey);
	}


        if (showJson=="yes") { 
	    $("#json").html("<h2>Json</h2>\n" +  "<textarea id='jsontextarea' rows='10' cols='30'>" + jsonString + "</textarea>");
	} else {
	    $("#json").html(showJsonLink);
	}

}