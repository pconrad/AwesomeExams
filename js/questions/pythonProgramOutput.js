RandomIdentifiers = 
   {
    one: ["foo","bar","baz","fiddle","faddle","bim","bam","quux","snork","snap"],
    two: ["squish","squash","smoot","spiffle","splin","squal","spork","smop","smick","smock"],
    three: ["a","b","c","d","e","moop","minx","mox","mole","f","g"],
    four: ["blarp","squeeble","ranchlaper","drenchlip","tulopulop","porskidor","swamwam"]
  };

function getRandomId(randomStream, num)
{
   var id;
switch(num){
  case 0:
    var index = randomStream.nextIntRange(RandomIdentifiers.one.length);
    id = RandomIdentifiers.one[index];
//    RandomIdentifiers.one.splice(index,1);
    break;
  case 1:
    var index = randomStream.nextIntRange(RandomIdentifiers.two.length);
    id = RandomIdentifiers.two[index];
//    RandomIdentifiers.two.splice(index,1);
    break;
  case 2:
   var index = randomStream.nextIntRange(RandomIdentifiers.three.length);
    id = RandomIdentifiers.three[index];
//    RandomIdentifiers.three.splice(index,1);
    break;
  case 3:
   var index = randomStream.nextIntRange(RandomIdentifiers.four.length);
    id = RandomIdentifiers.four[index];
//    RandomIdentifiers.four.splice(index,1);
    break;
  default:
    break;
}
   return id;
}



function randomIntStatement(randomStream, variable)
{
  var ret = {};
  var constant = randomStream.nextIntRange(10);
  switch(randomStream.nextIntRange(5))
  {
    //add x + 1
    case 0:
      ret.value = variable.value + constant;
      ret.text = variable.text + " + " + constant.toString();
      break;
    //add 1 + x
    case 1:
      ret.value = variable.value + constant;
      ret.text = constant.toString() + " + " + variable.text;
      break;
    //mult c*x
    case 2:
      ret.value = variable.value * constant;
      ret.text = constant.toString() + " * " + variable.text;
      break;
    case 3:
      ret.value = variable.value * constant;
      ret.text = variable.text + " * " + constant.toString();
      break;
    case 4:
      ret.value = variable.value - constant;
      ret.text = variable.text + " - " + constant.toString();
      break;
    //add 1 + x
    case 5:
      ret.value =  constant - variable.value;
      ret.text =  constant.toString() + " - " + variable.text;
    break;
  }
  return ret;
}

function randomComparison(randomStream, var1, var2){
  var ret = {};
  var constant = randomStream.nextIntRange(10);
  //var variable1, variable2;
  switch(randomStream.nextIntRange(6)){
    case 0:    //exp < exp
      var stmt1 = randomIntStatement(randomStream, var1);
      var stmt2 = randomIntStatement(randomStream, var2);
      ret.value = stmt1.value < stmt2.value;
      ret.text = stmt1.text + " < " + stmt2.text;
      break;
    case 1:   //exp < const
      var stmt1 = randomIntStatement(randomStream, var1);
      ret.value = stmt1.value < constant;
      ret.text = stmt1.text + " < " + constant.toString();
      break;
    case 2:    //exp > exp
      var stmt1 = randomIntStatement(randomStream, var1);
      var stmt2 = randomIntStatement(randomStream, var2);
      ret.value = stmt1.value < stmt2.value;
      ret.text = stmt1.text + " < " + stmt2.text;
      break;
    case 3:   //exp > const
      var stmt1 = randomIntStatement(randomStream, var1);
      ret.value = stmt1.value > constant;
      ret.text = stmt1.text + " > " + constant.toString();
      break;
    case 4:    //exp == exp
      var stmt1 = randomIntStatement(randomStream, var1);
      var stmt2 = randomIntStatement(randomStream, var2);
      ret.value = stmt1.value == stmt2.value;
      ret.text = stmt1.text + " == " + stmt2.text;
      break;
    case 5:   //exp == const
      var stmt1 = randomIntStatement(randomStream, var1);
      ret.value = stmt1.value == constant;
      ret.text = stmt1.text + " == " + constant.toString();
      break;
  }
  return ret;
}

function randomIfFunc(randomStream, argument1, argument2, num){
  //alert("in func");
   var func = {};
   var id = getRandomId(randomStream,num); 
 
   var variable1 = {};
   variable1.text = getRandomId(randomStream,2);
   variable1.value = argument1.value;

  var variable2 = {};
   variable2.text = getRandomId(randomStream,3);
   variable2.value = argument2.value;

   var comp = randomComparison(randomStream,variable1,variable2);
 
   var ret1 = randomIntStatement(randomStream, variable1);
   var ret2 = randomIntStatement(randomStream, variable2);
   //alert("comp value = "+comp.value+"  comp text = "+comp.text);
   if (comp.value){
    func.value = ret1.value;
  }
   else{
       func.value = ret2.value;
     }
   func.def = "def " + id + "(" + variable1.text + ", "+ variable2.text+"):\n"
                +"\tif " + comp.text + ":\n"
                 + "\t\treturn " + ret1.text + "\n"
                +"\telse:\n"
                + "\t\treturn "+ret2.text+"\n";
   func.text = id + "(" + argument1.text + ", "+argument2.text+")";
   return func;
}


function randomReturnFunc(randomStream, argument, num)
{
   var func = {};
   var id = getRandomId(randomStream,num); 
 
   var variable = {};
   variable.text = getRandomId(randomStream,2);
   variable.value = argument.value;
 

   var ret = randomIntStatement(randomStream, variable);
   func.value = ret.value
   func.def = "def " + id + "(" + variable.text + "):\n"
                 + "\treturn " + ret.text + "\n\n";
   func.text = id + "(" + argument.text + ")";
   return func;
}

function randomPrintFunc(randomStream, argument, num)
{
   var func = {};
   var id = getRandomId(randomStream,num);

   var variable = {};
   variable.text = getRandomId(randomStream,2);
   variable.value = argument.value;


   var ret = randomIntStatement(randomStream, variable);
   func.value = ret.value
   func.def = "def " + id + "(" + variable.text + "):\n"
                 + "\tprint " + ret.text + "\n\n";
   func.text = id + "(" + argument.text + ")";
   return func;
}

function getRandomVariable (randomStream)
{
  var variable = {};
  variable.text = getRandomId(randomStream,2);
  variable.value = randomStream.nextIntRange(10);
  return variable;
}

//function PythonProgramGenerator2FuncAndPrint(randomStream)
function pythonProgramOutputA(randomStream)
{
	//var programString = '';
        var variable = {};
        variable.value = randomStream.nextIntRange(10);
        variable.text = variable.value.toString();
	var randomFunc1 = randomReturnFunc(randomStream,variable,0);
	var randomFunc2 = randomReturnFunc(randomStream,randomFunc1,1);
	
	this.programString = randomFunc1.def + randomFunc2.def +
	  "print " + randomFunc2.text + "";

  this.correctAnswer = randomFunc2.value

  this.answerChoices = [ {value: randomFunc2.value, flag: true}, 
      {value: randomFunc1.value,
	flag: false},
      {value: randomFunc1.value.toString() + " " + randomFunc2.value, 
	flag: false},
      {value: randomFunc1.value.toString() + "<br>" + randomFunc2.value, 
	flag: false} ]

      this.correctIndex = 0;
    this.answerChoices = this.answerChoices.map(function(arg) { return {"value": ">>> ================================ RESTART ================================<br>"+arg.value + "<br>>>>", "flag": arg.flag }; });
    randomStream.shuffle(this.answerChoices);

    for(var i=0; i<this.answerChoices.length; i++)

    {
         if(this.answerChoices[i].flag == true)
         this.correctIndex = i;           
    }


    this.formatQuestion = function(format) {

        switch (format) {
            case "HTML": return this.formatQuestionHTML();
            }
            return "unknown format";
    };

    this.formatQuestionHTML = function () {
            var questionText = "<p>What is the output of this program?</p><pre>" + this.programString + "</pre>";
    
        questionText += "<p><strong>a) </strong>"
                + this.answerChoices[0].value + "<br><strong>b) </strong>"
                + this.answerChoices[1].value + "<br><strong>c) </strong>"
                + this.answerChoices[2].value + "<br><strong>d) </strong>"
                + this.answerChoices[3].value + "</p>";

        return questionText;
    };

    this.formatAnswer = function(format) {
        switch (format) {
            case "HTML": return this.formatAnswerHTML();
        }  
        return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswerHTML = function () {
        var text = String.fromCharCode(this.correctIndex+97); //0 = 'a', 1 = 'b', 2 = 'c', etc...
        return text;
    };
   
};

function pythonProgramOutputB(randomStream)
{
	//var programString = '';
        var variable1 = {};
	var variable2 = {};
        variable1.value = randomStream.nextIntRange(10);
        variable1.text = variable1.value.toString();
	var randomFunc1 = randomReturnFunc(randomStream,variable1,0);
        variable2.value = randomStream.nextIntRange(10);
        variable2.text = variable2.value.toString();
	var randomFunc2 = randomPrintFunc(randomStream, variable2,1);
	
	this.programString = randomFunc1.def + randomFunc2.def +
	   randomFunc1.text + "\n" + randomFunc2.text + "\n";

  this.correctAnswer =
                randomFunc2.value.toString()

  this.answerChoices = [ {value: randomFunc2.value.toString() , flag: true}, 
      {value: randomFunc1.value.toString(),
	flag: false},
      {value: variable1.value.toString()+"<br>"+variable2.value.toString(),
  flag: false},
      {value: randomFunc1.value.toString() +"<br>"+ randomFunc2.value.toString() + "<br>" + randomFunc2.value.toString(),
  flag: false} ]

      this.correctIndex = 0;
    this.answerChoices = this.answerChoices.map(function(arg) { return {"value": ">>> ================================ RESTART ================================<br>"+arg.value + "<br>>>>", "flag": arg.flag }; });


    randomStream.shuffle(this.answerChoices);

    for(var i=0; i<this.answerChoices.length; i++)

    {
         if(this.answerChoices[i].flag == true)
         this.correctIndex = i;           
    }


    this.formatQuestion = function(format) {

        switch (format) {
            case "HTML": return this.formatQuestionHTML();
            }
            return "unknown format";
    };

    this.formatQuestionHTML = function () {
            var questionText = "<p>What is the output of this program?</p><pre>" + this.programString + "</pre>";
    
        questionText += "<p><strong>a) </strong>"
                + this.answerChoices[0].value + "<br><strong>b) </strong>"
                + this.answerChoices[1].value + "<br><strong>c) </strong>"
                + this.answerChoices[2].value + "<br><strong>d) </strong>"
                + this.answerChoices[3].value + "</p>";

        return questionText;
    };

    this.formatAnswer = function(format) {
        switch (format) {
            case "HTML": return this.formatAnswerHTML();
        }  
        return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswerHTML = function () {
        var text = String.fromCharCode(this.correctIndex+97); //0 = 'a', 1 = 'b', 2 = 'c', etc...
        return text;
    };
   
};

function pythonProgramOutputC(randomStream)
{
  //var programString = '';
        var variable1 = {};
        variable1.value = randomStream.nextIntRange(10);
        variable1.text = variable1.value.toString();
        var variable2 = {};
        variable2.value = randomStream.nextIntRange(10);
        variable2.text = variable2.value.toString();
  var randomFunc1 = randomIfFunc(randomStream,variable1,variable2,0);
        var variable = {};
	variable.value = randomFunc1.value;
	variable.text = getRandomId(randomStream, 2)
//        variable.value = randomStream.nextIntRange(10);
//        variable.text = variable.value.toString();
  var randomFunc2 = randomReturnFunc(randomStream, variable,1);
  

  this.programString = randomFunc1.def + "\n"+ randomFunc2.def +
     variable.text + " = " + randomFunc1.text + "\n"+ "print " + randomFunc2.text + "\n";

  this.correctAnswer = 
		randomFunc2.value.toString();

  this.answerChoices = [ {value: randomFunc2.value.toString(), flag: true}, 
      {value: randomFunc1.value.toString()+"<br>"+randomFunc2.value.toString()+ "<br>"+randomFunc2.value.toString(),
  flag: false},
      {value: (randomStream.nextIntRange(50)-25).toString()+"<br>"+(randomStream.nextIntRange(50)-25).toString(),
  flag: false},
      {value: (randomStream.nextIntRange(50)-25).toString()+"<br>"+(randomStream.nextIntRange(50)-25).toString(),
  flag: false} ]

      this.correctIndex = 0;
    this.answerChoices = this.answerChoices.map(function(arg) { return {"value": ">>> ================================ RESTART ================================<br>"+arg.value + "<br>>>>", "flag": arg.flag }; });

    randomStream.shuffle(this.answerChoices);

    for(var i=0; i<this.answerChoices.length; i++)

    {
         if(this.answerChoices[i].flag == true)
         this.correctIndex = i;           
    }


    this.formatQuestion = function(format) {

        switch (format) {
            case "HTML": return this.formatQuestionHTML();
            }
            return "unknown format";
    };

    this.formatQuestionHTML = function () {
            var questionText = "<p>What is the output of this program?</p><pre>" + this.programString + "</pre>";
    
        questionText += "<p><strong>a) </strong>"
                + this.answerChoices[0].value + "<br><strong>b) </strong>"
                + this.answerChoices[1].value + "<br><strong>c) </strong>"
                + this.answerChoices[2].value + "<br><strong>d) </strong>"
                + this.answerChoices[3].value + "</p>";

        return questionText;
    };

    this.formatAnswer = function(format) {
        switch (format) {
            case "HTML": return this.formatAnswerHTML();
        }  
        return "unknown format"; // TODO: consider exception
    };
    
    this.formatAnswerHTML = function () {
        var text = String.fromCharCode(this.correctIndex+97); //0 = 'a', 1 = 'b', 2 = 'c', etc...
        return text;
    };
   
};


function pythonProgramOutputQuestion(randomStream)
{
  switch(randomStream.nextIntRange(3))
  {
    case 0:
      return new pythonProgramOutputA(randomStream)
    case 1:
      return new pythonProgramOutputB(randomStream)
    case 2:
      return new pythonProgramOutputC(randomStream)
  }
}
