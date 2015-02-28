QUnit.module( "Project Awesome C++ question unit tests", {
  setup: function( assert ) {
    this.rs = new RandomStream(determineSeed("0x0"));

    assert.ok(this.rs != undefined, "instance RandomStream in module setup");
    assert.equal(this.rs.nextIntRange(2), 1, "expected results from RandomStream in module setup");
  }, teardown: function( assert ) {
    //assert.ok( true, "teardown successful" );
  }
});

QUnit.test("cppUtilities", function(assert) {

    for(var i = 0; i < CppRandomNames.length; ++i)
    {
        var b = cppGetRandomId(this.rs, i);
        assert.ok(CppRandomNames[i].indexOf(b) != -1, "cppGetRandomId() list " + i + " returns expected value");
    }

    var a = cppGetRandomReturnType(this.rs);
    assert.ok(CppRandomReturnTypes.indexOf(a) != -1, "cppGetRandomReturnType() returns expected return type");

    var c = cppGenerateRandomValue(this.rs, 0);
    assert.ok((c >= 0) && (c < 100), "cppGenerateRandomValue() Integer returns expected value");
    c = cppGenerateRandomValue(this.rs, 1);
    assert.ok(c == parseFloat(c).toString(), "cppGenerateRandomValue() Double returns expected value");
    c = cppGenerateRandomValue(this.rs, 2);
    assert.ok(["true", "false"].indexOf(c) != -1, "cppGenerateRandomValue() Boolean returns expected value");
});