var assert = require('assert');
var fs = require('fs');
var readLine = require('readline');

describe('main.js', function() {

  var Merchant;
  beforeEach(function() {
    Merchant = require('../src/main');
  });

  describe('processLine', function() {
    it('should not understand the input', function() {
      var actual = Merchant.processLine('could a woodchuck chuck if a woodchuck could chuck wood');
      var expected = 'I have no idea what you are talking about';
      assert.equal(actual, expected);
    });

    it('should return expected results for a valid txt', function(done) {
      var Reader = readLine.createInterface({
        input: fs.createReadStream('test/valid.txt'),
        terminal: false
      });

      var count = 0;
      Reader.on('line', function(line) {
        count++;
        var result = Merchant.processLine(line.trim());
        if (count > 8) {
          assert.ok(result);
        } else {
          assert.ifError(result);
        }
      });

      setTimeout(function() {
        done();
      });
    });
  });

  describe('setAssignment', function() {
    it('should return the roman digit assigned given a correct assignment', function() {
      var actual = Merchant.setAssignment(['plep', 'is', 'v']);
      assert.equal(actual, 'v');
    });
    it('should already have conversion', function() {
      var actual = Merchant.setAssignment(['plep', 'is', 'l']);
      assert.equal(actual, 'plep already has a conversion unit');
    });
    it('should have Roman decimal is already assigned', function() {
      var actual = Merchant.setAssignment(['gorj', 'is', 'v']);
      assert.equal(actual, 'v is already assigned');
    });
  });

  describe('setCredit', function() {
    it('should catch invalid currency', function() {
      var actual = Merchant.setCredit('glob glob glob', 'asd');
      var expected = 'Invalid Currency';
      assert.equal(actual, expected);
    });

  });

  describe('convertCurrency', function() {
    it('should return -1 given that there won\'t be no currency to convert', function() {
      var actual = Merchant.convertCurrency([ 'pish', 'tegj', 'glob', 'glob' ]);
      assert.equal(actual, -1);
    });
  });

  describe('answerHowMany', function() {
    it('should inform when there is no unit provided', function() {
      var actual = Merchant.answerHowMany('plunk plakt zum');
      assert.equal(actual, 'No Unit provided');
    });
  });

  describe('answerHowMuch', function() {
    it('should inform when there is no unit provided', function() {
      var actual = Merchant.answerHowMuch('');
      assert.equal(actual, 'Please enter any currency to convert');
    });
  });

});
