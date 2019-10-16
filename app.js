//const openssl = require('openssl');
var express = require('express');
const app = express();
var bodyParser = require('body-parser');
var url = require('url');
var cookieParser = require('cookie-parser');
var fs = require('fs');

const start = Date.now(),
    protocol = process.env.PROTOCOL || 'https',
    port = process.env.PORT || '3000',
    host = process.env.HOST || 'localhost';


let server;

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



if ( protocol === 'https' ) {
    console.log("https");
	const { execSync } = require( 'child_process' );
	const execOptions = { encoding: 'utf-8', windowsHide: true };
	let key = './certs/key.pem';
	let certificate = './certs/certificate.pem';
	
	if ( ! fs.existsSync( key ) || ! fs.existsSync( certificate ) ) {
		try {
            console.log("create certificates");
			execSync( 'openssl version', execOptions );
			execSync(
				`openssl req -x509 -newkey rsa:2048 -keyout ./certs/key.tmp.pem -out ${ certificate } -days 365 -nodes -subj "/C=US/ST=Foo/L=Bar/O=Baz/CN=localhost"`,
				execOptions
			);
			execSync( `openssl rsa -in ./certs/key.tmp.pem -out ${ key }`, execOptions );
			execSync( 'del ./certs/key.tmp.pem', execOptions );
		} catch ( error ) {
			console.error( error );
		}
	}

	const options = {
	     key: fs.readFileSync( key ),
	     cert: fs.readFileSync( certificate ),
	     passphrase : 'password'
        };
	server = require( 'https' ).createServer( options,app);
    
} else {
    console.log("http");
    server = require( 'http' ).createServer( app );
}
console.log("Hey everyone");
server.listen( { port, host }, function() {
        console.log("Listening Server");

    // Tell the parent process that Server has booted.
    //sendBootStatus( 'ready' );
} );
//RESETS THE USERDATA:
/*var resetdata = {users:[]};
var resetmeta = {numofusers: 0};
fs.writeFile('userdata.json',JSON.stringify(resetdata),function(err){if(err)throw err; console.log('reset userdata.json')});
fs.writeFile('metadata.json',JSON.stringify(resetmeta),function(err){if(err)throw err; console.log('reset metadata.json')});
*/

app.use(express.static("public"));


app.get('/login',function(req,res){
    let a = req.cookies['userData'];
    let b = testlogin(a);
    if(b==-1){
        res.sendFile('login.html' , { root : __dirname});
    }else{
        res.redirect('/');
    }    
});
app.get('/signup',function(req,res){
      let a = req.cookies['userData'];
    let b = testlogin(a);
    if(b==-1){
        res.sendFile('signup.html' , { root : __dirname});
    }else{
        res.redirect('/');
    }    
});
app.get('/', function (req, res) {
    res.sendFile('index.html' , { root : __dirname});
});
app.get('/usersearch', function (req, res) {
    res.sendFile('usersearch.html' , { root : __dirname});
});
app.get('/userlist',function(req,res){
    let datae = JSON.parse(fs.readFileSync('userdata.json'));
    let data2 = {users:[]};
    for(var i = 0; i<datae.users.length; i++){
        let obj = {}; 
        obj.name=datae.users[i].name;
        obj.slogan=datae.users[i].slogan;
        obj.imgurl=datae.users[i].imgurl;
        data2.users.push(obj);
    }
    res.send(JSON.stringify(data2));
});
app.get('/userslogan',function(req,res){
    let a = req.cookies['userData'];
    console.log(a);
    let b = testlogin(a);
    let ef = {};
    if(b==-1){
        ef.ver = false;
    }else{
        ef.ver = true;
        ef.num = b;
        ef.data = a;
         let datae = JSON.parse(fs.readFileSync('userdata.json'));
        ef.alldata = datae.users[b];
        
    }
    res.send(JSON.stringify(ef));
});
app.post('/signupattempt', function (req, res) {
    console.log(req.body);
    if(req.body!=void(0)&&req.body.username!=null&&req.body.password!=null){
    let data = JSON.parse(fs.readFileSync('userdata.json'));
    let test=-1;
        let lastid = 0;
    for(var k = 0;k<data.users.length;k++){
        if(data.users[k].name==req.body.username){
            test=k;
        }
        lastid = data.users[k].id;
    }
        if(test==-1){
            console.log("NEW USER ALERT");
            data.users.push({name: req.body.username, password: req.body.password, id: (lastid+1), slogan: "howdy", imgurl:"images/face_0.png"});
            let cookuser = {username: req.body.username, password: req.body.password};
            res.cookie("userData",cookuser,{expire: 40000000 + Date.now()});
            res.send("1");
        }else{
            res.send("0");            
            }
    fs.writeFile('userdata.json', (JSON.stringify(data)), function (err) {
    if (err) throw err;
    console.log('Tried to Signup!');
        
    });
    }
});
app.post('/saveusr', function (req, res) {
 console.log('saving user data');
    console.log(req.body);
    
    if(req.body!=void(0)&&req.body.username!=null&&req.body.password!=null){
    let data = JSON.parse(fs.readFileSync('userdata.json'));
    let test=-1;
        let jsone = req.body;
    for(var k = 0;k<data.users.length;k++){
        if(data.users[k].name==jsone.username&&data.users[k].password==jsone.password){
            test=k;
        }
    }
        if(test==-1){
            res.send("ERROR");
        }else{
            data.users[test].slogan=jsone.newslo;
            data.users[test].imgurl=jsone.imgurl;
            res.send("Saved Successfully");            
            }
    fs.writeFile('userdata.json', (JSON.stringify(data)), function (err) {
    if (err) throw err;
    console.log('Tried to Save User!');
        
    });
    }
});

app.post('/getamountusers',function(req,res){
    console.log("getusers");
    let data = JSON.parse(fs.readFileSync('userdata.json'));
    console.log(data.users.length);
    res.send(""+data.users.length);
});
app.post('/loginattempt',function(req,res){
    console.log(req.body);
    if(req.body!=void(0)&&req.body.username!=null&&req.body.password!=null){
        let test = testlogin(req.body);
        if(test==-1){
            console.log("Wrong Log In");
            res.send("0");
        }else{
            let cookuser = {username: req.body.username, password: req.body.password};
            res.cookie("userData",cookuser,{expire: 40000000 + Date.now()});
            //res.redirect('/');
            res.send("1");
             
        }
    }
});
app.post('/logout',function(req,res){
    res.clearCookie('userData');
    res.send("loggedout successfuly");
});

function testlogin(jsone){
    if(jsone==void(0)){
       return -1;
       }
    let data = JSON.parse(fs.readFileSync('userdata.json'));
    let test=-1;
    for(var k = 0;k<data.users.length;k++){
        if(data.users[k].name==jsone.username&&data.users[k].password==jsone.password){
            test=k;
        }
    }
    return test;
}

