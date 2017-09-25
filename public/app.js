// function displayResults(scrapedData) {
//     $("tbody").empty();
  
//     scrapedData.forEach(function(scrapedData) {
//       $("tbody").append("<tr><td>" + scrapedData.title + "</td>" +
//                               "<td>" + scrapedData.byline + "</td>" +
//                               "<td>" + scrapedData.link + "</td>" +
//                               "<td>" + scrapedData.summary + "</td></tr>");
//     });
//   }
  
//   function setActive(selector) {
    
//   }
  
//   $.getJSON("/all", function(data) {
//     // Call our function to generate a table body
//     displayResults(data);
//   });
$(document).ready(function(){
    $.getJSON("/all", function(data) {
        for (var i = 0; i < data.length; i++) {
        $(".articles").append("<p data-id='" + data[i].title + "'>" + data[i].link + "<br />" + data[i].summary + "</p>");
        }
    });
});