$(document).ready(function(){
    $.getJSON("/all", function(data) {
        for (var i = 0; i < data.length; i++) {
        $(".articles").append("<p><h3><a href='" + data[i].link + "' >"  + data[i].title + "</a></h3><br/>" + data[i].byline + "<br/>" + data[i].summary + "</p>");
        }
    });
});