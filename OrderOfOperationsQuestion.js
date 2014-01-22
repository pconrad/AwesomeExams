/**

   Model object for an order of operations question

   @author Phill Conrad and Evan Crook
   @version AwesomeNextSteps Jan 2014


*/



function OrderOfOperationsQuestion(randomStream) {

    /* parameter randomObject should be an instance of the 
       class RandomStream */

    if (! randomStream instanceOf RandomStream ) {
	window.alert("OOOPS!   OrderOfOperationsQuestion needs a RandomStream object as first param"); // TODO: Fix this... this doesn't seem like robust error checking.  Is there a throw/catch thingy? Surely there is...
    }
    

    /* Representing question as a five element array of strings,
       where question[0], question[2] and question[4] are the three
       digits, and question[1] and question[3] are the two operands.
       Is this a good idea? Hell, no!  Its a place to start from. */

    this.question = [0, "",  0, "", 0];  

    /* Ok, that established the object.  But what we really want is 
       three digits from 2 through 9, that are distinct, shoved into
       positions 0,2,4, and we want + and * shoved into positions 1 and 3
       in either order with probability .5.  And we want to ALWAYS
       use the randomStream to get our random choices from.

       Boy, it would be convenient to have a "shuffle" for an array
       that uses our RandomStream. */


 
}
