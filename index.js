var retext = require('retext');
var report = require('vfile-reporter');

var simplify = require('retext-simplify');
var english = require('retext-english');
var equality = require('retext-equality');
var cliches = require('retext-cliches');
var indefiniteArticle = require('retext-indefinite-article');
var overuse = require('retext-overuse');
var passive = require('retext-passive');
var repeated = require('retext-repeated-words');
var readability = require('retext-readability');
var profanities = require('retext-profanities');
var sentiment = require('retext-sentiment');
var usage = require('retext-usage');
var spell = require('retext-spell');
var dictionary = require('dictionary-en-us');
var spacing = require('retext-sentence-spacing');

var processor = retext()
  .use(english)
  .use(spell, dictionary)
  .use(passive)
  .use(cliches)
  .use(simplify)
  .use(spacing)
  .use(equality)
  .use(indefiniteArticle)
  .use(overuse)
  .use(profanities)
  .use(repeated)
  .use(sentiment)
  .use(usage)
  .use(readability, { age: 16 })  // default age is 16
  .process(
  'Go away😠. ' +
  'You can use cliches until the until the cows come home. ' +
  'Hey guys, utilize a shorter word.', function (err, file) {
    console.log(String(file));
    console.error(report(err || file));
  });
