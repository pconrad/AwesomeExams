

function radixDesc(radix, randomStream)
{
   //var whichWay = randomIndex(2); // returns either 0 or 1
   var whichWay = randomStream.nextIntRange(2)

   if (whichWay == 0)
      return "base " + radix;
      
   switch(radix)
   {
      case 8: return "octal";
      case 16: return "hexadecimal";
      case 2: return "binary";
      case 10: return "decimal";
      default: return "base " + radix;
   }


}

function binHexOctDec(randomStream)
{



   var conversions = [ {fromRad: 10, toRad: 2, minVal: 0, maxVal: 255},
                       {fromRad: 2, toRad: 10, minVal: 0, maxVal: 255},
                       {fromRad: 2, toRad: 8, minVal: 0, maxVal: 511 },
                       {fromRad: 8, toRad: 2, minVal: 0, maxVal: 63 },
                       {fromRad: 2, toRad: 16, minVal: 0, maxVal: 65535},
                       {fromRad: 16, toRad: 2, minVal: 0, maxVal: 65535} ]
    
   

      
      var whichConversion = randomStream.nextIntRange(conversions.length)
      
      var numToConvert = conversions[whichConversion].minVal + randomStream.nextIntRange(conversions[whichConversion].maxVal-conversions[whichConversion].minVal)
 
      
      var fromRad = conversions[whichConversion].fromRad;
      var toRad = conversions[whichConversion].toRad;
    
      
      
      var from = numToConvert.toString(fromRad)
       
      var fromDesc = radixDesc(fromRad, randomStream)
      var toDesc = radixDesc(toRad, randomStream);

      
      var answer = numToConvert.toString(toRad)


    this.formatQuestion = function(format) {

	switch (format) {
	    case "HTML": return this.formatQuestionHTML();
	    }
	    return "unknown format";
    };

    this.formatQuestionHTML = function () {
	    var questionText = "<p>Convert " + from + " from " + fromDesc + " to " + toDesc + ".</p>";
        return questionText;
    };

    this.formatAnswer = function(format) {
        switch (format) {
            case "HTML": return this.formatAnswerHTML();
        }  
        return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswerHTML = function () {
        //var text = String.fromCharCode(this.correctIndex + 97); //0 = 'a', 1 = 'b', 2 = 'c', etc...
        //return text;
        return answer;
    };

};



