var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});

var db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  userName: String,
  id: Number,
  hashPass: String,
  salt: String,
  voteCount: Number
});

var imageSchema = mongoose.Schema({
  id: String,
  userId: Number,
  imageUrl: String,
  caption: String,
  geoLocation: String,
  tags: Array,
  timeStamp: String,
  comments: Array,
  voteCount: Number,
});

// var commentSchema = mongoose.Schema({
//   userId: Number,
//   componentId: Number,
//   imageId: Number
// });

var User = mongoose.model('User', userSchema, 'users');
var Image = mongoose.model('Image', imageSchema, 'images');
// var Comment = mongoose.model('Comment', commentSchema, 'users');

var selectAllImages = (callback) => {
  Image.find({}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

 var selectImages = (callback, query) => {
  Image.find({query}, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

var save = (image) => {
  var newImage = new Image({
    id: image.id,
    userId: image.userId,
    imageUrl: image.link,
    // timeStamp: image.timeStamp,
    geoLocation: null,
    caption: image.description,
    voteCount: 0,
    tags: image.tags,
    // comments: image.comments
  });

 newImage.save(function(err, res) {
    if (err) {
      return err;
    }else{
      return res;
    }
  });

}

// var selectImages = (callback, query) => {
//   Image.find({query}, (err, results) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// }

// var save = () => {
//
// }

module.exports.selectAllImages = selectAllImages;
module.exports.save = save;
