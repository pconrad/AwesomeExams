
function Quiz(seed,quizDescriptor)
{
    this.seed = seed;

    this.jsonObject = quizDescriptor;

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
function linkToQuiz(url,extraParams,seed) {
    return url.attr("protocol") + "://" 
	+ url.attr("host") + url.attr("directory") 
	+ "quiz.html" + 
	"?seed" + "=" +
	seed.toString(16) +
	"&numQuestions" + "=" 
	+ url.param("numQuestions") +
	"&questionType" + "=" 
	+ url.param("questionType") +
	extraParams;
}

// pass in url returned by purl
function linkToQuizFromJSON(url,extraParams,seed) {
    return url.attr("protocol") + "://" + url.attr("host") + url.attr("directory") + "quizFromJSON.html" + 
	"?seed=" + seed.toString(16) +
	"&jsonString=" + url.param("jsonString") +
	extraParams;
}


function buildQuiz() {

        var url = purl(); //Parse the current URL using the purl library

        var num = url.param("numQuestions");
        var questionType = url.param("questionType");
	var questions = url.param("questions");
	var key = url.param("key");

	var seed = determineSeed(url.param("seed"));
        console.log("seed="+seed)

        var title = ""
        try {
           title = questionsTypes[questionType].title;
        } catch (err) {
           title = "Unknown question type";
        }
    
	// generate the quiz using the seed



        var quizDescriptor = 

    {"version":0.1,
     "title":title,
     "quiz":[{"question":questionType,"repeat":num}]}

	

        var quiz = new Quiz(seed,quizDescriptor);

	// TODO: Fill in the parts of the document TODO: Refactor using JQuery instead of long form JavaScript calls
	// TODO: Only fill it in if it is asked for in the URL
	
	$("#linkBack").html("<a href='" +
			    url.attr("protocol") + 
			    "://" + url.attr("host") + 
			    url.attr("directory") + 
               "start.html'>generate new quiz</a>");
       
        $("#quizname").html(quiz.quizname);

	var showQuestions = ("<p><a href='" + linkToQuiz(url,"&questions=yes",seed) + "'>Show Questions</a></p>");
	var showKey = ("<p><a href='" + linkToQuiz(url,"&key=yes",seed) + "'>Show Answer Key</a></p>");


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

        var jsonString = url.param("jsonString");
	var questions = url.param("questions");
	var key = url.param("key");
	var showJson = url.param("showJson");

	var seed = determineSeed(url.param("seed"));

	// generate the quiz using the seed
        var quizDescriptor = JSON.parse(jsonString);

        var quiz = new Quiz(seed,quizDescriptor);

	// TODO: Fill in the parts of the document TODO: Refactor using JQuery instead of long form JavaScript calls
	// TODO: Only fill it in if it is asked for in the URL
	
	$("#linkBack").html("<a href='" + url.attr("protocol") + "://" + url.attr("host") + url.attr("directory") + "startJSON.html'>generate new quiz</a>");
        $("#quizname").html(quiz.quizname);


	var showQuestions = ("<p><a href='" + linkToQuizFromJSON(url,"&questions=yes",seed) + "'>Show Questions</a></p>");
	var showKey = ("<p><a href='" + linkToQuizFromJSON(url,"&key=yes",seed) + "'>Show Answer Key</a></p>");
	var showJsonLink = ("<p><a href='" + linkToQuizFromJSON(url,"&showJson=yes",seed) + "'>Show JSON</a></p>");


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
