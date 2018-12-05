var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var multer = require('multer');
var gridfsstorage = require('multer-gridfs-storage');
var grid = require('gridfs-stream');
var methodOverride = require('method-override');

/* var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || '48319';
var mongoUsername = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName; */

var mongoURL = "mongodb://admin:barnesjt05@ds048319.mlab.com:48319/cs290";
var mongoDB = null;

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

let gfs;
let storage;
let upload;

MongoClient.connect(mongoURL, function (err, client) {
    if (err) {
        throw err;
    }
    mongoDB = client.db("cs290");

    gfs=grid(mongoDB, mongo);
    gfs.collection('uploads');

    app.listen(port, function () {
        console.log("== Server listening on port", port);
    });
});

storage = new gridfsstorage({
    url: mongoURL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo ={
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

upload = multer({storage});

app.get('/', function (req, res, next) {
    res.status(200);
    gfs.files.find().toArray( function (err, files) {
        if(!files || files.length===0) {
            res.render('homePage', {files:false});
        } else {
            files.map( function (file) {
                if(file.contentType === 'image/jpeg' || files.contentType === 'image/png')
                {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
                    file.fileType = file.filename.split('.').pop();
            });
            res.render('homePage', {files:files});
        }
    });
});

app.post('/upload', upload.single('file'), function(req, res, next) {
//    res.json({file: req.file});
    res.redirect('/');
});

app.get('/files', function(req, res, next) {
    gfs.files.find().toArray( function (err, files) {
        if(!files || files.length===0) {
            res.status(404).json({ err: 'No files exist' });
            //res.status(404).render('404');
        }
        return res.json(files);
    });
});

app.get('/files/:filename', function(req, res, next) {
    gfs.files.findOne({filename: req.params.filename}, function(err, file){
        if(!file) {
            res.status(404).json({ err: 'No file exists' });
            //res.status(404).render('404');
        }
        return res.json(file);
    });
});

app.get('/image/:filename', function(req, res, next) {
    gfs.files.findOne({filename: req.params.filename}, function(err, file){
        if(!file) {
            res.status(404).render('404');
        }
        if(file.contentType === 'image/jpeg' || file.contentType === 'img/png') {
            var readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ err: 'Not an image '});
        }
    });
});

app.delete('/files/:id', function(req, res, next) {
    gfs.remove({_id: req.params.id, root: 'uploads'}, function (err, gridStore) {
        if(err) {
            return res.status(404).json({ err: err});
        }
        res.redirect('/');
    });
});

app.get('*', function (req, res, next) {
    res.status(404).render('404');
});
