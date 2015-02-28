QUnit.module( "Project Awesome C++ question regression tests", {
  setup: function( assert ) {
    this.rs = new RandomStream(determineSeed("0x0"));

    assert.ok(this.rs != undefined, "instance RandomStream in module setup");
    assert.equal(this.rs.nextIntRange(2), 1, "expected results from RandomStream in module setup");
  }, teardown: function( assert ) {
    //assert.ok( true, "teardown successful" );
  }
});

QUnit.test("cppAppropriateVariablesQuestion", function(assert) {
  var q = new CppApproVar(this.rs);

  assert.ok(q != undefined, "instance a question");
  assert.equal(q.formatQuestionHTML(), "<p>Which type will store the following statement or literal?</p><pre>24 < 35.39</pre><p><strong>a) </strong>int<br><strong>b) </strong>double<br><strong>c) </strong>char<br><strong>d) </strong>bool</p>", "quiz is correct");
});

QUnit.test("cppArgcArgv", function(assert) {
  var q = new cppArgcArgvQuestion(this.rs);

  assert.ok(q != undefined, "instance a question");
  assert.equal(q.formatQuestionHTML(), "<p>What is the value of argv[2][7] after the following command is typed?</p><pre>./mole blarp squeeble blurgle smop</pre><p><strong>a) </strong>undefined<br><strong>b) </strong>l<br><strong>c) </strong>p<br><strong>d) </strong>e</p>", "quiz is correct");
});


QUnit.test("cppBooleanEval", function(assert) {
  var q = new cppBooleanEvalQuestion(this.rs);

  assert.ok(q != undefined, "instance a question");
  assert.equal(q.formatQuestionHTML(), "<p>What is the final value of 'answer'?</p><pre>bool mole = true;\nbool moop = false;\nint answer;\nif(mole != moop)\n  answer = 91;\nelse\n  answer = 61;\n</pre><p><strong>a) </strong>false<br><strong>b) </strong>91<br><strong>c) </strong>true<br><strong>d) </strong>61</p>", "quiz is correct");
});

QUnit.test("cppFunctionOverloading", function(assert) {
  var q = new cppFunctionOverloadingQuestion(this.rs);

  assert.ok(q != undefined, "instance a question");
  assert.equal(q.formatQuestionHTML(), "<p>Which function signature belongs to the function that is called?</p><pre>int squeeble = 77;\nbool bim = false;\ndouble squish = 76.18;\nbool blurgle = false;\nbool squash = true;\n\nsnork(squash, squeeble, bim, squish, blurgle);</pre><p><strong>a) </strong>void snork(bool spiffle, int blurgle, int baz, double squal, bool tulopulop);<br><strong>b) </strong>bool snork(bool spiffle, bool blurgle, bool baz, double squal, bool tulopulop);<br><strong>c) </strong>int snork(double spiffle, int blurgle, bool baz, double squal, bool tulopulop);<br><strong>d) </strong>int snork(bool spiffle, int blurgle, bool baz, double squal, bool tulopulop);</p>", "quiz is correct");
});

QUnit.test("cppFunctionParameters", function(assert) {
  var q = new cppFunctionParametersQuestion(this.rs);

  assert.ok(q != undefined, "instance a question");
  assert.equal(q.formatQuestionHTML(), "", "quiz is correct");
});

QUnit.test("cppPointerAssignment", function(assert) {
  var q = new cppPointerAssignmentQuestion(this.rs);

  assert.ok(q != undefined, "instance a question");
  assert.equal(q.formatQuestionHTML(), "<p>Based on the following code:</p><pre>int snork = 29;\nint smop = 15;\nint blarp = 91;\nint minx = 19;\nint *faddle = &snork;\nint *spiffle = &smop;\nint *blurgle = &blarp;\nint *mOOp = &minx;\n\nminx = 20;\nsnork = 47;\n(*faddle) = 82;\nfaddle = mOOp;\nsmop = 2;\n</pre>what is the value of smop?</p><p><strong>a) </strong>20<br><strong>b) </strong>91<br><strong>c) </strong>2<br><strong>d) </strong>82</p>", "quiz is correct");
});
