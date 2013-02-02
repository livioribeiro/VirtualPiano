// variável mapa faz a correspondência entre a tecla do teclado e a nota do piano
var mapa = {'Z': "C3",
			'S': "C3s",
			'X': "D3",
			'D': "D3s",
			'C': "E3",
			'V': "F3",
			'G': "F3s",
			'B': "G3",
			'H': "G3s",
			'N': "A3",
			'J': "A3s",
			'M': "B3",
			'Q': "C4",
			'2': "C4s",
			'W': "D4",
			'3': "D4s",
			'E': "E4",
			'R': "F4",
			'5': "F4s",
			'T': "G4",
			'6': "G4s",
			'Y': "A4",
			'7': "A4s",
			'U': "B4",
			'I': "C5"
			};
// variável notas armazena os nomes das notas num array
var notas = [];
// adiciona as notas ao array notas
for (var i in mapa) {
	notas.push(mapa[i]);
}
// variável que receberá o objeto Piano
var piano;
// função que reproduz ou interrompe uma nota enquanto muda a cor da tecla no Piano
// recebe como parâmetros a noa a ser tocada/interrompida, se foi pressionada ou liberda e o elemento no piano que mudará de cor

function tocarNota(nota, press) {
	var tecla = document.getElementById(nota);
	// verifica se a tecla foi pressionada
	if (press) {
		// verifica o tipo de tecla pressionada
		if (tecla.className == "key") {
			// tecla branca
			tecla.className = "keyPressed";
		}
		else if (tecla.className == "blackKey") {
			// tecla preta
			tecla.className = "blackKeyPressed";
		}
		// reproduz a nota
		piano.play(nota);
	}
	// se a tecla foi liberada, ela volta a cor original
	else {
		// verifica o tipo de tecla pressionada
		if (tecla.className == "keyPressed") {
			// tecla branca
			tecla.className = "key";
		}
		else if (tecla.className == "blackKeyPressed") {
			// tecla preta
			tecla.className = "blackKey";
		}
		// interrompe a nota
		piano.stop(nota);
	}
}

// as variáveis e funções acima ficam fora do require para poderem ser acessadas após a execução do require

require(["Piano"], function(Piano){
	// gera um novo objeto do tipo Piano
	piano = new Piano("sons/");
	var tecla;
	// percorre o array notas e adiciona os eventos do mouse aos elementos correspondentes
	for (var i = 0; i < notas.length; i++) {
		tecla = document.getElementById(notas[i]);
		
		// quando a tecla é pressionada com o mouse
		tecla.addEventListener("mousedown", function(e) {
			// antes de tocar a nota, é verificado se o elemento que disparou o evento é o mesmo elemento que foi clicado.
			// essa verificação é necessária pois a tecla preta é um elemento dentro de uma tecla branca,
			// de modo que o clique na tecla preta dispararia o evento da tecla branca se não houvesse verificação.
			// 'this' referencia a própria tag à qual o evento é adicionado
			// 'e.target' referencia o elemento que foi clicado
			if (e.target == this) {
				tocarNota(this.id, true);
			}
		},false);
		
		// quando a tecla é liberada com o mouse
		tecla.addEventListener("mouseup", function(e) {
			if (e.target == this) {
				tocarNota(this.id, false);
			}
		},false);
		
		// quando o mouse é retirado de cima do element
		tecla.addEventListener("mouseout", function(e) {
			if (e.target == this) {
				tocarNota(this.id, false);	
			}
		},false);
	}
	// adiciona eventos de teclado ao documento inteiro
	// quando a tecla é pressionada
	document.addEventListener("keydown", function(e) {
		// a tecla pressionada é identificada
		var tecla = String.fromCharCode(e.keyCode).toUpperCase();
		var nota;
		// verifica-se a existência da tecla no mapa e se não foi pressionada em conjunto com alt, ctrl ou shift
		if ((nota = mapa[tecla]) && (!e.altKey) && (!e.ctrlKey) && (!e.shiftKey)) {
			// verifica-se a execução da nota
			// enquanto a nota estiver em execução, ou seja, a tecla do teclado estiver pressionada, a nota não será executada novamente
			if (!piano.sons[nota].executando) {
				// a nota é executada
				tocarNota(nota, true);
			}
		}
	}, false);
	
	// quando a tecla é liberada
	document.addEventListener("keyup", function(e) {
		// a tecla pressionada é identificada
		var tecla = String.fromCharCode(e.keyCode).toUpperCase();
		var nota;
		// verifica-se a existência da nota no mapa e se não foi pressionada em conjunto com alt, ctrl ou shift
		if ((nota = mapa[tecla]) && (!e.altKey) && (!e.ctrlKey) && (!e.shiftKey)) {
			// a nota é interrompida
			tocarNota(nota, false);
		}
	}, false);
});