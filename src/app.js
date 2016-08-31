var express=require('express');
var app = express();
var async = require('async');
var wordNet = require('wordnet-magic');
var cors = require('cors');
var wn = wordNet(null, false);

var Crossword = require('./crosswordgenerator').Crossword;
var CrosswordUtils = require('./crosswordgenerator').CrosswordUtils;


var ws;
var searchres;
var arrw=[];
var arrd=[];
var wds=[];
var words=[];
var clues=[];
var temp=[];
var cluehtml=[];

app.use(cors());

app.get('/getusertime', function(req, res) {
	console.log(req.url);
	ws=req.url.substring(20);

	async.series([

		function(callback){

			searchres = new wn.Word(ws,"n");

			searchres.getSynsets(
				function(err, data){

					for (var i = data.length - 1; i >= 0; i--) {

						arrw[i] = data[i].words;
						arrd[i] = data[i].definition;
						
					};

					return callback(null,arrw);
				});  

		},

		function(callback){

			var k=0;
			for (var i = arrw.length - 1; i >= 0; i--) {

				for(var j = arrw[i].length - 1;j >=0; j--){
					
					if(temp.indexOf(arrw[i][j].lemma)>=0)
						continue;
					else{
						var str = arrw[i][j].lemma;
						str = str.replace(/\s+/g, '');
						
						temp.push(str);
						
						words[k] = str;
								
						clues[k] = arrd[i]; 
			
						wds.push({"word":words[k],"def":clues[k]});
						
						k++;

					}
				}

			};

		/*console.log(wds);
		console.log(words.length);
		console.log(clues.length);*/

		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(wds));

},

function(err, results){
	console.log("didn work");

}

]);

});

app.get('/getusertime2', function(req, res) {

    // Create crossword object with the words and clues
    var grid = Crossword(words, clues);
	
	// turn the crossword grid into HTML
    var show_answers = true;

	var x=(CrosswordUtils.toHtml(grid, show_answers));
	
	res.end(x);

});

app.get('/getusertime3', function(req, res) {

	var wnotused = require('./crosswordgenerator').wnotused;
	var x=(wnotused());
	cluehtml=[];
	for (var i = 0; i < x; i++) {
    	cluehtml.push({"ClueNo": i+1,"Value":clues[i]});	
    }
	
    res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(cluehtml));

});

app.listen(1337,'127.0.0.1');