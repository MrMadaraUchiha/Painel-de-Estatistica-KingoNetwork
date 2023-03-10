$(document).ready(function() {
	// Definimos os servidores que queremos monitorar
	var servidores = [
		{nome: "Lobby", ip: "192.168.0.1"},
		{nome: "RPG", ip: "192.168.0.2"},
		{nome: "Pixelmon", ip: "192.168.0.3"},
		{nome: "Survival", ip: "192.168.0.4"}
	];
	
	// Função para atualizar as estatísticas de um servidor
	function atualizarEstatisticas(ip, elemento) {
		$.ajax({
			url: "http://" + ip + ":8080/estatisticas",
			type: "GET",
			dataType: "json",
			success: function(data) {
				$(elemento).find(".jogadores").text(data.jogadoresOnline);
				$(elemento).find(".uptime").text(data.uptime);
				$(elemento).find(".mensagem-erro").hide();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$(elemento).find(".mensagem-erro").show();
				if (textStatus === "timeout") {
					$(elemento).find(".mensagem-erro").text("Tempo de espera esgotado.");
				} else if (textStatus === "error") {
					$(elemento).find(".mensagem-erro").text("Não foi possível conectar ao servidor.");
				} else {
					$(elemento).find(".mensagem-erro").text("Erro desconhecido.");
				}
			},
			timeout: 5000
		});
	}
	
	// Função para atualizar as estatísticas de todos os servidores
	function atualizarTodasEstatisticas() {
		for (var i = 0; i < servidores.length; i++) {
			var elemento = $("div[data-ip='" + servidores[i].ip + "']");
			atualizarEstatisticas(servidores[i].ip, elemento);
		}
	}
	
	// Inicializamos as estatísticas dos servidores
	for (var i = 0; i < servidores.length; i++) {
		var elemento = $("<div class='servidor' data-ip='" + servidores[i].ip + "'><h2>" + servidores[i].nome + "</h2><p>Jogadores online: <span class='jogadores'>...</span></p><p>Tempo online: <span class='uptime'>...</span></p><p class='mensagem-erro' style='display:none;color:red;'></p></div>");
		$("#painel-servidores").append(elemento);
		atualizarEstatisticas(servidores[i].ip, elemento);
	}
	
	// Chama a função para atualizar as estatísticas periodicamente
	setInterval(function() {
		atualizarTodasEstatisticas();
	}, 5000);
});
