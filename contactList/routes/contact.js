var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contact_list');
var router = express.Router();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('We are connected');
});

//create template
var contactSchema = new mongoose.Schema({
  name: String,
  phone_number: String,
  email: String
});


var Contact = mongoose.model('Contact', contactSchema);

/* Creating a contact. */
router.post('/', function(req, res, next) {
  var contact = new Contact(req.body);
  contact.save(function(err, result) { 
    if (err) return console.error(err);
    res.status(201).send(result);
  });
});

/* view contact list */
router.get('/', function(req, res, next) {
  Contact.find(function(err, contact) {
    if (err) return console.error(err);
    res.status(201).send(contact);
  });
});

/* view a contact */
router.get('/:id', function(req, res, next) {
  Contact.findById(req.params.id, function(err, result) {
    if (err) return console.error(err);
        res.status(201).send(result);
  });
});

/* update a contact */
router.put('/:id', function(req, res, next) {
    Contact.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        if (err) return console.error(err);
        res.send('Article successfully udpated.');
    });
});

/* delete a contact */
router.delete('/:id', function(req, res, next) {
    Contact.findByIdAndRemove(req.params.id, function (err) {
        if (err) return console.error(err);
        res.status(201).send(`Article with ${id} successfully deleted.`);
    });
});


module.exports = router;