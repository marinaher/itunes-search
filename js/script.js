/*var url = 'http://itunes.apple.com/search?' + params;
var html = '<script src="' + url + '"><\/script>';
$('head').append(html);*/

var userInput = $("input").val;
var url = 'http://itunes.apple.com/search?' + userInput;

/*var request = new XMLHttpRequest();
request.open("GET", "jQuery.js", false);
request.send();
console.log(request);*/