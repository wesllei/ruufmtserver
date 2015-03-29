var config = require('../config');
var mysql = require('mysql');

function User() {
    this.id = "";
    this.key = "";
    this.last_send = null;
    this.notify = true;

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
        key: this.key
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
        }
        context.dbCon.end(function (err) {});
    });
}

User.prototype.getPureData = function (date) {
    var pure = {
        key: this.key,
        last_send: this.last_send,
        notify: this.notify,
    }
    return pure;
}

User.prototype.getAll = function (callback) {
    var context = this;
    context.dbCon.query('SELECT * FROM user', function (err, result) {
        if (err) {
            console.log(err);
            callback([])
        } else {
            callback(result);
        }
    })
    context.dbCon.end(function (err) {});
}
module.exports = User;