// NEW-QUESTION-TYPE: add to questionFunctions dictionary below

var questionTypes = {
    "binHexOctDec":          {"f": binHexOctDecQuestion,        title: "Bin Hex Oct Dec"}
};

// To QA a new quesiton type:
//   * Write instructor documentation for question type
//   * Move the js file from questionsDev to questions
//   * Add unit tests for all the code in file
//   * Refactor code to be understandable
//   * Add integration and regression tests for all code in the file
//   * Get code review of question type
//   * Do pull request for question type

// "changeOfBase":          {"f": changeOfBaseQuestion,       title: "Change of Base"},
// "cppFunctionParameters": {"f": cppFunctionParametersQuestion, title: "C++ Function Parameters"},
// "cppAppropriateVariables": {"f": cppAppropriateVariablesQuestion, title: "C++ Variable Types"},
// "cppBooleanEval":        {"f": cppBooleanEvalQuestion,      title: "C++ Boolean Evaluation"},
// "cppArgcArgv":           {"f": cppArgcArgvQuestion,         title: "C++ Command Line Arguments"},
// "cppFunctionOverloading": {"f": cppFunctionOverloadingQuestion, title: "C++ Function Overloading"},
// "cppPointerAssignment":  {"f": cppPointerAssignmentQuestion, title: "C++ Pointer Assignment"},
// "orderOfOperations":     {"f": orderOfOperationsQuestion,   title: "Order of Operations"},
// "operandsAndOperators":  {"f": operandsAndOperatorsQuestion,title: "Operands and Operators"},
// "pythonProgramOutput":   {"f": pythonProgramOutputQuestion, title: "Python Program Output"},
// "pythonStringSlice":     {"f": pythonStringSliceQuestion,   title: "Python String Slice"},
// "symbolicLogic":         {"f": symbolicLogicQuestion,       title: "Symbolic Logic"},
// "CvariableType":         {"f": CvariableTypeQuestion,       title: "C Variable Type"},
// "cStrings":              {"f": cStringsQuestion,            title: "C Strings"},
// "pyStrings":             {"f": pyStringsQuestion,           title: "Python Strings"},


function addOptionForEachQuestionType(e) {
    
    $.each(questionTypes, function(key, val) {
	    e.append($('<option></option>').val(key).html(val.title));
	});
}
