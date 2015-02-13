//var rs = RandomStream(determineSeed("0x0"));

//QUnit.module("cppUtilities");

QUnit.module( "cppUtilities", {
  setup: function( assert ) {
  }, teardown: function( assert ) {
    assert.ok( true, "teardown successful" );
  }
});

QUnit.test("getRandomReturnType returns an expected value", function(assert) {
  var rs = new RandomStream(determineSeed("0x0"));
  assert.ok(rs != undefined, "able to instance RandomStream");
  assert.equal(rs.nextIntRange(2), 1, "RandomStream works in test");
  var ret = getRandomReturnType(rs);

  assert.ok(ret === "int" || ret === "float" || ret === "double" ||
    ret === "string", "returned expected return type");
});

//QUnit.module("cppAppropriateVariabes");
QUnit.test("cppAppropriateVariablesQuestion returns expected question", function(assert) {
  var rs = new RandomStream(determineSeed("0x0"));
  assert.ok(rs != undefined, "able to instance RandomStream");
  //var q = cppAppropriateVariablesQuestion(rs);
  var q = new CppApproVar(rs);

  assert.ok(q != undefined, "instanced questions" + JSON.stringify(q));
  //var result = q.foo();
  //assert.equal(result, 1, "Test simple function " + result);
  assert.equal(q.formatQuestionHTML(), "", "quiz is correct");
});

//QUnit.module("cppArgcArgv");
QUnit.test("test", function(assert) {
  var rs = new RandomStream(determineSeed("0x0"));
  assert.ok(rs != undefined, "able to instance RandomStream");
  var q = cppArgcArgvQuestion(rs);

  assert.equal(q.formatQuestionsHTML, "", "quiz is correct");
});

//QUnit.module("cppBooleanEval");
QUnit.test("test", function(assert) {
  var rs = new RandomStream(determineSeed("0x0"));
  assert.ok(rs != undefined, "able to instance RandomStream");
  var q = cppBooleanEval(rs);

  assert.equal(q.formatQuestionsHTML, "", "quiz is correct");
});

//QUnit.module("cppFunctionOverloading");
QUnit.test("test", function(assert) {
  var rs = new RandomStream(determineSeed("0x0"));
  assert.ok(rs != undefined, "able to instance RandomStream");
  var q = cppFunctionOverloading(rs);

  assert.equal(q.formatQuestionsHTML, "", "quiz is correct");
});

//QUnit.module("cppFunctionParameters");
QUnit.test("test", function(assert) {
  var rs = new RandomStream(determineSeed("0x0"));
  assert.ok(rs != undefined, "able to instance RandomStream");
  var q = cppFunctionParameters(rs);

  assert.equal(q.formatQuestionsHTML, "", "quiz is correct");
});

//QUnit.module("cppPointerAssignment");
QUnit.test("test", function(assert) {
  var rs = new RandomStream(determineSeed("0x0"));
  assert.ok(rs != undefined, "able to instance RandomStream");
  var q = cppPointerAssignment(rs);

  assert.equal(q.formatQuestionsHTML, "", "quiz is correct");
});
