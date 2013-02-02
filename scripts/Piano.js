// Definição do piano
define(["PianoNote"], function(PianoNote){
	return function(diretorioSons) {
		// lista de notas que o piano possui
		this.notas = ["C3", "C3s", "D3", "D3s", "E3", "F3", "F3s", "G3", "G3s", "A3", "A3s", "B3", "C4", "C4s", "D4", "D4s", "E4", "F4", "F4s", "G4", "G4s", "A4", "A4s", "B4", "C5"];
		// objeto que guardará os objetos do tipo PianoNote
		this.sons = {};
		// percorre a lista de notas adicionando ao atributo this.sons os objetos PianoNote
		for (var i = 0; i < this.notas.length; i++) {
			// this.sons tem o seguinte formato:
			// {
			//	  nota: objeto PianoNote,
			//	  nota: objeto PianoNote,
			//	  ...
			//	  nota: objeto PianoNote
			// }
			this.sons[this.notas[i]] = new PianoNote(diretorioSons + this.notas[i]);
		}
		// função play do Piano recebe a nota a ser reproduzida e chama a função play do objeto PianoNote da nota correspondente
		this.play = function(nota) {
			this.sons[nota].play();
		};
		// função stop do Piano recebe a nota a ser interrompida e chama a funÃ§Ã£o stop do objeto PianoNote da nota correspondente
		this.stop = function(nota) {
			this.sons[nota].stop();
		};
	};
});