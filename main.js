let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let request = require("request");
let cheerio = require("cheerio");
let scoreCardObj=require("./scorecard");
request(url,cb)
function cb(error,response,html){
    if(error){
        console.log(error);  //Print the error if occured
    }

    else if (response.statusCode==404) {
        console.log("Page Not Found");
    }

    else{
    // console.log(html); //Print the contents of html of request like in this it will bring homepage HTML of Google
    dataExtractor(html);
    }
}
 function dataExtractor(html){
     //search tool
     let searchtool = cheerio.load(html);
     let allMatches = searchtool('a[data-hover="View All Results"]');
        let link = allMatches.attr("href");
        let fulllink = `https://www.espncricinfo.com${link}`;
        request(fulllink,newcb);
     }
     
 
 function newcb(error,response,html){
    if(error){
        console.log(error);  
    }

    else if (response.statusCode==404) {
        console.log("Page Not Found");
    }

    else{
    getAllScoreCard(html);
    }
}
function getAllScoreCard(html){
    let searchtool = cheerio.load(html);
    let matchbymatch = searchtool('a[data-hover="Scorecard"]');
    for(let i=0;i<matchbymatch.length;i++){
        let link = searchtool(matchbymatch[i]).attr("href");
        let fulllink = `https://www.espncricinfo.com${link}`;
        scoreCardObj.processSinglematch(fulllink);
    }
    
}
