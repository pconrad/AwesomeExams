// NEW-QUESTION-TYPE: add to questionFunctions dictionary below

var questionTypes = {
"changeOfBase":          {"f": changeOfBaseQuestion,       title: "Change of Base"},
"cppFunctionParameters": {"f": cppFunctionParametersQuestion, title: "C++ Function Parameters"},
"cppAppropriateVariables": {"f": cppAppropriateVariablesQuestion, title: "C++ Variable Types"},
"cppBooleanEval":        {"f": cppBooleanEvalQuestion,      title: "C++ Boolean Evaluation"},
"cppArgcArgv":           {"f": cppArgcArgvQuestion,         title: "C++ Command Line Arguments"},
"cppFunctionOverloading": {"f": cppFunctionOverloadingQuestion, title: "C++ Function Overloading"},
"orderOfOperations":     {"f": orderOfOperationsQuestion,   title: "Order of Operations"},
"operandsAndOperators":  {"f": operandsAndOperatorsQuestion,title: "Operands and Operators"},
"pythonProgramOutput":   {"f": pythonProgramOutputQuestion, title: "Python Program Output"},
"pythonStringSlice":     {"f": pythonStringSliceQuestion,   title: "Python String Slice"},
"symbolicLogic":         {"f": symbolicLogicQuestion,       title: "Symbolic Logic"},
"CvariableType":         {"f": CvariableTypeQuestion,       title: "C Variable Type"},
"cStrings":              {"f": cStringsQuestion,            title: "C Strings"},
"pyStrings":             {"f": pyStringsQuestion,           title: "Python Strings"},
"binHexOctDec":          {"f": binHexOctDec,                title: "Bin Hex Oct Dec"}
};

function addOptionForEachQuestionType(e) {
    
    $.each(questionTypes, function(key, val) {
	    e.append($('<option></option>').val(key).html(val.title));
	});
}