/*
 * Can be tested with the following:
 *
 * var heap = new AEROTWIST.Heap();
 *
 * for(var i = 10; i > 0; i--) {
 *   heap.add(Math.round(Math.random() * 100));
 * }
 *
 * for(var i = 10; i > 0; i--) {
 *   console.log(heap.remove());
 * }
 */

/** Namespace */
var AEROTWIST = AEROTWIST || {};

/**
 * @class Simple max-heap for priority queues and so on.
 *
 * @author Paul Lewis
 */
AEROTWIST.Heap = function() {
  this.items = [];
};

AEROTWIST.Heap.prototype = {

  /**
   * Provides the index of the parent
   *
   * @param {int} index The start position
   */
  parentIndex: function(index) {
    return Math.floor(index * 0.5);
  },

  /**
   * Provides the index of the left child
   *
   * @param {int} index The start position
   */
  leftChildIndex: function(index) {
    return index * 2;
  },

  /**
   * Provides the index of the left child
   *
   * @param {int} index The start position
   */
  rightChildIndex: function(index) {
    return (index * 2) + 1;
  },

  /**
   * Gets the value from a specific position
   * in the heap
   *
   * @param {int} index The position
   */
  get: function(index) {
    var value = null;
    if(index >= 1) {
      value = this.items[index - 1];
    }
    return value;
  },

  /**
   * Sets a value in the heap
   *
   * @param {int} index The position in the heap
   * @param {Float} value The value to set
   */
  set: function(index, value) {
    this.items[index - 1] = value;
  },

  /**
   * Swaps two values in the heap
   *
   * @param {int} indexA Index of the first item to be swapped
   * @param {int} indexB Index of the second item to be swapped
   */
  swap: function(indexA, indexB) {
    var temp = this.get(indexA);
    this.set(indexA, this.get(indexB));
    this.set(indexB, temp);
  },

  /**
   * Sends a value up heap. The item is compared
   * to its parent item. If its value is greater
   * then it's swapped and the process is repeated
   *
   * @param {int} startIndex The start position for the operation
   */
  upHeap: function(startIndex) {

    var startValue  = null,
        parentValue = null,
        parentIndex = null,
        switched    = false;

    do {
      switched      = false;
      parentIndex   = this.parentIndex(startIndex);
      startValue    = this.get(startIndex);
      parentValue   = this.get(parentIndex);
      switched      = parentValue !== null && startValue >= parentValue;

      if(switched) {
        this.swap(startIndex, parentIndex);
        startIndex = parentIndex;
      }

    } while(switched);
  },

  /**
   * Sends a value down heap. The item is compared
   * to its two children item. If its value is less
   * then it's swapped with the <em>highest value child</em>
   * and the process is repeated
   *
   * @param {int} startIndex The start position for the operation
   */
  downHeap: function(startIndex) {

    var startValue      = null,
        leftChildValue  = null,
        rightChildValue = null,
        leftChildIndex  = null,
        rightChildIndex = null,
        switchValue     = null,
        switched        = false;

    do {

      switched          = false;
      leftChildIndex    = this.leftChildIndex(startIndex);
      rightChildIndex   = this.rightChildIndex(startIndex);

      startValue        = this.get(startIndex);
      leftChildValue    = this.get(leftChildIndex) || Number.NEGATIVE_INFINITY;
      rightChildValue   = this.get(rightChildIndex) || Number.NEGATIVE_INFINITY;

      switchValue       = Math.max(leftChildValue, rightChildValue);

      if(startValue < switchValue) {

        if(rightChildValue === switchValue) {
          this.swap(startIndex, rightChildIndex);
          startIndex = rightChildIndex;
        } else {
          this.swap(startIndex, leftChildIndex);
          startIndex = leftChildIndex;
        }

        switched = true;
      }

    } while(switched);

  },

  /**
   * Adds a value to the heap. For now this is just
   * numbers but a comparator function could be used
   * for more complex comparisons.
   *
   * @param {Float} value The value to be added to the heap
   */
  add: function(value) {
    this.items.push(value);
    this.upHeap(this.items.length);
  },

  /**
   * Removes the head of the heap
   */
  remove: function() {
    var value = null;

    // swap with the last child
    // in the heap
    this.swap(1, this.items.length);

    // grab the value and truncate
    // the item array
    value = this.get(this.items.length);
    this.items.length -= 1;

    // push the swapped item
    // down the heap to wherever it needs
    // to sit
    this.downHeap(1);

    return value;
  }
};


//Parameter randomStream should be an instance of the RandomStream class.
function operandsAndOperatorsQuestion(randomStream)
{


  var heap = new AEROTWIST.Heap();
 
  heap.add(3);
  heap.add(5);
  heap.add(1);

  var root = heap.get(1);
  var fiveLeftIndex = heap.leftChildIndex(1);
  var fiveRightIndex = heap.rightChildIndex(1);
  console.log(root);
  console.log(heap.get(fiveLeftIndex));
  console.log(heap.get(fiveRightIndex));


  
  
  console.log("penis");



    //Generate the three variables
    //from randomized array
    var numbers = [1,2,3,4,5,6,7,8,9];
    randomStream.shuffle(numbers);
    var firstNum  = numbers[0].toString();
    var secondNum = numbers[1].toString();
    var thirdNum  = numbers[2].toString();

    //Shuffle the operators
    this.ops = [" + ", " * "];
    randomStream.shuffle(this.ops);
    var firstOperator = this.ops[0];
    var secondOperator = this.ops[1];
    
    //Shuffle for right or left operator question
    //Index 0 is chosen for the question. 
    var rightOrLeftOperand = ["right","left"];
    randomStream.shuffle(rightOrLeftOperand);
    
    var firstOperatorLeftOperand;
    var firstOperatorRightOperand;
    var secondOperatorLeftOperand;
    var secondOperatorRightOperand;
    
    var correct;
    var distract1;
    var distract2;
    var distract3;

	//For LEFT operand question, in either + or * case
	// the answer is always first number
    if(rightOrLeftOperand[0]== "left" )
    {           
	   correct = firstNum;
        //e.x. 2
       distract1 = secondNum + secondOperator + thirdNum;
        //e.x. 4
       distract2 = secondNum;
        //e.x. 5
       distract3 = thirdNum;
    }
    //e.x. 2 + 4 * 5
    else if(firstOperator == " + ")
    {
        firstOperatorLeftOperand = firstNum;
        firstOperatorRightOperand = secondNum + secondOperator + thirdNum;
        secondOperatorLeftOperand = secondNum;
        secondOperatorRightOperand = thirdNum;
         
        //e.x. 4*5
        correct = firstOperatorRightOperand;
        //e.x. 2
        distract1 = firstNum;
        //e.x. 4
        distract2 = secondNum;
        //e.x. 5
        distract3 = thirdNum;
    }
    else
    {
        //e.x. 2 * 4 + 5
        firstOperatorLeftOperand = firstNum;
        firstOperatorRightOperand = secondNum;
        secondOperatorLeftOperand = firstNum + firstOperator + secondNum;
        secondOperatorRightOperand = thirdNum;
        
        //e.x. 4
        correct = firstOperatorRightOperand;
        //e.x. 4+5 
        distract1 = secondNum + secondOperator + thirdNum;
        //e.x. 2
        distract2 = firstNum;
        //e.x. 5
        distract3 = thirdNum;
    }
    
    
    this.answerChoices = [
                    {value: correct,   flag: true},
                    {value: distract1, flag: false},
                    {value: distract2, flag: false},
                    {value: distract3, flag: false} 
                          ];

    randomStream.shuffle(this.answerChoices);

    this.correctIndex;
    for(var i=0; i < this.answerChoices.length; i++)
    {
        if(this.answerChoices[i].flag == true)
        {
            this.correctIndex = i;           
        }
    }
    
    this.formatQuestion = function(format) 
    {
      switch (format) 
      {
         case "HTML": return this.formatQuestionHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };
    
    this.formatQuestionHTML = function () 
    {

	    //Generate the question text
	    var equation = firstNum + firstOperator + secondNum 
	                            + secondOperator + thirdNum;
        var questionText = "<p>What is the " + rightOrLeftOperand[0] + " operand of " + firstOperator;
        questionText += " in the equation: " + equation + "?";

	    //Add the answer options
        questionText += "<p><strong>a) </strong>" 
            + this.answerChoices[0].value + "<br><strong>b) </strong>" 
            + this.answerChoices[1].value + "<br><strong>c) </strong>" 
            + this.answerChoices[2].value + "<br><strong>d) </strong>" 
            + this.answerChoices[3].value + "</p>";

	    return questionText;
    };

    this.formatAnswer = function(format) 
    {
      switch (format) 
      {
         case "HTML": return this.formatAnswerHTML();
      }  
      return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswerHTML = function () 
    {
        //0 = 'a', 1 = 'b', 2 = 'c', etc...
        var text = String.fromCharCode(this.correctIndex + 97); 
        return text;
    };
};
