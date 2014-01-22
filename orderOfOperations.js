//Generate problems of type "a*b + c" or "a + b*c"
//It must be the case that if OoO is applied incorrectly (addition performed before multiplication), the answer is different from the correct version
//which only occurs when the "outer term" (whichever b is multiplied by) is 1.

function generateOrderOfOperationsQuestion()
{
    alert("test");

    //Make an RNG
    var r = new RandomStream(0x123456789ABC);

    alert("test 2");

    //Generate the three variables; make them distinct
    //var a, b, c;
    //a = r.nextIntRange(8) + 2; //generate ints in [0 .. 7] and add 2 to get ints in [2 .. 9]
    //do {
    //    b = r.nextIntRange(8) + 2;
    //} while b == a; //If we generated the same value as a, try again
    //do {
    //    c = r.nextIntRange(8) + 2;
    //} while (c == a || c == b); //If we generated the same value as a or b, try again

    //document.write("a: ", a, " b: ", " c: ", c);
}


