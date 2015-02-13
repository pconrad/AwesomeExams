var rs = RandomStream(determineSeed("0x0"));

//QUnit.module("cppUtilities");
QUnit.test("getRandomReturnType returns an expected value", function(assert) {
  assert.ok(rs != undefined, "able to instance RandomStream");
  assert.equal(rs.nextIntRange(2), -1, "RandomStream works in test");
  var ret = getRandomReturnType(rs);

  assert.ok(ret === "int" || ret === "float" || ret === "double" ||
    ret === "string", "returned expected return type");
});

//QUnit.module("cppAppropriateVariabes");
QUnit.test("test", function(assert) {
  var rs = RandomStream(determineSeed("0x0"));
  var q = cppAppropriateVariablesQuestion(rs);

  assert.equals(q.formatQuestionsHTML, "", "quiz is correct");
});

//QUnit.module("cppArgcArgv");
QUnit.test("test", function(assert) {
  var rs = RandomStream(determineSeed("0x0"));
  var q = cppArgcArgvQuestion(rs);

  assert.equals(q.formatQuestionsHTML, "", "quiz is correct");
});

//QUnit.module("cppBooleanEval");
QUnit.test("test", function(assert) {
  var rs = RandomStream(determineSeed("0x0"));
  var q = cppBooleanEval(rs);

  assert.equals(q.formatQuestionsHTML, "", "quiz is correct");
});

//QUnit.module("cppFunctionOverloading");
QUnit.test("test", function(assert) {
  var rs = RandomStream(determineSeed("0x0"));
  var q = cppFunctionOverloading(rs);

  assert.equals(q.formatQuestionsHTML, "", "quiz is correct");
});

//QUnit.module("cppFunctionParameters");
QUnit.test("test", function(assert) {
  var rs = RandomStream(determineSeed("0x0"));
  var q = cppFunctionParameters(rs);

  assert.equals(q.formatQuestionsHTML, "", "quiz is correct");
});

//QUnit.module("cppPointerAssignment");
QUnit.test("test", function(assert) {
  var rs = RandomStream(determineSeed("0x0"));
  var q = cppPointerAssignment(rs);

  assert.equals(q.formatQuestionsHTML, "", "quiz is correct");
});
