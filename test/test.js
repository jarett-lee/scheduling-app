var assert = require('assert');
// https://mochajs.org/

// TODO finish tests
describe('NotSet', function() {
  it('should fail because the tests aren\'t set up yet', function() {
    assert.equal(0, 1);
  });
});

// hooks
describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function namedFun() {
    // runs before each test in this block
  });

  afterEach('some description', function() {
    // runs after each test in this block
  });

  // test cases
});

// asynchronous hooks
describe('Connection', function() {
  var db = new Connection,
    tobi = new User('tobi'),
    loki = new User('loki'),
    jane = new User('jane');

  beforeEach(function(done) {
    db.clear(function(err) {
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
  });

  describe('#find()', function() {
    it('respond with matching records', function(done) {
      db.find({type: 'User'}, function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});

// simple test
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

// asynchronous test
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        if (err) done(err);
        else done();
      });
    });
  });
});

// promises
describe('#find()', function() {
  beforeEach(function() {
    return db.clear()
      .then(function() {
        return db.save([tobi, loki, jane]);
      });
  });

  it('respond with matching records', function() {
    return db.find({ type: 'User' }).should.eventually.have.length(3);
  });
});
