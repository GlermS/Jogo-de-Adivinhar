function Jogador(nome="Jogador"){
  this.nome = nome;
  this.acertos = 0;  
  this.tentativa = Math.round(Math.random()*10);
  
  this.elemento = this.criar_elemento();
  
  //Função que cria o elemento HTML e adiciona na tela
  this.criar_elemento = ()=>{
  }
  
  //Função que atualiza a tentativa do jogador
  this.nova_tentativa = ()=>{
    this.tentativa = Math.round(Math.random()*10);
  }

  //Função que registra que o jogador fez um acerto
  this.acertar = ()=>{
     this.acertos += 1;
  }
}

function Jogo(){
  //Informações do jogo
  this.nome = "Advinhação";
  this.jogadores = [];
  this.segredo = Math.round(Math.random()*10);
  
  this.elemento = this.criar_elemento;

  //Função que cria o elemento HTML e adiciona na tela
  this.criar_elemento = ()=>{
  }

  //Adicionar um novo jogador
  this.adicionar_novo_jogador = ()=>{
    let novo_jogador = new Jogador();
    this.elemento.insertAdjacentElement("beforeend", novo_jogador.elemento);
    this.jogadores.push(jogador);
  }
  
  //Verificar se alguém acertou a resposta
  this.verificar_respostas = ()=>{
    let acertos = 0;
    for (i in this.jogadores){
      if (this.jogadores[i].tentativa == this.segredo){
        console.log(this.jogadores[i].nome, "acertou!");
        this.jogadores[i].acertar();
        acertos += 1;
      }else{
        console.log(this.jogadores[i].nome, "errou sua tentativa");
      } 
    }
    if (acertos>=1){
      this.gerar_novo_segredo();
    }
  }
  
  //Gerando um novo segredo
  this.gerar_novo_segredo = ()=>{
    console.log("Gerando novo segredo");
    this.segredo = Math.round(Math.random()*10);  
  }
}