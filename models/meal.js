var config = require('../config');
var mysql = require('mysql');

function Meal(type) {
    this.pp = "";
    this.ov = "";
    this.sa = "";
    this.gu = "";
    this.ac = "";
    this.so = "";
    this.su = "";
    this.date = null;
    this.type = type;

    this.dbCon = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.pass,
        database: config.db.db
    });
}

Meal.prototype.save = function (callback) {
    this.dbCon.query('INSERT INTO meal SET ?', this.getPureData(true), function (err, result) {
        if (err)
            console.log(err)
        callback();
    })
    this.dbCon.end(function (err) {
        if (err);
    });
}

Meal.prototype.getPureData = function (date) {
    var pure = {
        pp: this.pp,
        ov: this.ov,
        sa: this.sa,
        gu: this.gu,
        ac: this.ac,
        so: this.so,
        su: this.su,
        type: this.type
    }
    if (date)
        pure.date = this.date;
    return pure;
}

Meal.prototype.getLast = function (callback) {
    var scope = this;
    var query = this.dbCon.query('SELECT * FROM meal WHERE type = ? ORDER BY date DESC LIMIT 1', scope.type, function (err, result) {
        if (err) {
            throw err
        } else {
            if (result.length > 0) {
                scope.pp = result[0].pp;
                scope.ov = result[0].ov;
                scope.sa = result[0].sa;
                scope.gu = result[0].gu;
                scope.ac = result[0].ac;
                scope.so = result[0].so;
                scope.su = result[0].su;
                scope.date = result[0].date;
            }
        };
        callback();
    })
    this.dbCon.end(function (err) {
        if (err) throw err;
    });
}

Meal.prototype.isEqual = function (meal) {
    if (JSON.stringify(this.getPureData(false)) == JSON.stringify(meal.getPureData(false)))
        return true
    return false
}
module.exports = Meal;