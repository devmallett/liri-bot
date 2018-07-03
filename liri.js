//App logs tweets; Spits Spotify JSON data out (object notattion issues); OMDB call works, will run on spotify call
//Read functionality DNW

//Reads and sets environment variables w/ dotenv package
//Require parameters
require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
const fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


//Declaring new Spotify & Twitter  OA
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Input variables
var commandz = process.argv[2]
var contentName = process.argv[3];

//If statement to distinguish which npm we will; use
function checker() {
    if (commandz == "my-tweets") {
        console.log("Liri tweets: ");
        twitterPart;


    } else if (commandz == "spotify-this-song") {
        console.log("----------------------");
        spotifyMe;
    } else if (commandz == "movie-this") {
        movieUp;

    } else if (commandz == "do-what-it-says") {
        //changes text of doc
        readMe;
    };

};

checker();

//Code fro user twets
//GET method to retrieve tweets using twitter package
var twitterPart = function () {

    var params = {
        screen_name: 'AppLiri'
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        //Looping through JSON tweet data 
        for (var i = 0; i < tweets.length; i++) {
            //Isolate each tweet on TL
            var twit = tweets[i].text;

            //If no error present, print tweet
            if (!error && !contentName) {

                //Prints tweets in stringfy format 
                twit = JSON.stringify(twit, null, 2);
                console.log(twit);


            } else {
                //If error present, prints JSON response to identify 
                //Had trouble authenticating but was able to locate error using this reponse call
                console.log(JSON.stringify(response, null, 2));
            }

        }

        console.log("-------------------------");

    });


};

twitterPart();


// //ET FUNCTION THAT SHOWS FOLLOWING FORMATION : artist(s), song name, song preview via Spotify, ALbum song is from
//Function handles spotify query
var spotifyMe = function () {


    spotify.search({ type: 'track', query: "'" + contentName + "'" }, function (err, data) {
        for (var i = 0; i < 2; i++) {
            if (!err) {

                // console.log(JSON.stringify(data, null, 2));
                console.log("Title of the artist: " + JSON.parse(data).tracks.items.artists[1].name);
                console.log("Title of the artist: " + JSON.parse(data).tracks.items.name[i])

            } else {
                console.log(JSON.stringify(err, null, 2));
            }

        }

    });

}

spotifyMe();

//Function that logs movies 
//Runs on spotify call as well 
function movieUp() {

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + contentName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200 && commandz == "movie-this") {

            // Parse the body of the site and recover just the imdbRating
            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings.Value);
            console.log("Origin Country.: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).English);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("------------------------------------------------");
        }
    });

}
movieUp();

//Function that changes text in document (DNW)

var readMe = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");

        // Loop Through the newly created output array
        for (var i = 0; i < output.length; i++) {

            // Print each element (item) of the array/
            // console.log(output[i]);
        }
    });


};

readMe();


