/**
   Model object for an order of operations question

   @author Phill Conrad and Evan Crook
   @version AwesomeNextSteps Jan 2014
*/

//Parameter randomStream should be an instance of the RandomStream class.
function orderOfOperationsQuestion(randomStream)
{
    //Generate the three variables
    
    this.a = randomStream.nextIntRange(8) + 2; //generate ints in [0 .. 7] and add 2 to get ints in [2 .. 9]
    this.b = randomStream.nextIntRange(9) + 1; // gen ints in [0..8], add 1 to get 1-9
    this.c = randomStream.nextIntRange(8) + 2; // like a
    
    this.ops = [" + ", " * "];
    randomStream.shuffle(this.ops);
    
    this.correctAnswer = 0;
    
    if (ops[0]==" + ") {
      this.correctAnswer = a + b * c;     
    } else {
      this.correctAnswer = a * b + c;     
    }
    this.answers = [ (a*b + c), (a*(b+c)), (a+(b*c)), ((a+b)*c) ]; //all possible orderings
    randomStream.shuffle(this.answers);
     

    // NOW!  the problem is a ops[0] b ops[1] c 
   
    //Now, having your three numbers, generate & rander the text of a question involving them.
   
   
    this.formatQuestions = function(format) {
      switch (format) {
         case "HTML": return this.formatQuestionsHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswers = function(format) {
      switch (format) {
         case "HTML": return this.formatAnswersHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };


    this.formatQuestionsHTML = function () {
        
        var header = "<h2>Order of Operations</h2>";
        var questionText = "<p>What is " + a + ops[0] + b + ops[1] + c + "?";
        return header+questionText;
    };

    this.formatAnswerHTML = function () {
        return "<p><strong>a) </strong>" 
           + answers[0] + "<br><strong>b) </strong>" 
           + answers[1] + "<br><strong>c) </strong>" 
           + answers[2] + "<br><strong>d) </strong>" 
           + answers[3] + "</p>";
    };


};

//Questions to generate for CS8 (Python) material -- ideas:

//Give a sample IDLE session, show commands, ask the student to provide what the output would be. 
//(Relatively) easy, because the correct answers can be automatically generated from the questions, by running the commands.

//Write functions given parameters & specifications
//Harder. There may be multiple "right" answers. Does not lend well to multiple-choice.
//Could the user write Python code in a text-box, and this code then be evaluated*, and the results checked?
//*there are issues with this too, of course, such as sanitization


