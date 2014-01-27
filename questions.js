/**
   Model object for an order of operations question

   @author Phill Conrad and Evan Crook
   @version AwesomeNextSteps Jan 2014
*/

//Parameter randomStream should be an instance of the RandomStream class.
function orderOfOperationsQuestion(randomStream)
{
    //Generate the three variables; make them distinct
    var a, b, c;
    a = randomStream.nextIntRange(8) + 2; //generate ints in [0 .. 7] and add 2 to get ints in [2 .. 9]
    do {
        b = randomStream.nextIntRange(8) + 2;
    } while (b == a); //If we generated the same value as a, try again
    do {
        c = randomStream.nextIntRange(8) + 2;
    } while (c == a || c == b); //If we generated the same value as a or b, try again

    //Now, having your three numbers, generate & rander the text of a question involving them.
    this.view = function() {
        
        var header = "<h2>Order of Operations</h2>";

        var ops = [" + ", " * "];
        randomStream.shuffle(ops);
        var questionText = "<p>What is " + a + ops[0] + b + ops[1] + c + "?";

        //Multiple-choice answers
        var answers = [ (a*b + c), (a*(b+c)), (a+(b*c)), ((a+b)*c) ]; //all possible orderings
        randomStream.shuffle(answers);
        var answerText = "<p><strong>a) </strong>" + answers[0] + "<br><strong>b) </strong>" + answers[1] + "<br><strong>c) </strong>" + answers[2] + "<br><strong>d) </strong>" + answers[3] + "</p>";

        window.document.getElementById("questions").innerHTML += header+questionText; 
        window.document.getElementById("answers").innerHTML += answerText;
    }
};

//Questions to generate for CS8 (Python) material -- ideas:

//Give a sample IDLE session, show commands, ask the student to provide what the output would be. 
//(Relatively) easy, because the correct answers can be automatically generated from the questions, by running the commands.

//Write functions given parameters & specifications
//Harder. There may be multiple "right" answers. Does not lend well to multiple-choice.
//Could the user write Python code in a text-box, and this code then be evaluated*, and the results checked?
//*there are issues with this too, of course, such as sanitization


