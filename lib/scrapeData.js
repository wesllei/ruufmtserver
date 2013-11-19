var cheerio = require('cheerio');

function ScrapeCardapio(html) {
	this.html = html;
}

scrapeData.prototype.process = function() {
	var tiposDePrato = ['salada', 'pp', 'guarnicao', 'acompanhamento', 'sobremesa'];
	var refeicao = ['almoco', 'janta'];
	var json = '{';
	var $ = cheerio.load(this.html);
	$('table').each(function(j, f) {
		$(f).attr('id', 'table' + j);
		json += '"' + refeicao[j] + '":{';
		$('#table' + j + ' tr').each(function(i, e) {
			$(e).attr('id', 'tr' + i);
			var tds = $('#tr' + i + ' td');
			json += '"' + tiposDePrato[i] + '":"' + $(tds[1]).text().trim() + '",';
		});
		json = json.substring(0, json.length - 1) + '},';
	});
	if (json.length > 1) {
		json = json.substring(0, json.length - 1) + '}';
	} else {
		json = null;
	}
	return json;
}

module.exports = ScrapeCardapio;