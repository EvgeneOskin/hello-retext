var fs = require('fs');

var unified = require('unified');
var retext = require('retext');
var report = require('vfile-reporter');
var chalk = require('chalk');

var inspect = require('unist-util-inspect');

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

var text = fs.readFileSync('/dev/stdin').toString()

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
  .use(readability, { age: 16 });  // default age is 16

processor.process(
  text, function (err, file) {
  console.error(report(err || file));
});

var sentimentProcessor = unified()
  .use(english)
  .use(sentiment);


var tree = sentimentProcessor.parse(text);

sentimentProcessor.run(tree, text);

var polarityToColor = new Map()
polarityToColor.set(-5, chalk.red.underline.bold)
polarityToColor.set(-4, chalk.red.underline)
polarityToColor.set(-3, chalk.red.bold)
polarityToColor.set(-2, chalk.red)
polarityToColor.set(-1, chalk.red.dim)
polarityToColor.set(0, chalk.black)
polarityToColor.set(1, chalk.green.dim)
polarityToColor.set(2, chalk.green)
polarityToColor.set(3, chalk.green.bold)
polarityToColor.set(4, chalk.green.underline)
polarityToColor.set(5, chalk.green.underline.bold)

debugger
tree.children.forEach(function (i) {
  if (i.data && i.data.polarity) {
    console.log(polarityToColor.get(i.data.polarity)(String(i)));
  } else {
    console.log(String(i));
  }
})
