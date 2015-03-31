var config = require('../config');
var cheerio = require('cheerio');
var Meal = require('../models/meal');

function Scraper(body) {
    this.$ = cheerio.load(body);
    this.lastLunch = new Meal(0);
    this.lastDinner = new Meal(1);
    this.lastSaturday = new Meal(2);
    this.lunch = new Meal(0);
    this.dinner = new Meal(1);
    this.saturday = new Meal(2);
    this.date = null;
    this.isNotify = false;
}

Scraper.prototype.formatItem = function (string, name) {
    string = string.replace(name, '').trim().replace(/  /g, ' ').replace(/ \/ /g, ', ');
    return string.substr(0, 1).toUpperCase() + string.substr(1)
}

Scraper.prototype.getDateFromString = function (str) {
    var myRegexp = /([0-3]{1}[0-9]{1}\/[0-1]{1}[0-9]{1}\/\d{4})/g;
    var match = myRegexp.exec(str);
    if (match != null && match.length > 0) {
        var splitedDate = match[0].split('/');
        if (splitedDate.length == 3) {
            return splitedDate[2] + '-' + splitedDate[1] + '-' + splitedDate[0]
        }
    }
    return null;
}
Scraper.prototype.proccess = function () {
    var scope = this;
    var type = null;
    var saturdayDate;
    scope.lastLunch.getLast(function () {
        scope.lastDinner.getLast(function () {
            scope.lastSaturday.getLast(function () {
                var lunchStatus = false;
                var dinnerStatus = false;
                var saturdayStatus = false;
                scope.$('#secao > *').each(function (i, v) {
                    if (scope.$(v).text().toLowerCase().trim() == 'almoço') {
                        type = 0
                    }
                    if (scope.$(v).text().toLowerCase().trim() == 'jantar') {
                        type = 1
                    }
                    if (scope.$(v).text().toLowerCase().indexOf('sábado: ') > -1) {
                        type = 2
                        saturdayDate = scope.getDateFromString(scope.$(v).text())
                    }
                    if (scope.$(v)[0].tagName == 'table') {
                        if (type == 0) {
                            lunchStatus = scope.processTable(v, scope.lunch);
                        }
                        if (type == 1) {
                            dinnerStatus = scope.processTable(v, scope.dinner);
                        }
                        if (type == 2) {
                            saturdayStatus = scope.processTable(v, scope.saturday, saturdayDate);
                        }
                        type = null;
                    }

                    if (scope.$(v).text().toLowerCase().trim().indexOf('data') > -1) {
                        scope.date = scope.getDateFromString(scope.$(v).text())
                    }
                });
                if(lunchStatus || dinnerStatus || saturdayStatus){
                    scope.notify();
                }
            });
        });
    });
}
Scraper.prototype.processTable = function (table, meal, tDate) {
    var date = tDate ? tDate : this.date;
    var scope = this;
    scope.$(table).attr('id', meal.type);
    scope.$('#' + meal.type + ' tr').each(function (v, ele) {
        var line = scope.$(ele).text().toLowerCase().trim();
        if (line.indexOf('prato principal') > -1) {
            meal.pp = scope.formatItem(line, 'prato principal')
        } else {
            if (line.indexOf('opção vegetariana') > -1) {
                meal.ov = scope.formatItem(line, 'opção vegetariana')
            } else {
                if (line.indexOf('salada') > -1) {
                    meal.sa = scope.formatItem(line, 'salada')
                } else {
                    if (line.indexOf('guarnição') > -1) {
                        meal.gu = scope.formatItem(line, 'guarnição')
                    } else {
                        if (line.indexOf('acompanhamento') > -1) {
                            meal.ac = scope.formatItem(line, 'acompanhamento')
                        } else {
                            if (line.indexOf('sobremesa') > -1) {
                                meal.so = scope.formatItem(line, 'sobremesa')
                            } else {
                                if (line.indexOf('suco') > -1) {
                                    meal.su = scope.formatItem(line, 'suco')
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    meal.date = date;

    if (meal.type == 0 && !meal.isEqual(this.lastLunch)) {
        meal.save(function () {
            scope.isNotify = true;
        });
        return true;
    }
    if (meal.type == 1 && !meal.isEqual(this.lastDinner)) {
        meal.save(function () {
            scope.isNotify = true;
        });
        return true;
    }

    if (meal.type == 2 && meal.pp != '' && !meal.isEqual(this.lastSaturday)) {
        meal.save(function () {
            scope.isNotify = true;
        });
        return true;
    }
}

Scraper.prototype.notify = function() {
    console.log("bacon");
    this.isNotify = false;
    var GcmCore = require('./gcm');
    var gcm = new GcmCore();
    gcm.send("Confira o novo cardápio.");

}
module.exports = Scraper;