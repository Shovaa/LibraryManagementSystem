const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const cors = require("cors");
var app = express();
var moment = require("moment");
var jwt = require("jsonwebtoken");



var async = require("async"); 


//var datetime = require('node-datetime');
app.use(cors());
//Configuring express server
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//MYSQl connection and details
var mysqlConnection = mysql.createConnection({
	host: "127.0.0.1",
	port: "3306",
	user: "root",
	password: "shova",
	database: "book",
	insecureAuth: true,
	multipleStatements: true
});


//for atuh
app.use((req,res,next)=>{
	try{
		const token = req.headers.authorization.split(" ")[1]
		console.log(token)
		jwt.verify(token, "secret...shh", function(err, payload){
			console.log(payload)
			if (payload){
				mysqlConnection.query("SELECT * FROM users where email = '" + payload.email + "'", (err, rows, fields) => {
					if (err) throw err;
					if (rows && rows.length > 0){
						req.user = rows[0];
						console.log('vhiya')
						console.log(req.user)
						next();
					}
				});

				mysqlConnection.query("SELECT * FROM superusers where Name = '" + payload.email + "'", (err, rows, fields) => {
					if (err) throw err;
					if (rows && rows.length > 0){
						req.user = rows[0];
						console.log('vhiya')
						console.log(req.user)
						next();
					}
				});
			}
			else{
				next();
			}
		})
	}
	catch(e){
		next();
	}
})

app.post("/login", (req, res,next)=>{
	mysqlConnection.query("SELECT * FROM users where email = '" + req.body.email + "'", (err, rows, fields) => {
		if (err) throw err;
		if (rows && rows.length > 0){
			if(req.body.pass === rows[0].password){
				var token = jwt.sign({email:rows[0].email}, "secret...shh");
				res.status(200).json({
					email:rows[0].email,
					name: rows[0].name,
					token
				})
				console.log(rows[0])
			}
			else{
				res.json({error:2})
			}
		}
		else{
			res.json({error:1})
		}
	});
})


app.post("/tchrlogin", (req, res,next)=>{
	console.log("hello")

	mysqlConnection.query("SELECT * FROM superusers where Name = '" + req.body.email + "'", (err, rows, fields) => {
		if (err) throw err;
		if (rows && rows.length > 0){
			if(req.body.pass === rows[0].Password){
				console.log("password matched")
				var token = jwt.sign({email:rows[0].Name}, "secret...shh");
				res.status(200).json({
					email:rows[0].Name,
					isadmin: rows[0].isadmin,
					token
				})
				console.log(rows[0])
			}
			else{
				res.json({error:2})
			}
		}
		else{
			res.json({error:1})
		}
	});
})


app.post("/getstudentdata", function(req, res){
	console.log('Angel');
	console.log(req.user)

	console.log(Object.values(req.user));
	res.json(Object.values(req.user))
})
app.get("/getspecificstudentdata", function(req, res){
	var user_id = req.param("rolls");
	console.log(user_id);
	console.log('angellllll');
	mysqlConnection.connect(function() {
		
			var Getdata =	"SELECT name,rollno,address,contactnum FROM `book`.`users` WHERE rollno = '" +user_id +"'";
			mysqlConnection.query(Getdata,function (err, rows) {
				if (!err){ 
					console.log(rows);
					res.json(rows);
				}
			});
})
	})
app.post("/changepassword", function(req, res){
	console.log(req.user.password);
	if(req.body.Current==req.user.password){
		var ChangepwQuery="UPDATE `users` SET `password`='"+req.body.New+"' Where `rollno`='"+req.user.rollno+"'";
		mysqlConnection.query(ChangepwQuery,function(err,rows){
			if(!err){
				res.send('Password Changed');
			}
		})
	}
	else{
		res.send('Current Error');
	}
})






























mysqlConnection.connect(err => {
	if (!err) console.log("Connection Established Successfully");
	else console.log("Connection Failed" + JSON.stringify(err, undefined, 2));
});


app.get("/addbooks", (req, res) => {
	mysqlConnection.query("SELECT * FROM book_details", (err, rows, fields) => {
		if (!err) res.send(rows);
		else console.log(err);
	});
});


//adding
app.post("/addbooks", function(req, res) {

	console.log(req.body.Barcode);
	console.log(req.body.ISBN);
	console.log(req.body.Title);
	console.log(req.body.Author);
	console.log(req.body.Publication);
	console.log(req.body.Quantity);
	mysqlConnection.connect(function() {
		console.log('Add url hit');
		var update =
			"SELECT EXISTS (SELECT ISBN FROM `book_details` WHERE `ISBN`= " +
			req.body.ISBN +
			")";
		mysqlConnection.query(update, function(err, results, fields) {
			if (err) throw err;
			else {
				var values = Object.values(results);
				for (var value of values) {
					console.log(Object.values(value));
					txt = "";
					numbers = Object.values(value);
					numbers.forEach(myFunction);

					function myFunction(val, index, array) {
						txt = txt + val;

						console.log(txt);

						if (txt == 0) {
							console.log(txt);
							var sql =
								"INSERT INTO `book`.`book_details` (`ISBN`, `Title`, `Author`,`Publication`,`Quantity`,`Type`,`Available_Quantity`) VALUES ( " +
								req.body.ISBN +
								",'" +
								req.body.Title +
								"', '" +
								req.body.Author +
								"','" +
								req.body.Publication +
								"'," +
								req.body.Quantity +
								",'" +
								req.body.Type +
								"'," +
								req.body.Quantity +
								")";
							mysqlConnection.query(sql, function(err, result) {
								if (err) throw err;
								else console.log("1 record inserted");
							});
							var b = req.body.Quantity;
							var c = req.body.Barcode;
							c = parseInt(c);
							b = parseInt(b);
							for (var i = 0; i < b; i++) {
								// console.log(i, b, c);
								var d = i + c;
								console.log(d);
								var list =
									"INSERT INTO `book`.`book_list` (`ISBN`,`Barcode`) VALUES (  " +
									req.body.ISBN +
									"," +
									d +
									")";
								mysqlConnection.query(list, function(err, result) {
									if (err) throw err;
								});
							}
						}
						//updating
						else {
							console.log("s");
							var book =
								"SELECT Quantity FROM `book_details` WHERE `ISBN`= " +
								req.body.ISBN +
								"";
							mysqlConnection.query(book, function(err, result) {
								if (err) throw err;
								else console.log(result);
								var values = Object.values(result);
								for (var value of values) {
									console.log(Object.values(value));
									txt = "";
									numbers = Object.values(value);
									numbers.forEach(myFunction);

									function myFunction(val, index, array) {
										txt = txt + val;

										console.log(txt);
									}
								}

								var b = req.body.Quantity;
								b = parseInt(b);
								txt = parseInt(txt);
								x = txt + b;
								var sql =
									"UPDATE  `book`.`book_details` SET `QUANTITY`=(" +
									x +
									")  WHERE `ISBN`=" +
									req.body.ISBN +
									" ";
								mysqlConnection.query(sql, function(err, result) {
									if (err) throw err;
									else console.log(" record updated ");
								});
							});
							var q = req.body.Quantity;
							var c = req.body.Barcode;
							c = parseInt(c);
							q = parseInt(q);
							var bar =
								"SELECT `Barcode` FROM `book`.`book_list` WHERE ISBN=" +
								req.body.ISBN +
								"";
							mysqlConnection.query(bar, function(err, val, fields) {
								if (err) throw err;
								else console.log(val);
								console.log([val.pop()]);
								p = [val.pop()];
								var values = Object.values(p);
								for (var value of values) {
									console.log(Object.values(value));
									barcode = "";
									ns = Object.values(value);
									//console.log(ns);
									ns.forEach(myFunction);

									function myFunction(val, index, array) {
										//  barcode=parseInt(barcode);
										barcode = barcode + val;

										console.log(barcode);

										var q = req.body.Quantity;
										q = parseInt(q);
										var u = q + 1;
										barcode = parseInt(barcode);
										for (var i = 2; i <= u; i++) {
											//i = parseInt(i);
											var f = i + barcode;
											console.log(f);
											var list =
												"INSERT INTO `book`.`book_list` (`ISBN`,`Barcode`) VALUES (  " +
												req.body.ISBN +
												"," +
												f +
												")";
											mysqlConnection.query(list, function(err, result) {
												if (err) throw err;
											});
										}
									}
								}
							});
						}
					}
				}
			}
		});
	});
	res.send("Record inserted");
});
app.get("/", function(req, res) {
	res.send("hello world");
});
app.post("/deletebooks", function(req, res) {
	console.log(req.body.ISBN);
	console.log(req.body.Quantity);
	console.log(req.body.barcodes);
	y = req.body.Quantity;
	mysqlConnection.connect(function() {
		var book =
			"SELECT Quantity FROM `book_details` WHERE `ISBN`= (" + req.body.ISBN + ")";
		mysqlConnection.query(book, function(err, result) {
			if (err) throw err;
			else console.log(result);
			var values = Object.values(result);
			for (var value of values) {
				console.log(Object.values(value));
				txt = "";
				numbers = Object.values(value);
				numbers.forEach(myFunction);

				function myFunction(val, index, array) {
					txt = txt + val;

					console.log(txt);
				}
			}

			if (txt != req.body.Quantity) {
				an = req.body.Quantity;
				an = parseInt(an);
				txt = parseInt(txt);
				ca = txt - an;
				console.log('abs');
				console.log(ca);
				var TotalQuantityQuery = "SELECT `Available_Quantity` FROM `book`.`book_details` WHERE `ISBN`= ("+req.body.ISBN+" )";
		mysqlConnection.query(TotalQuantityQuery,function(err,results,fields){
			if(!err)
			console.log(results);

			console.log(results[0].Available_Quantity);
			var Qty= results[0].Available_Quantity;
			parseInt(Qty);
			decreaseQty= Qty - an;
			console.log(ca);
			console.log(decreaseQty);
			parseInt(ca);
			parseInt(decreaseQty);
				var del =
					"UPDATE `book`.`book_details` SET `QUANTITY`=(" +ca+ ")  WHERE `ISBN`= (" +req.body.ISBN + ")";
				mysqlConnection.query(del, function(err, results, fields) {
					if (err) throw err;
				});
				var dele =
					"UPDATE `book`.`book_details` SET `Available_Quantity`=(" +decreaseQty+ ")  WHERE `ISBN`= (" +req.body.ISBN + ")";
				mysqlConnection.query(dele, function(err, results, fields) {
					if (err) throw err;
				});
			})
				var bar =
					"SELECT `Barcode` FROM `book`.`book_list` WHERE ISBN=" +
					req.body.ISBN +
					"";
				mysqlConnection.query(bar, function(err, val, fields) {
					if (err) throw err;
					else console.log(val);
					//  ress = req.body.barcodes;

					var tttt = val;
					var al = Object.values(tttt);
					for (var value of al) {
						console.log(Object.values(value));
						r = "";
						nu = Object.values(value);
						nu.forEach(myFunction);

						function myFunction(val, index, array) {
							r = r + val;

							//   console.log(r);

							let rss = req.body.barcodes;
							// console.log(rss);
							var yu = Object.values(rss);
							for (var ut of yu) {
								console.log(Object.values(ut));
								e = "";
								oo = Object.values(ut);
								oo.forEach(myFunc);
								function myFunc(ang, index, array) {
									e = e + ang;

									if (e == r) {
										var qqq = req.body.Quantity;

										var bd =
											"DELETE FROM `book`.`book_list` WHERE `ISBN`=(" +  req.body.ISBN + ") AND `Barcode` = (" +e+")";
										mysqlConnection.query(bd, function(err, results, fields) {
											if (err) throw err;
										});
									}
								}
							}
						}
					}
				});
			} else {
				var del =
					"DELETE FROM `book`.`book_details` WHERE `ISBN`= (" +
					req.body.ISBN +
					")";
				mysqlConnection.query(del, function(err, results, fields) {
					if (err) throw err;
					var dele =
						"DELETE FROM `book`.`book_list` WHERE `ISBN`= (" +
						req.body.ISBN +
						")";
					mysqlConnection.query(dele, function(err, results, fields) {
						if (err) throw err;
					});
				});
			}
		});
	});
	res.send("Record deleted");
});
app.post("/updatebooks", function(req, res) {
	var book =
		"SELECT Quantity FROM `book_details` WHERE `ISBN`= " + req.body.ISBN + "";
	mysqlConnection.query(book, function(err, result) {
		if (err) throw err;
		else console.log(result);
		var values = Object.values(result);
		for (var value of values) {
			console.log(Object.values(value));
			txt = "";
			numbers = Object.values(value);
			numbers.forEach(myFunction);

			function myFunction(val, index, array) {
				txt = txt + val;

				console.log(txt);
			}
		}

		var b = req.body.Quantity;
		b = parseInt(b);
		txt = parseInt(txt);
		x = txt + b;
		var sql =
			"UPDATE  `book`.`book_details` SET `QUANTITY`=(" +
			x +
			") WHERE `ISBN`=" +
			req.body.ISBN +
			" ";
		mysqlConnection.query(sql, function(err, result) {
			if (err) throw err;
			else console.log(" record updated ");
		});
		var TotalQuantityQuery = "SELECT Available_Quantity FROM `book`.`book_details` WHERE ISBN="+req.body.ISBN+"";
		mysqlConnection.query(TotalQuantityQuery,function(err,results,fields){
			if(!err)
			console.log(results);

			console.log(results[0].Available_Quantity);
			var Qty= results[0].Available_Quantity;
			parseInt(Qty);
			IncrQty= Qty + b;
			var sql =
			"UPDATE  `book`.`book_details` SET `Available_Quantity`=(" +
			IncrQty +
			") WHERE `ISBN`=" +
			req.body.ISBN +
			" ";
		mysqlConnection.query(sql, function(err, result) {
			if (err) throw err;
			else console.log(" record updated ");
		});
	});
	});
	var q = req.body.Quantity;
	var c = req.body.Barcode;
	c = parseInt(c);
	q = parseInt(q);
	var bar =
		"SELECT `Barcode` FROM `book`.`book_list` WHERE ISBN=" + req.body.ISBN + "";
	mysqlConnection.query(bar, function(err, val, fields) {
		if (err) throw err;
		else console.log(val);
		console.log([val.pop()]);
		p = [val.pop()];
		var values = Object.values(p);
		for (var value of values) {
			console.log(Object.values(value));
			barcode = "";
			ns = Object.values(value);
			//console.log(ns);
			ns.forEach(myFunction);

			function myFunction(val, index, array) {
				//  barcode=parseInt(barcode);
				barcode = barcode + val;

				console.log(barcode);

				var q = req.body.Quantity;
				q = parseInt(q);
				var u = q + 1;
				barcode = parseInt(barcode);
				for (var i = 2; i <= u; i++) {
					//i = parseInt(i);
					var f = i + barcode;
					console.log(f);
					var list =
						"INSERT INTO `book`.`book_list` (`ISBN`,`Barcode`) VALUES (  " +
						req.body.ISBN +
						"," +
						f +
						")";
					mysqlConnection.query(list, function(err, result) {
						if (err) throw err;
					});
				}
			}
		}
	});
	res.send("Record updated");
});
app.get("/searchbooks", function(req, res) {
	var user_id = req.param("search");
	console.log(user_id);
	mysqlConnection.connect(function() {
		if (isNaN(user_id)) {
			var hs =
				"SELECT * FROM `book`.`book_details` WHERE Title like '" +
				user_id +
				"%' or Author like  '" +
				user_id +
				"%' or Publication  like '" +
				user_id +
				"%' or Type  like '" +
				user_id +
				"%'";
			mysqlConnection.query(hs, (err, rows, fields) => {
				if (!err) res.json(rows);
			});
		} else {
			console.log(user_id);
			var hs =
				"SELECT * FROM `book`.`book_details` WHERE ISBN = " + user_id + "";
			mysqlConnection.query(hs, (err, r, fields) => {
				if (!err) {
					res.json(r);
				}
			});
		}
	});
});

app.get("/studentprofile", function(req, res) {
	var Rollno = req.param("rollno");
	// console.log(req.body.Rollno);
	mysqlConnection.connect(function() {
		console.log('Student');
		var Time =
			"SELECT `Reservetime` FROM `book`.`reserve` WHERE Rollno = " +
			Rollno +
			"";
		mysqlConnection.query(Time, function(err, results, fields) {
			if (err) throw err;
			else console.log(results);
			var time = Object.values(results);
			for (var value of time) {
				console.log(Object.values(value));
				reservedtime = "";
				timequery = Object.values(value);
				//console.log(ns);
				timequery.forEach(myFunction);

				function myFunction(val, index, array) {
					//  barcode=parseInt(barcode);
					reservedtime = reservedtime + val;

					console.log(reservedtime);
					var dat = new Date(reservedtime);

					console.log(dat.toISOString().slice(11, 19));
					console.log(dat.toString());
					var found = dat.toISOString().slice(0, 10);
					var foundtime = dat.toString().slice(16, 24);
					var abc = found + " " + foundtime;
					console.log(abc);
					var today = new Date();
					//
					var today = new Date();
					var date =
						today.getFullYear() +
						"-" +
						(today.getMonth() + 1) +
						"-" +
						today.getDate();
					var time =
						today.getHours() +
						":" +
						today.getMinutes() +
						":" +
						today.getSeconds();
					var Time = date + " " + time;
					var newdate = new Date(Time);
					console.log(newdate.toISOString().slice(0, 10));
					var cal = newdate.toISOString().slice(0, 10);
					console.log(newdate.toString().slice(16, 24));
					var c = newdate.toString().slice(16, 24);
					c = moment();
					console.log(moment().subtract(3, "minutes"));
					console.log(
						moment()
							.subtract(3, "minutes")
							.toString()
							.slice(16, 24)
					);
					var calTime = moment()
						.subtract(3, "minutes")
						.toString()
						.slice(16, 24);
					if (cal > found || calTime >= foundtime) {
						console.log("YES");

						// console.log(dates.compare(Time,reservedtime));
						//    var a=(moment().subtract(3, 'minutes').format("HH:MM:SS"));
						//    console.log(a);

						var deleteReserve =
							"DELETE FROM `book`.`reserve` WHERE `Rollno` = " +
							Rollno +
							" and Reservetime= '" +
							abc +
							"' ";
						mysqlConnection.query(deleteReserve, function(
							err,
							results,
							fields
						) {
							if (err) throw err;
							else console.log(results);
						});
					} else {
						var roll =
							"SELECT SN,Rollno,Title FROM `book`.`reserve` WHERE  `Rollno` = " +
							Rollno +
							" and Reservetime= '" +
							abc +
							"' ";
						mysqlConnection.query(roll, function(err, val, fields) {
							if (!err) res.json(val);
						});
					}
				}
			}
		});
	});
});

app.post("/confirmreserve", function(req, res) {
	console.log(req.body.Barcode);
	console.log(req.body.Rollno);
	console.log(req.body.Title);
	// var Ttle = req.body.Title;
	var today = new Date();
	var time =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	// console.log(Ttle.props);
	mysqlConnection.connect(function() {
		var update =
			"UPDATE `book`.`reserve` SET `Barcode` =(" +
			req.body.Barcode +
			"),`Confirm`=('Issued '), WHERE Rollno = " +
			req.body.Rollno +
			" and Title = '" +
			req.body.Title +
			"'";
		mysqlConnection.query(update, function(err, results, fields) {
			if (err) throw err;
			else console.log(results);
		});
	});
});
app.post("/reserve", function(req, res) {
	mysqlConnection.connect(function() {
		console.log(req.body.Rollno);
 // console.log(req.body.ReserveTime);
 var GetAllBookinRollnoQuery = "SELECT COUNT(Rollno) AS total FROM `book`.`reserve` Where Rollno = '"+req.user.rollno+"'";
 mysqlConnection.query(GetAllBookinRollnoQuery,function(err, results){
	 console.log(GetAllBookinRollnoQuery);
	  if(!err)
	 console.log(results);
	 	 console.log(results[0].total);
	  var count = results[0].total;
	  var GetAllBookinnoQuery = "SELECT COUNT(Title) AS total FROM `book`.`reserve` Where Rollno = '"+req.user.rollno+"' AND `Title`='" +
	  req.body.Title +
	  "'";
 mysqlConnection.query(GetAllBookinnoQuery,function(err, results){
	 console.log(GetAllBookinnoQuery);
	  if(!err)
	 console.log(results);
	 	 console.log(results[0].total);
	  var counts = results[0].total;
	  var TotalQuantityQuery = "SELECT Available_Quantity FROM `book`.`book_details` WHERE ISBN="+req.body.ISBN+"";
		mysqlConnection.query(TotalQuantityQuery,function(err,results,fields){
			if(!err)
			console.log(results);

			console.log(results[0].Available_Quantity);
			var Qty= results[0].Available_Quantity;
			parseInt(Qty);
	 
      if(count<7 && counts<1 && Qty>0){

	var today = new Date();
	console.log(req.body.Title);
	// var dateTime = date+' '+time;
	var date =
		today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	var time =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + " " + time;
	var reservetime = time;
	console.log(req.user.rollno)
	// var Ttle = req.body.Title;
	// console.log(Ttle.props);
	mysqlConnection.connect(function() {
		var update =
			"INSERT INTO `book`.`reserve` (`ISBN`,`Title`,`Rollno`,`Reservetime`) VALUES (  " +
			req.body.ISBN +
			",'" +
			req.body.Title +
			"','" +
			req.user.rollno+
			"','" +
			dateTime +
			"')";
		//  var update = "UPDATE `book`.`reserve` SET `Reservetime`=('" + time + "'),Title  WHERE Rollno = "+req.body.Rollno+"";
		mysqlConnection.query(update, function(err, results, fields) {
			if (err) throw err;
			else{ console.log(results);
				res.send('Reserved');}
		});
		var TotalQuantityQuery = "SELECT Available_Quantity FROM `book`.`book_details` WHERE ISBN="+req.body.ISBN+"";
		mysqlConnection.query(TotalQuantityQuery,function(err,results,fields){
			if(!err)
			console.log(results);

			console.log(results[0].Available_Quantity);
			var Qty= results[0].Available_Quantity;
			parseInt(Qty);
			var DcrQty=(Qty-1);
			console.log(DcrQty);
		 var DecreaseQuantityQuery= "UPDATE `book`.`book_details` SET `Available_Quantity` = "+DcrQty+" WHERE ISBN="+req.body.ISBN+"";
		 mysqlConnection.query(DecreaseQuantityQuery,function(err,results,fields){
			if(!err)
			console.log(results);
		})

	})
	setTimeout(function() {
		var update =
			"DELETE FROM `book`.`reserve` WHERE `ISBN`= " +req.body.ISBN +" AND `Title`='" +req.body.Title +"' AND `Rollno`= '" +req.user.rollno+"' AND  `Reservetime`='" +dateTime +	"'";
			mysqlConnection.query(update, function(err, results, fields) {
				if (err) throw err;
				else{ console.log(results);
					console.log(results +'please')
					}
			});
	},180000)
	
	});

}
else{
	res.send('Book Issued and Reserved More than 7');
}
})
 })
})

});
})
app.post("/issuebooks", function(req, res) {
	//   console.log(req.body.barcodes);
	//   console.log(req.body.Rollno);
console.log(req.body.Quantity);
	mysqlConnection.connect(function() {
		console.log("connected")

		var GetAllBookinRollnoQuery = " SELECT COUNT(Rollno) AS total FROM `book`.`reserve`Where Rollno='"+req.body.Rollno+"'";
		mysqlConnection.query(GetAllBookinRollnoQuery,function(err, results, fields){
			if(!err)
			console.log(results[0].total);
			var count = results[0].total;
			
 	
	if(count<7 || count==0 ){
	var barcodes = req.body.barcodes;
	var i = 0;

	async.forEachOf (barcodes, (val, key, callbck) => {
		var ISBNQuery = "SELECT ISBN FROM `book`.`book_list` WHERE `Barcode`=" + val + "";

		mysqlConnection.query(ISBNQuery, function(err, isbn, fields) {
			if (err) throw err;

			var TitleQuery = "SELECT Title FROM `book`.`book_details` WHERE `ISBN`=" + isbn[0].ISBN + "";
			mysqlConnection.query(TitleQuery, function(err, title, fields) {
				if (err) throw err;
				var GetAllBookinRollnoQuery = " SELECT COUNT(Rollno) AS total FROM `book`.`reserve`Where Rollno='"+req.body.Rollno+"' AND `Title`='" + title[0].Title + "'";
				mysqlConnection.query(GetAllBookinRollnoQuery,function(err, results, fields){
					if(!err)
					console.log(results[0].total);
					var counts = results[0].total;
					if(counts<1){
						var TotalQuantityQuery = "SELECT Available_Quantity FROM `book`.`book_details` WHERE ISBN="+isbn[0].ISBN+"";
						mysqlConnection.query(TotalQuantityQuery,function(err,results,fields){
							if(!err)
							console.log(results);
		
							console.log(results[0].Available_Quantity);
							var Qty= results[0].Available_Quantity;
							parseInt(Qty);

							if(Qty>0){
				var Issue = "INSERT INTO `book`.`reserve` (`Barcode`,`Rollno`,`Title`,`ISBN`,`Confirm`,`Issuedby`) VALUES (" + val +
					",'" + req.body.Rollno + "','" + title[0].Title + "','" + isbn[0].ISBN + "',' Issued','" + req.user.Name + "')";

					console.log(Issue)

					mysqlConnection.query(Issue, function(err, issued, fields) {
							if (err) throw err;
							else {console.log(issued);
							res.send('Book issued');
						}
				});
				var TotalQuantityQuery = "SELECT Available_Quantity FROM `book`.`book_details` WHERE ISBN="+isbn[0].ISBN+"";
				mysqlConnection.query(TotalQuantityQuery,function(err,results,fields){
					if(!err)
					console.log(results);

					console.log(results[0].Available_Quantity);
					var Qty= results[0].Available_Quantity;
					parseInt(Qty);
					 var issueqty = req.body.Quantity;
					parseInt(issueqty);
					var DcrQty=(Qty-issueqty);
					console.log(DcrQty);
				 var DecreaseQuantityQuery= "UPDATE `book`.`book_details` SET `Available_Quantity` = "+DcrQty+" WHERE ISBN="+req.body.ISBN+"";
				 mysqlConnection.query(DecreaseQuantityQuery,function(err,results,fields){
					if(!err)
					console.log(results);
				 });
				})
							}
		})
	}
	

			else{
				res.send('Same Book already Issued or Reserved');
			}
		})
			});
		
	
		});

	});
}
else{
	res.send('Not issued');
}
 })
});
	})

	app.get("/gettingissuedata",function(req,res){
		var Rollno = req.param("rollno")
		console.log('Student');
		mysqlConnection.connect(function() {
				var dataquery =  "SELECT * FROM `book`.`reserve` WHERE `Rollno`='" + Rollno +"'";
				console.log(dataquery);
				mysqlConnection.query(dataquery, function(err, results, fields) {
					if (!err)
					res.send(results);
				});
});
	});
	app.post("/returnbook",function(req,res){
		console.log(req.body.Rollno);
		console.log(req.body.Title);
		console.log(req.body.Barcode);
		mysqlConnection.connect(function() {
			var ReturnQuery = "DELETE FROM `book`.`reserve` WHERE `Rollno`='" + req.body.Rollno +"' AND `Title`='"+req.body.Title+"' AND `Barcode`='"+req.body.Barcode+"'";
			mysqlConnection.query(ReturnQuery, function(err, returned, fields) {
				if (err) throw err;
				else
				{
				res.send('Book Returned');
				}

	});
	var TotalQuantityQuery = "SELECT Available_Quantity FROM `book`.`book_details` WHERE Title = '"+req.body.Title+"'";
				mysqlConnection.query(TotalQuantityQuery,function(err,results,fields){
					if(!err)
					console.log(results);

					console.log(results[0].Available_Quantity);
					var Qty= results[0].Available_Quantity;
					parseInt(Qty);
					var DcrQty=(Qty-1);
					console.log(DcrQty);
				 var DecreaseQuantityQuery= "UPDATE `book`.`book_details` SET `Available_Quantity` = "+DcrQty+" WHERE Title = '"+req.body.Title+"'";
				 mysqlConnection.query(DecreaseQuantityQuery,function(err,results,fields){
					if(!err)
					console.log(results);
				 });
				})

		})
	})
	app.post("/addComment",function(req,res){
		console.log(req.body.Comment);
		console.log(req.body.Title);
		console.log(req.body.ISBN);
		mysqlConnection.connect(function() {
			var AddCommentQuery="INSERT INTO `book`.`comment`(`Rollno`,`ISBN`,`Title`,`Comments`) VALUES('"+req.user.rollno+"','"+req.body.ISBN+"','"+req.body.Title+"','"+req.body.Comment+"')";
			console.log(AddCommentQuery);
			mysqlConnection.query(AddCommentQuery,function(err,addcomment,fields){
				if(!err){
					res.send('Comment Added');
					console.log(addcomment);
				}
			})
		})
	})
	app.get("/viewComment", function(req, res) {
		var user_id = req.param("ISBN");
		console.log(user_id);
		mysqlConnection.connect(function() {

				var hs =
					"SELECT * FROM `book`.`comment` WHERE ISBN = '" +user_id +"'";
				mysqlConnection.query(hs, (err, rows, fields) => {
					if (!err)
					 res.json(rows);
					 console.log(rows);
				});

		});
	});
	app.post("/postnotice",function(req,res){
		mysqlConnection.connect(function() {
			var PostNoticeQuery="INSERT INTO `book`.`notice`(`Notice`,`Subject`) VALUES('"+req.body.Post+"','"+req.body.Subject+"')";
			console.log(PostNoticeQuery);
			mysqlConnection.query(PostNoticeQuery,function(err,addcomment,fields){
				if(!err){
					res.send('Notice Posted');
					console.log(addcomment);
				}
			})
		})
	})
	app.get("/postnotice", (req, res) => {
		mysqlConnection.query("SELECT * FROM `book`.`notice`", (err, rows, fields) => {
			if (!err) res.send(rows);
			else console.log(err);
		});
	});
	
	app.post("/deletepost",function(req,res){
		console.log('happy');
		mysqlConnection.connect(function() {
			var PostNoticeQuery="DELETE FROM `book`.`notice` WHERE `Subject`='"+req.body.Subject+"' AND `Notice`='"+req.body.Notice+"'";
			//console.log(PostNoticeQuery);
			mysqlConnection.query(PostNoticeQuery,function(err,notice,fields){
				if(!err){
					res.send('Post Deleted');
					console.log(notice);
				}
			})
		})
	})
	app.post("/addstudent",function(req,res){
		mysqlConnection.connect(function() {
			var AddStudentQuery="INSERT INTO `book`.`users`(rollno,email,name,password,address,contactnum) VALUES('"+req.body.Rollno+"','"+req.body.Email+"','"+req.body.Name+"','"+req.body.Rollno+"','"+req.body.Address+"',"+req.body.Contact+")";
			//console.log(PostNoticeQuery);
			mysqlConnection.query(AddStudentQuery,function(err,notice,fields){
				if(!err){
					res.send('Student Added');
					console.log(notice);
				}
			})
		})
	})
	app.get("/getstudentissuedata",function(req,res){
		mysqlConnection.connect(function() {
				var dataquery =  "SELECT * FROM `book`.`reserve` WHERE `Rollno`='" + req.user.rollno +"'";
				console.log(dataquery);
				mysqlConnection.query(dataquery, function(err, results, fields) {
					if (!err)
					console.log(results);
					res.send(results);
				});
});
	});
	
	app.get("/getreserveddata",function(req,res){
		mysqlConnection.connect(function() {
				var dataquery =  "SELECT * FROM `book`.`reserve`";
				console.log(dataquery);
				console.log("joker");
				mysqlConnection.query(dataquery, function(err, results, fields) {
					if (!err)
					console.log(results);
					
					res.send(results);
					
				});
});

	});
	app.get("/searchsuggest", function(req, res) {
		var user_id = req.param("search");
		console.log(user_id);
		var return_data = {};
		mysqlConnection.connect(function() {
			if(isNaN(user_id)){
var sql = "SELECT Title FROM `book`.`book_details` WHERE Title like '" +user_id+"%';SELECT Publication FROM `book`.`book_details` WHERE Publication like '"+user_id +"%';SELECT Author FROM `book`.`book_details` WHERE Author like '"+user_id +"%';SELECT Type FROM `book`.`book_details` WHERE Type like '"+user_id +"%'";
 
mysqlConnection.query(sql, function(error, results, fields) {
    if (error) {
        throw error;
    }
    console.log(results[0]);
	console.log(results[1]);
	console.log(results);
	res.json({results: results});
});
 
			}
			else{
					var hs =
				"SELECT * FROM `book`.`book_details` WHERE ISBN = " + user_id + "";
			mysqlConnection.query(hs, (err, r, fields) => {
				if (!err) {
					res.json(r);
				}
			});
		
	
			}
			
			
			
		})	

	});
const port = 8081;
app.listen(port, () => console.log(`Listening to the port ${port} ..`));
