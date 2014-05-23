//An interpreter for the QuizJSON notation

//Takes a QuizJSON object (not just the quiz array, as before)
//Returns an array of question objects

//TODO: Sanitize, validate, and otherwise protect against user error.

function interpretQuizJSON(quizObject, randomStream)
{
    var questions = [];
    
    //Loop through the array of generating objects
    for(var i = 0; i < quizObject["quiz"].length; ++i)
	{
	    var item = quizObject.quiz[i];
	    
	    if("question" in item) //If this object is a question generator
		{
		    var questionType = item.question;
		    var parameters = (("parameters" in item) ? item.parameters : {});
		    var repeat = (("repeat" in item) ? item.repeat : 1);
		    
		    var questionFunc = ((questionType in questionTypes) ? questionTypes[questionType].f : null);
		    
		    //Generate the specified number of the specified type of question, add them to the array
		    if(questionFunc != null)
			{
			    for(var j=0; j<repeat; j++)
				{
				    questions.push(new questionFunc(randomStream)); //once parameters are implemented, this call will be questionFunc(randomStream, parameters)
				}
			}
		}
	    
		//Allows you to provide an array of question-generating objects (just like a quiz) to generate n questions
		//and choose k of those n at random.
	    if("chooseK" in item)
		{
		    var k = item.chooseK;
		    var itemsArray = (("items" in item) ? item.items : []);
		    var newArray = interpretQuizJSON(itemsArray, randomStream); //Recursively parse the array passed to chooseK
		    //After this finishes newArray should consist solely of question objects
		    
		    randomStream.shuffle(newArray);
		    questions = questions.concat(newArray.slice(0,k)); //Grab the first k elements and add them to the questions array
		}

		//Allows you to shuffle a list of questions.
		//Essentially equivalent to a chooseK where K is the total number of questions generated,
		//but this is a little clearer and nicer than having to use that trick.
		if("shuffle" in item)
		{
		    var itemsArray = (("items" in item) ? item.items : []);
		    var newArray = interpretQuizJSON(itemsArray, randomStream);
		    
		    randomStream.shuffle(newArray);
		    questions = questions.concat(newArray);		
		}
	    
	    
	}
    
    return questions; 
}

//you'll notice it's possible for a user to put, say, a "shuffle" field in a "question" object
//in this case, if they didn't put an "items" field in, it just does nothing and acts like a normal question object.
//that's cool, though, because those questions will be by default shuffled/random order anyway, so they should get what they wanted.

//It's also possible to put "shuffle" or "chooseK" with a valid items list in the same object as a regular "questions" object.
//in this case that object will just do both functions at once. perhaps bad practice on their part (things should be specific and all),
//but it shouldn't present any problems here.
