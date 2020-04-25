var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});

router.post('/', function(req, res, next) {
	var personInfo = req.body;

	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){

					User.findOne({},function(err,data){

						if (data) {
						}else{
						}

						var newPerson = new User({
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {

	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){

				req.session.userId = data._id;
				req.session.user = data;
				res.send({"Success":"Success Login!"});
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

router.get('/dashboard', function (req, res, next) {
	console.log("dashboard");
	return res.render('dashboard.ejs', {});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");

	User.findOne({_id:req.session.userId},function(err, userfound){
		if(err) {
			log.info('error occured');
			throw err;
		} 
		req.session.user = userfound;
	return res.render('userdata.ejs', {"name":userfound.username,"email":userfound.email,"password":userfound.password});
	});
});

router.get('/editprofile', function (req, res, next) {
	return res.render('editprofile.ejs');
});

router.post('/editprofile', function (req, res, next) {
	var editInfo = req.body;
	const userId = req.session.userId;
	const user = req.session.user;

		if (editInfo.password == editInfo.passwordConf) {

			if(editInfo.username == "")
			editInfo.username = user.username;

			if(editInfo.email == "")
			editInfo.email = user.email;

			if(editInfo.password == "")
			editInfo.password = user.password;

			User.findOneAndUpdate({_id: userId}, editInfo, 
				{multi:true,new:true}, function(err,data){
					res.send({"Success":"Profile Updated"});
				});			
		
		}else{
			res.send({"Success":"password is not matched"});
		}
	
});

router.get('/deleteaccount', function (req, res, next) {
	return res.render('deleteaccount.ejs');
});

router.post('/deleteaccount', function (req, res, next) {
	const userId = req.session.userId;

	User.findOneAndRemove({_id: userId}, function(err,data){
			res.send({"Success":"Deletion Successful"});
		}).catch((err) => {
			console.log(err);
			res.send({"Success":"Deletion Failed"});
		});				
});

router.get('/userlogout', function (req, res, next) {
	console.log("user logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

module.exports = router;