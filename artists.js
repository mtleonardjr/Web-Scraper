process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var request = require('request');
var cheerio = require('cheerio');
var nodeMailer = require('nodemailer');
var transporter = nodeMailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user:'webdesignfakemail@gmail.com',
        pass:'fak3password'
    }
});
/*
var inputArray = new Array();
for(var i = 2; i < 10; i++){
    inputArray = process.argv[i]);
}
*/
var artist = String(process.argv[2]);
var artistListed;
var artistList = new Array();
var song;
var songList = new Array();
var foundLocation = new Array();
var emailTitle = 'Your artists are: ';
var emailHead = '<p><b> '+ artist + '</b> ';
var emailBody ='';
var emailTail = '</p>';
var artistFound = true;

//console.log(inputArray[0]);

request('https://www.ranker.com/list/best-rap-songs-2019/ranker-music', function (error, response, html){
    if(!error && response.statusCode == 200){
        var $ = cheerio.load(html);
        $('a.listItem__title').each(function(i,element){
            var song = $(this).text();
            //console.log(song);
            songList[i] = song;
        });
        $('span.listItem__properties').each(function(i,element){
            var artistListed = $(this).text();
            //console.log(artistListed);
            artistList[i] = artistListed;
        });
        for (var i = 0; i < artistList.length; i++){
            if(artistList[i].includes(artist)){
                artistFound = true;
                foundLocation.push(i);
                emailBody = emailBody+', <i> '+songList[i]+'</i>';
            };
        }

        //Subject line creation
        if(artistFound == true){
            emailTitle = emailTitle+artist;
        }

        //Setting up mail options
        var mailOptions = {
            from:'webdesignfakemail@gmail.com',
            to: 'webdesignfakemail@gmail.com',
            subject:emailTitle,
            text: 'test',
            html: emailHead+emailBody+emailTail
        };
        
        if(artistFound == true){
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                console.log(error);
                //res.status(400).send({success: false})
                } else {
                //res.status(200).send({success: true});
                console.log('Email sent!');
                }
            });
        }
          
    }
});



/*
for(var i = 0; i < artistList.length; i ++){
    console.log(artistList[i].text());
}
*/

/*
for (var i = 0; i < artistList.length; i++){
    if(artistList[i].includes("artist")){
        console.log(songList[i])
    };
}
*/

