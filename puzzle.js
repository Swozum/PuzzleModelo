var posicoesPecas = []; // Array com a posição atual das peças
var selectedFolderName = localStorage.getItem('selectedFolderName'); ;// Variável global para armazenar o nome da pasta selecionada

			arrayPecas = [];
			var arrayBaralhas = [];
			var jogoFinalizado = false; // Variável de controle do estado do jogo
			//inicialização
			
			function inic(){
				
				baralhar();	
			}
			//******** input/output ********
			//output de um conteúdo num contentor HTML, dados o ID do contentor e o conteúdo (boleano, número ou string)
			function out(idCont, conteudo){
				document.getElementById(idCont).innerHTML = conteudo;
			}
			//********* processos **********
			//referência a um objeto HTML, dado o seu ID
			function refID(idObj){
				return document.getElementById(idObj);
			}
			function formaArray(){
				array = [];
				for(var i = 1; i <= 25; i++){
					array.push(i);
				}
				return array;
			}
			//funcao para retornar uma peca
			function peca(cod, posicao) {
			  var imgElement = '';

			  if (cod < 10) {
			    imgElement = '<img class="imgs" id="img'+cod+'" dataPosicao="'+posicao+'" src="img/'+selectedFolderName+'/' + cod + '.jpg" onclick="swap(this)" />';

			  } else {
			    imgElement = '<img class="imgs" id="img'+cod+'" dataPosicao="'+posicao+'" src="img/'+selectedFolderName+'/' + cod + '.jpg" onclick="swap(this)" />';

			  }

			  return imgElement;
			}


			//funcao para montar o tabuleiro
			function montarTabuleiro() {
			  codHTML = '';
			  for (var i = 1; i <= 25; i++) {
			    codHTML += peca(i, i); // Passa a posição como argumento para a função peca()
			    arrayPecas.push(i);
			  }
			  var pecas = document.getElementsByClassName("imgs");

			  return codHTML;
			}

			//funcao para finalizar ao precionar o botao finalizar
			function finalizar() {
			  out("titulo", "Puzzle - Finalizado");
			  
			  out("tabuleiro", montarTabuleiro());
			  var img25 = refID("img25");
  			  img25.style.opacity = "1.0";
  			  jogoFinalizado = true; // Define o estado do jogo como finalizado
			  // Desabilita as peças
			  var pecas = document.getElementsByClassName("imgs");
			  for (var i = 0; i < pecas.length; i++) {
			    pecas[i].disabled = true;
			  }
			}

			//funcao para facilitar ao precionar o botao facilitar
			function facilitar(){
				jogoFinalizado = false;
				codHTML = '';
				var arrayFacilitar = [2,3,4,5,10,1,7,8,9,15,6,12,13,14,20,11,17,25,18,19,16,21,22,23,24];

				for(var i = 0; i < 25 ; i++){
					 var imgElement = '';

					  if (arrayFacilitar[i] < 10) {
					    imgElement = '<img class="imgs" id="img'+arrayFacilitar[i]+'" dataPosicao="'+i+'" src="img/'+selectedFolderName+'/' + arrayFacilitar[i] + '.jpg" onclick="swap(this)" />';
					    codHTML += imgElement;
					  } else {
					    imgElement = '<img class="imgs" id="img'+arrayFacilitar[i]+'" dataPosicao="'+i+'" src="img/'+selectedFolderName+'/' + arrayFacilitar[i] + '.jpg" onclick="swap(this)" />';
					    codHTML += imgElement;
					  }

				}
				out("titulo","Puzzle - Em Jogo Facilitado"); 		
				out("tabuleiro",codHTML);				
			}


			//funcao para baralhar ao precionar o botao baralhar
			function baralhar(){
				jogoFinalizado = false; // Define o estado do jogo como finalizado
				arrayBaralha = baralha();
				codHTML = '';
				
				for(var i = 0; i < 25 ; i++){
					 var imgElement = '';

					  if (arrayBaralha[i] < 10) {
					    imgElement = '<img class="imgs" id="img'+arrayBaralha[i]+'" dataPosicao="'+i+'" src="img/'+selectedFolderName+'/' + arrayBaralha[i] + '.jpg" onclick="swap(this)" />';
					    codHTML += imgElement;
					  } else {
					    imgElement = '<img class="imgs" id="img'+arrayBaralha[i]+'" dataPosicao="'+i+'" src="img/'+selectedFolderName+'/' + arrayBaralha[i] + '.jpg" onclick="swap(this)" />';
					    codHTML += imgElement;
					  }

				}
				out("titulo","Puzzle - Em Jogo Normal");
       			out("tabuleiro",codHTML);
			}

			
			//funcao para deixar a peca fim aparente
			function estilo(){
		        var element = refID("img25");
		        element.style.opacity = "1.0";
		    }


		    //****************************************************************//
		    //aplica uma troca aleatória de duas posições no array indicado
			function trocaAleat(array){
				//sorteia as duas posições aleatórias
				var pos1 = Math.floor(array.length * Math.random());
				var pos2 = Math.floor(array.length * Math.random());
				//salvaguarda o conteúdo na primeira posição sorteada
				var aux = array[pos1];
				//aplica a troca
				array[pos1] = array[pos2]; array[pos2] = aux;
			}
			
			//baralha o baralho de cartas indicado (aplicando 100 trocas aleatórias)
			function baralha(){
				arrayPrincipal = formaArray();
				for(var i=0; i<100; i++) trocaAleat(arrayPrincipal);
				return arrayPrincipal;
				
			}

			//***********************************************************//
			
			function swap(element) {
			  if (jogoFinalizado) {
			    return; // Retorna sem fazer nada se o jogo estiver finalizado
			  }

			  var img1 = element;
			  var img2 = refID("img25");

			  // Obtém as posições no tabuleiro das peças
			  var pos1 = parseInt(img1.getAttribute("dataPosicao"));
			  var pos2 = parseInt(img2.getAttribute("dataPosicao"));

			  // Verifica se as peças estão adjacentes
			  if(!isAdjacente(pos1,pos2)){
			    return;
			  }

			  // Troca apenas as imagens visualmente
			  var tempSrc = img1.src;
			  var tempData = img1.dataPosicao;
			  var tempId = img1.id;
			  img1.src = img2.src;
			  img2.src = tempSrc;
			  img1.id = img2.id;
			  img2.id = tempId;
			  img1.dataPosicao = img2.dataPosicao;
			  img2.dataPosicao = tempData;

			  if (verificarCompleto()) {
			    // Puzzle completo!
			    finalizar();
			  }
			}

			function verificarCompleto() {
			  var pecas = document.getElementsByClassName("imgs");
			  for (var i = 0; i < 25; i++) { 
			    var posicaoAtual = parseInt(pecas[i].id.substring(3));
			    if (posicaoAtual !== i + 1) {
			      return false; // A peça está fora de posição, o puzzle não está completo
			    }
			  }
			  return true; // Todas as peças estão na posição correta, o puzzle está completo
			}

			function isAdjacente(pos1, pos2) {
			  // Define as coordenadas x e y para cada posição
			  var x1 = Math.floor((pos1 ) / 5);
			  var y1 = (pos1 ) % 5;
			  var x2 = Math.floor((pos2 ) / 5);
			  var y2 = (pos2 ) % 5;

			  // Verifica se as peças estão diretamente ao lado, acima ou abaixo uma da outra
			  return (
			    (Math.abs(x1 - x2) === 1 && y1 === y2) ||
			    (Math.abs(y1 - y2) === 1 && x1 === x2) ||
			    (x1 === x2 && Math.abs(y1 - y2) === 1) ||
			    (y1 === y2 && Math.abs(x1 - x2) === 1)
			  );
			}

/*function selectFolder() {
    const folderInput = document.createElement('input');
    folderInput.type = 'file';
    folderInput.accept = '';
    folderInput.webkitdirectory = true; // Para o Chrome

    folderInput.addEventListener('change', function () {
        const selectedFolder = folderInput.files[0];

        if (selectedFolder) {
            selectedFolderName = selectedFolder.name;
            alert('Imagem selecionada: ' + selectedFolderName);
        } else {
            alert('Nenhuma imagem foi selecionada, escolha uma pasta com 25 imagens');
        }
    });

    folderInput.click();
}*/

function selecPuz(imageId) {
  // Armazena o ID da imagem clicada no Local Storage
  localStorage.setItem('selectedFolderName', imageId);

  // Agora você tem o nome da pasta selecionada em localStorage
/*if (selectedFolderName) {
  alert('Imagem selecionada: ' + selectedFolderName);
} else {
  alert('Nenhuma imagem foi selecionada.');
}*/
  // Chama a função para iniciar o jogo ou qualquer outra lógica que você deseja aqui
  inic();
}
