var express = require('express');
var app = express();

var FBBotFramework = require('fb-bot-framework');

// Initialize
var bot = new FBBotFramework({
	page_token: process.env.PAGE_ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('port',(process.env.PORT || 5000));
//app.listen((process.env.PORT || 5000));
app.use('/webhook', bot.middleware());

// Config the Get Started Button and register a callback
bot.setGetStartedButton("GET_STARTED");
bot.on('postback', function(userId, payload){

    if (payload == "GET_STARTED") {
        getStarted(userId);
    }

    // Other postback callbacks here
    // ...

});

function getStarted(userId){
  request(bot.getUserProfile(userId), function(error, response, body) {
    var greeting = "";
    if (error) {
      console.log("Error getting user's name: " +  error);
    } else {
      var bodyObj = JSON.parse(body);
      name = bodyObj.first_name;
        console.log("In payload else name is "+name);
      greeting = "Hi " + name + ". ";
    }
    var message = greeting + "My name is Chottu. I can help you finding tenants, room-mates, home and sharing flats. Tell me about which one you are looking at?";


    bot.setGreetingText(message);
    console.log("Sending msg");

}
