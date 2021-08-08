let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
function processSinglematch(url) {

    request(url, cb);
}
function cb(error,response,html){
    if(error){
        console.log(error);
    }

    else if (response.statusCode==404) {
        console.log("Page Not Found");
    }

    else{
    dataExtractor(html);
    }
}
 function dataExtractor(html){
     let scoreCard = "";
     let searchTool = cheerio.load(html);
     let bothInningArr = searchTool(".Collapsible");
     for (let i = 0; i < bothInningArr.length; i++) {
        scoreCard = searchTool(bothInningArr[i]).html();
        let teamNameElem = searchTool(bothInningArr[i]).find("h5");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        console.log(teamName);
        let batsManTableBodyAllRows = searchTool(bothInningArr[i]).find(".table.batsman tbody tr");
        for (let j = 0; j < batsManTableBodyAllRows.length; j++) {
            let numberofTds = searchTool(batsManTableBodyAllRows[j]).find("td");
            if (numberofTds.length == 8) {
                // console.log("You are valid")
                let playerName = searchTool(numberofTds[0]).text();
                console.log(playerName);
            }
        }
        console.log("``````````````````````````````````````")
     }
     console.log("--------------------------------------");
     }
    
     module.exports = {
        processSinglematch
    }