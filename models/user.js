var config = require('../config');
var mysql = require('mysql');

function User(data) {
    this.id = data.id ? data.id : "";
    this.keyuser = data.keyuser ? data.keyuser : "";
    this.notify = data.notify ? data.notify : true;

    this.dbCon = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.pass,
        database: config.db.db
    });
}

User.prototype.save = function (callback) {
    var context = this;
    var query = this.dbCon.query('SELECT * FROM user WHERE ?', {
        keyuser: this.keyuser
    }, function (err, result) {
        console.log(err)
        if (result.length < 1) {
            context.dbCon.query('INSERT INTO user SET ?', context.getPureData(true), function (err, result) {
                if (err) {
                    console.log(err);
                    callback(false)
                } else {
                    if (result.affectedRows > 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                }
            })
        }else{
            context.dbCon.query('UPDATE user SET updated=now() WHERE keyuser=?', [context.keyuser], function (err, result) {
                if (err) {
                    console.log(err);
                    callback(false)
                } else {
                    if (result.affectedRows > 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                }
            })
        }
        context.dbCon.end(function (err) {});
    });
}

User.prototype.getPureData = function (date) {
    var pure = {
        keyuser: this.keyuser,
        notify: this.notify,
    }
    return pure;
}

User.prototype.getAll = function (callback) {
    var context = this;
    context.dbCon.query('SELECT * FROM user', function (err, result) {
        if (err) {
            console.log(err);
        }
        callback(result);
    })
    context.dbCon.end(function (err) {});
}
User.prototype.updateIfNotExist = function (newkeyuser) {
    var context = this;
    context.dbCon.query('SELECT * FROM user WHERE keyuser = ?', [newkeyuser], function (err, result) {
        if (err) {
            console.log("65: " + err);
        }
        console.log(result);
        if (result != null && result.length > 0) {
            query = context.dbCon.query('DELETE FROM user WHERE keyuser = ?', [context.keyuser], function (err, result) {
                if (err) {
                    console.log();
                }
            })
            console.log(query.sql);
        } else {
            context.dbCon.query('UPDATE user SET keyuser = ? WHERE keyuser = ?', [newkeyuser, context.keyuser], function (err, result) {
                if (err) {
                    console.log("76: "+err);
                }
            })
            console.log(context.dbCon.query.sql)
        }
        context.dbCon.end(function (err) {});
    })
    
}
module.exports = User;