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
    
    if (this.ops[0]==" + ") {
      this.correctAnswer = this.a + this.b * this.c;     
    } else {
      this.correctAnswer = this.a * this.b + this.c;     
    }
    this.answerChoices = [ ( this.a *  this.b   + this.c) , 
			   ( this.a * (this.b   + this.c) ), 
			   ( this.a + (this.b   * this.c) ), 
			   ((this.a +  this.b ) * this.c) ]; //all possible orderings
    randomStream.shuffle(this.answerChoices);
     

    // NOW!  the problem is a this.ops[0] b this.ops[1] c 
   
    //Now, having your three numbers, generate & rander the text of a question involving them.
   
   
    this.formatQuestion = function(format) {
      switch (format) {
         case "HTML": return this.formatQuestionHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswer = function(format) {
      switch (format) {
         case "HTML": return this.formatAnswerHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };


    this.formatQuestionHTML = function () {
        
        var header = "<h2>Order of Operations</h2>";
        var questionText = "<p>What is " + this.a + this.ops[0] + this.b + this.ops[1] + this.c + "?";
        return header+questionText;
    };

    this.formatAnswerHTML = function () {
        return "<p><strong>a) </strong>" 
           + this.answerChoices[0] + "<br><strong>b) </strong>" 
           + this.answerChoices[1] + "<br><strong>c) </strong>" 
           + this.answerChoices[2] + "<br><strong>d) </strong>" 
           + this.answerChoices[3] + "</p>";
    };


};

//Questions to generate for CS8 (Python) material -- ideas:

//Give a sample IDLE session, show commands, ask the student to provide what the output would be. 
//(Relatively) easy, because the correct answers can be automatically generated from the questions, by running the commands.

//Write functions given parameters & specifications
//Harder. There may be multiple "right" answers. Does not lend well to multiple-choice.
//Could the user write Python code in a text-box, and this code then be evaluated*, and the results checked?
//*there are issues with this too, of course, such as sanitization


