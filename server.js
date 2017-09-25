var express = require("express");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var request = require("request");

// Initialize Express
var app = express();
app.use(express.static("public"));

// Database configuration
var databaseUrl = "news-scraper";
var collections = ["scrapedData"];

// Website to be scraped
var siteUrl = "https://techcrunch.com/";

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/scrape", function (req, res) {
// Make a request call to grab the HTML body from techcrunch.com
    request(siteUrl, function(error, response, html) {
        
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);
        
        $("div.block-content").each(function(i, element) {

            var title = $(element).children("h2.post-title").text();
            var byline = $(element).children("div.byline").find("a").text();
            var link = $(element).find("h2.post-title").find("a").attr("href");
            var summary = $(element).children("p.excerpt").text();

            if (title !== "") {
                db.scrapedData.insert({
                    title: title,
                    byline: byline,
                    link: link,
                    summary: summary
                }, function (result) {
                    res.json(result);
                });
            }    
        });
    });
});

app.get("/all", function(req, res) {
    // Query: In database, go to the scrapedData collection, then "find" everything
    db.scrapedData.find({}, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  });

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});