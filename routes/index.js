var express = require('express');
var router = express.Router();
/* home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET New User page. */
router.get('/project', function(req, res) {
    res.render('project', { title: 'Add New User' });
});


/*
router.post('/register', function(req, res) {
	
	    var db = req.db;
	    var email = req.body.email;
    var pass = req.body.pass;
	
	var students = db.get('students');
	
	  var query = "SELECT email, pass " +
             "FROM students WHERE email = ?" +
			 "AND pass = ?";
			 
			if (query == null){
				res.send("There was a problem adding the information to the database.");
			}
			
					        else {
            // And forward to success page
            res.redirect("/");
        }
	
	/*students.findOne({email: email, pass: pass}, function(err, doc) {
		if(err){
			res.send("There was a problem adding the information to the database.");
		}
		        else {
            // And forward to success page
            res.redirect("/");
        }
		
	})
});*/

/* new admin - sign up */
router.post('/loginadmin', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var email = req.body.email;
    var pass = req.body.pass;

    // Set our collection
    var students = db.get('students');

    // Submit to the DB
    students.insert({
        "email" : email,
        "pass" : pass
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/");
        }
    });
});

/*
 * login.
 */
router.post('/register', function(req, res) {
    var db = req.db;
	
	    var email = req.body.email;
    var pass = req.body.pass;
	
    var admin = db.get('students');
	
	/*admin.findOne({email: email, pass: pass}, function(err, doc) {
		if(err){
			res.send("There was a problem adding the information to the database.");
		}
		        else {
            // And forward to success page
            res.redirect("/");
        }
		
	});*/
    admin.find({email: email, pass: pass},function(e,docs){
       var result = res.json(docs);
	   
	   	/*for (var i =0; i < result.length; i++){
		var email = result.email;
		console.log(email);*/
		
		if (result.get("email") != null){
			res.redirect("/");
		}
		else{
			res.send("There was a problem adding the information to the database.");
		}
    });
	

});


module.exports = router;
