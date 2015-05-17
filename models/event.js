var config = require('../config');
var mysql = require('mysql');

function Event() {
    this.name = "";
    this.mail = "";
    this.phone = "";
    this.phoneClaro = "";
    this.phoneOi = "";
    this.phoneTim = "";
    this.phoneVivo = "";
    this.imageCardUrl = "";
    this.imageCardFile = "";
    this.imageBannerUrl = "";
    this.imageBannerFile = "";
    this.pageUrl = "";
    this.facebookUrl = "";
    this.placeName = "";
    this.placeMapURL = "";
    this.date = "";
    this.promoteDate = "";
    this.price = "";
    this.priceFemale = "";
    this.whatsapp = "";

    this.dbCon = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.pass,
        database: config.db.db,
        dateStrings: true
    });
}

Event.prototype.save = function (callback) {
    this.dbCon.query('INSERT INTO event SET ?', this.getPureData(true), function (err, result) {
        if (err)
            console.log(err)
        callback();
    })
    this.dbCon.end(function (err) {
        if (err);
    });
}

Event.prototype.getPureData = function () {
    var pure = {
        name: this.name,
        mail: this.mail,
        phone: this.phone,
        phoneClaro: this.phoneClaro,
        phoneOi: this.phoneOi,
        phoneTim: this.phoneTim,
        phoneVivo: this.phoneVivo,
        imageCardUrl: this.imageCardUrl,
        imageCardFile: this.imageCardFile,
        imageBannerUrl: this.imageBannerUrl,
        imageBannerFile: this.imageBannerFile,
        pageUrl: this.pageUrl,
        facebookUrl: this.facebookUrl,
        placeName: this.placeName,
        placeMapURL: this.placeMapURL,
        date: this.date,
        promoteDate: this.promoteDate,
        price: this.price,
        priceFemale: this.priceFemale,
        whatsapp: this.whatsapp
    };
    return pure;
}

Event.prototype.getList = function (callback) {
    var scope = this;
    var query = this.dbCon.query('SELECT * FROM event WHERE aproved = ? ORDER BY date DESC', [true], function (err, result) {
        if (err) {
             console.log( err)
             callback([])
        } else {
            callback(result)
        };
    })
    this.dbCon.end(function (err) {
        if (err) throw err;
    });
}

Event.prototype.getByParans = function (parans, callback) {
    var scope = this;
    var query = this.dbCon.query('SELECT * FROM event LIMIT 1', parans, function (err, result) {
        if (err) {
             console.log( err)
             callback([])
        } else {
            callback(result)
        };
    })
    this.dbCon.end(function (err) {
        if (err) throw err;
    });
}

Event.prototype.isEqual = function (event) {
    if (JSON.stringify(this.getPureData()) == JSON.stringify(event.getPureData()))
        return true
    return false
}
module.exports = Event;