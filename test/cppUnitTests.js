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
  assert.ok(this.rs != undefined, "instance RandomStream");

  var ret = getRandomReturnType(this.rs);
  assert.ok(ret === "int" || ret === "float" || ret === "double" ||
    ret === "string", "return expected return type");



});
