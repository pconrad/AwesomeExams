//A parser for the JSON quiz notation

//Takes an array of "question-generating objects"
//Returns an array of question objects
//Some other code (quiz.js perhaps) will then make the actual question text/html

function parseQuizJSON(quizArray, randomStream)
{
	var questions = [];
	
	//stolen from quiz.js
	var questionFunctions = {
	"changeOfBase":          {"f":changeOfBaseQuestion,        title: "Change of Base"},
	"orderOfOperations":     {"f":orderOfOperationsQuestion,   title: "Order of Operations"},
	"operandsAndOperators":  {"f":operandsAndOperatorsQuestion,title: "Operands and Operators"},
	"pythonProgramOutput":   {"f":pythonProgramOutputQuestion, title: "Python Program Output"},
	"pythonStringSlice":     {"f":pythonStringSliceQuestion,   title: "Python String Slice"},
	"symbolicLogic":         {"f":symbolicLogicQuestion,       title: "Symbolic Logic"},
	"CvariableType":         {"f":CvariableTypeQuestion,       title: "C Variable Type"},
	"cStrings":              {"f":cStringsQuestion,            title: "C Strings"},
	"pyStrings":             {"f":pyStringsQuestion,           title: "Python Strings"}
    };
	
	//Loop through the array of generating objects
	for(var i = 0; i < quizArray.length; ++i)
	{
		var item = quizArray[i];
		
		if("question" in item) //If this object is a question generator
		{
			var questionType = item.question;
			var parameters = (("parameters" in item) ? item.parameters : {});
			var repeat = (("repeat" in item) ? item.repeat : 1);
			
			var questionFunc = ((questionType in questionFunctions) ? questionFunctions[questionType].f : null);
			
			//Generate the specified number of the specified type of question, add them to the array
			if(questionFunc != null)
			{
				for(var j=0; j<repeat; j++)
				{
					questions.push(new questionFunc(randomStream)); //once parameters are implemented, this call will be questionFunc(randomStream, parameters)
				}
			}
		}
		
		if("chooseK" in item)
		{
			var k = item.chooseK;
			var itemsArray = (("items" in item) ? item.items : []);
			var newArray = parseQuizJSON(itemsArray, randomStream); //Recursively parse the array passed to chooseK, which can contain question generators or more chooseK objects
			//After this finishes newArray should consist solely of question objects
			randomStream.shuffle(newArray);
			questions = questions.concat(newArray.slice(0,k)); //Grab the first k elements and add them to the questions array
		}
		
		//More object types to be added here as they are implemented: shuffle, etc...
	}
	
	return questions; 
}
