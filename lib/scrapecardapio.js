var cheerio = require('cheerio');

function ScrapeCardapio(html, callback) {
	var tiposDePrato = ['salada', 'pp', 'guarnicao', 'acompanhamento', 'sobremesa'];
	var refeicaoArr = ['almoco', 'janta'];
	var cardapio = {
		cardapio : {
			almoco : {
				salada : null,
				pp : null,
				guarnicao : null,
				acompanhamento : null,
				sobremesa : null
			},
			janta : {
				salada : null,
				pp : null,
				guarnicao : null,
				acompanhamento : null,
				sobremesa : null
			},
			date : Date.now
		}
	}
	var $ = cheerio.load(html);
	$('table').each(function(j, f) {
		var refeicao = cardapio.cardapio[refeicaoArr[j]];
		$(f).attr('id', 'table' + j);
		$('#table' + j + ' tr').each(function(i, e) {
			$(e).attr('id', 'tr' + i);
			var tds = $('#table' + j + ' #tr' + i + ' td');
			$(tds[1]).attr('id', 'td' + j + i);
			var ps = $('#td' + j + i + ' p');
			var prato = '';
			if(ps.length>0){
				for (var x = 0; x < ps.length; x++) {
					prato += $(ps[x]).text().trim()+' / ';
				};
				refeicao[tiposDePrato[i]] = prato.trim().replace(/[\/]$/,'').trim().toLowerCase();
			}else{
				refeicao[tiposDePrato[i]] = $(tds[1]).text().trim().toLowerCase();
			}
			
		});
	});
	var data = '';
	var res = [];
	$('p').each(function(i, e) {
		res = $(e).text().match(/([0-9]{1,2}[/][0-9]{1,2}[/][0-9]{2,4})/g);
		if (res) {
			data = res[0];
		}
	});
	var dataParts = data.split("/");
	if(dataParts[2].length == 2){
		dataParts[2] = "20"+dataParts[2];
	}
	var d = new Date(dataParts[2],(dataParts[1]-1),dataParts[0])
	cardapio.cardapio.date = d.getTime();
	
	callback(d, cardapio);
}

module.exports = ScrapeCardapio;
