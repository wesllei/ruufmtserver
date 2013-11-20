var cheerio = require('cheerio');

function ScrapeCardapio(html, callback) {
	var tiposDePrato = ['salada', 'pp', 'guarnicao', 'acompanhamento', 'sobremesa'];
	var refeicao = ['almoco', 'janta'];
	var json = '{';
	var $ = cheerio.load(html);
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
		var data = '';
		var res = [];
		$('p').each(function(i, e) {
			res = $(e).text().match(/([0-9]{1,2}[/][0-9]{1,2}[/][0-9]{2,4})/g);
			if (res) {
				data = res[0];
			}
		});
		callback(data,json.substring(0, json.length - 1) + '}');
	}
};

module.exports = ScrapeCardapio; 