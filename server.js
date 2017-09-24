var express = require("express");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var request = require("request");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "news-scraper";
var collections = ["scrapedData"];

// Website to be scraped
var siteURL = "https://techcrunch.com/";

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});


app.get("/scrape", function (req, res) {
    request(siteURL, function(err, response, html) {
      if (err) {
        console.log(err);
      } else {

          //oisgoarnglaeng
          
    }
});
});


app.get("/scrape", function (req, res) {
// Make a request call to grab the HTML body from techcrunch.com
request(siteURL, function(error, response, html) {
    
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);
    
    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("div.block-content").each(function(i, element) {

        var title = $(element).children("h2.post-title").text();
        var byline = $(element).children("div.byline").find("a").text();
        var link = $(element).find("h2.post-title").find("a").attr("href");
        var summary = $(element).children("p.excerpt").text();

        // Save these results in an object that we'll push into the results array we defined earlier
        //if (err) {
        //    console.log(err);
        //} else {
            db.scrapedData.insert({
                title: title,
                byline: byline,
                link: link,
                summary: summary
            }, function (result) {
                res.json(result);
            });

        //}

    });

// Log the results once you've looped through each of the elements found with cheerio
//console.log(results);
});
});