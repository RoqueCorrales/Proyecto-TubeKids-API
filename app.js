const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/api');
const User = require('./models/userModel');
const Video = require('./models/videoModel');
const Profile = require('./models/profileModel');
const app = express();
const cors = require('cors');
var md_auth = require('../Proyecto-TubeKids-API/middleware/authenticate');

const http = require("http");
const server = http.createServer(app);
const tokenList = {};
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//configurar cabeceras http
//app.use((req, res, next)=> {
//res.header('Access-Control-Allow-Origin','*');
//res.header('Acccess-COntrol-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
//res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT, DELETE');
//res.header('Allow','GET,POST,OPTIONS,PUT, DELETE');

//next();
//});



var UserCTRL = require('./controllers/userController');
var VideoCTRL = require('./controllers/videoController');
var ProfileCTRL = require('./controllers/profileController');
var LoginController = require('./controllers/loginController');
var PlaylistCTRL = require('./controllers/playlistController');

app.set('view engine', 'pug');
// this is where we can put the public contents like css and js files
app.use(express.static(__dirname + '/public'));



app.get('/', (request, response) => {
    //connect to db and get data
    response.render('index', {
        title: 'Main Title',
        content: 'The content of the page'
    })
});

//API ROUTES LOGIN

var login = express.Router();

login.route('/login')
.post(LoginController.findUserUsername);


app.use('/api', login);


//API ROUTES USER

var user = express.Router();

user.route('/users')
.get(md_auth.ensureAuth, UserCTRL.findAllUsers)
.post(UserCTRL.addUser);

user.route('/users/:id')
.get(md_auth.ensureAuth,UserCTRL.findById)
.put(md_auth.ensureAuth,UserCTRL.updateUser)
.delete(md_auth.ensureAuth,UserCTRL.deleteUser);

user.route('/users/confirmationEmail/:id')
.put(UserCTRL.updateUserConfirmation)
app.use('/api', user);


//API ROUTES PROFILE

var profile = express.Router();

profile.route('/profiles')
.get(md_auth.ensureAuth,ProfileCTRL.findAllProfiles)
.post(md_auth.ensureAuth,ProfileCTRL.addProfile);

profile.route('/profiles/:id')
.get(md_auth.ensureAuth,ProfileCTRL.findById)
.put(md_auth.ensureAuth,ProfileCTRL.updateProfile)
.delete(md_auth.ensureAuth,ProfileCTRL.deleteProfile);


app.use('/api', profile);

//API ROUTES VIDEO

var video = express.Router();

video.route('/videos')
.get(md_auth.ensureAuth,VideoCTRL.findAllVideos)
.post(md_auth.ensureAuth,VideoCTRL.addVideo);

video.route('/videos/:id')
.get(md_auth.ensureAuth,VideoCTRL.findById)

.put(md_auth.ensureAuth,VideoCTRL.updateVideo)
.delete(md_auth.ensureAuth,VideoCTRL.deleteVideo);


app.use('/api', video);
//API ROUTES PLAYLIST

var playlist = express.Router();

playlist.route('/playlists')
.get(md_auth.ensureAuth, PlaylistCTRL.findAllPlaylists)
.post(md_auth.ensureAuth,PlaylistCTRL.addPlaylist);

playlist.route('/playlists/:id')
.get(md_auth.ensureAuth,PlaylistCTRL.findById)
.put(md_auth.ensureAuth,PlaylistCTRL.updatePlaylist)
.delete(md_auth.ensureAuth,PlaylistCTRL.deletePlaylist);

app.use('/api', user);




// handle 404
app.use(function(req, res, next){
    res.status(404);
    res.send({ error: 'Not found' });
    return;
});


app.listen(3000, () => console.log('API is listening on port 3000!'));