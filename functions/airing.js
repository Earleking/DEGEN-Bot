const host = process.env.ANIME_HOST;
const request = require('request');
var run = function(msg, args) {
    var curMonth = new Date().getMonth();
    var curSeason = "";
    if(curMonth < 4)
        curSeason = "winter";
    else if(curMonth < 7)
        curSeason = "spring";
    else if(curMonth < 10)
        curSeason = "summer";
    else
        curSeason = "fall";

    var uri = host + "/edge/anime?sort=popularityRank&";
    // No season specified
    if(args.length == 0) {
        uri += "filter[season]=" + curSeason + "&filter[seasonYear]=" + new Date().getFullYear();
    }
    if(args.length >= 1) {
        uri += "filter[season]=" + args[0].toLowerCase();
        if(args.length >= 2) {
            uri += "&filter[seasonYear]=" + args[1];
        }
        else {
            uri += "&filter[seasonYear]=" + new Date().getFullYear();
        }
    }
    
    console.log(uri);
    request.get(uri, (err, res, data) => {
        data = JSON.parse(data);
        var airing = data.data;
        if(airing.length == 0) {
            msg.send("No airing anime for the selected season");
        }
        else {
            
        }
    });
}

module.exports = run;