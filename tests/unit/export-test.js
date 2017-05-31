import { test, module } from 'qunit';
import XRegExp from 'xregexp';

module('Unit | export xregexp');

test('xregexp exported correctly', function (assert) {
  assert.ok(XRegExp, 'an object was exported');
});

test('common xregexp functions are callable', function (assert) {
  const date = XRegExp(`
    (?<year>  [0-9]{4} ) -?
    (?<month> [0-9]{2} ) -?
    (?<day>   [0-9]{2} )`, 'x');
  const year = XRegExp.exec('2016-02-23', date).year;
  assert.equal(year, '2016', 'named extraction available');
  assert.ok(date.test('2017-02-22'), 'testing works');

  const html =
    `<a href="http://xregexp.com/">XRegExp</a>
     <a href="http://www.google.com/">Google</a>`;
  const results = XRegExp.matchChain(html, [
    { regex: /<a href="([^"]+)">/i, backref: 1 },
    { regex: XRegExp('(?i)^https?://(?<domain>[^/?#]+)'), backref: 'domain' }
  ]);
  assert.equal(results.length, 2, 'chaining works');
});
