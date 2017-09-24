var cheerio = require("cheerio");
var request = require("request");

// Make a request call to grab the HTML body from the site of your choice
request("https://techcrunch.com/", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("div.block-content").each(function(i, element) {

    var title = $(element).children("h2.post-title").text();
    var byline = $(element).children("div.byline").find("a").text();
    var link = $(element).find("h2.post-title").find("a").attr("href");
    var summary = $(element).children("p.excerpt").text();

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      by: byline,
      link: link,
      summary: summary
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});