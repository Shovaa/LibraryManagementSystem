var title = "SELECT Title FROM `booklist` WHERE `ISBN`= " + req.body.ISBN + "";
mysqlConnection.query(title, function (err, result) {
    if (err)
        throw err;
    else
        console.log(result);
    var values = Object.values(result);
    for (var value of values) {

        console.log(Object.values(value));
        t = "";
        tt = (Object.values(value));
        tt.forEach(myFunction);

        function myFunction(val, index, array) {
            t = t + val;

            console.log(t);
        }
    }
});