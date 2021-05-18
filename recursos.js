function Jogador(nome="Jogador"){
  //Informações do jogador
  this.nome = nome;
  this.acertos = 0;  
  this.tentativa = Math.round(Math.random()*10);

  //Função que cria o elemento HTML e adiciona na tela
  this.criar_elementos = ()=>{
    var container = document.createElement("div");
    var titulo = document.createElement("h2");
    var input = document.createElement("input");
    var botao_atualizar_tentativa = document.createElement("button");
    var tentativa = document.createElement("p");
    var acertos = document.createElement("p");

    container.id = "jogador_"+this.nome;
    titulo.innerText = this.nome;
    botao_atualizar_tentativa.innerText = "Atualizar tentativa";
    tentativa.innerText = "Sua tentativa atual: "+ this.tentativa;
    acertos.innerText = "Seu total de acertos: " + this.acertos;


    container.insertAdjacentElement("beforeend", titulo);
    container.insertAdjacentElement("beforeend", input);
    container.insertAdjacentElement("beforeend", botao_atualizar_tentativa);
    container.insertAdjacentElement("beforeend", tentativa);
    container.insertAdjacentElement("beforeend", acertos);
   
    
    return {container:container, titulo:titulo, input:input, 
	   bt_atualizar:botao_atualizar_tentativa, p_tentativa: tentativa, p_acertos: acertos};

  }
  this.elementos = this.criar_elementos();
  
  //Função que atualiza a tentativa do jogador
  this.nova_tentativa = ()=>{
    this.tentativa = this.elementos.input.value;
    this.elementos.p_tentativa.innerText = "Sua tentativa atual: "+ this.tentativa;
  }
  this.elementos.bt_atualizar.onclick = this.nova_tentativa;    

  //Função que registra que o jogador fez um acerto
  this.acertar = ()=>{
     this.acertos += 1;
     this.elementos.p_acertos.innerText = "Seu total de acertos: " + this.acertos;
     this.elementos.titulo.style.color = "green";
  }
  //Função que registra que o jogador fez um erro
  this.errar = ()=>{
     this.elementos.titulo.style.color = "red";
  }
}

function Jogo(){
  //Informações do jogo
  this.nome = "Jogo de adivinhar";
  this.jogadores = [];
  this.segredo = Math.round(Math.random()*10);

  //Função que cria o elemento HTML e adiciona na tela
  this.criar_elementos = ()=>{
    var container = document.createElement("div");
    var titulo = document.createElement("h1");
    var input = document.createElement("input");
    var botao_novo_jogador = document.createElement("button");
    var botao_verificar_respostas = document.createElement("button");

    container.id = "game";
    titulo.innerText = this.nome;
    input.id = "nome_jogador";
    botao_novo_jogador.id = "adicionar_jogador";
    botao_novo_jogador.innerText = "Adicionar jogador";
    botao_verificar_respostas.id = "verificar";
    botao_verificar_respostas.innerText = "Verificar respostas";

    container.insertAdjacentElement("beforeend", titulo);
    container.insertAdjacentElement("beforeend", input);
    container.insertAdjacentElement("beforeend", botao_novo_jogador);
    container.insertAdjacentElement("beforeend", botao_verificar_respostas);
    
    document.body.insertAdjacentElement("beforeend", container);
    
   return {container:container, titulo:titulo, input:input, 
	   bt_novo_jogador:botao_novo_jogador, bt_verificar_respostas:botao_verificar_respostas};
  }
  this.elementos = this.criar_elementos();

  //Adicionar um novo jogador
  this.adicionar_novo_jogador = (evento)=>{
    evento.preventDefault();
    let nome = this.elementos.input.value
    let novo_jogador = new Jogador(nome);
    this.elementos.container.insertAdjacentElement("beforeend", novo_jogador.elementos.container);
    this.jogadores.push(novo_jogador);
  }
  this.elementos.bt_novo_jogador.onclick = this.adicionar_novo_jogador;
  
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
        this.jogadores[i].errar();
      } 
    }
    if (acertos>=1){
      this.gerar_novo_segredo();
    }
  }
  this.elementos.bt_verificar_respostas.onclick = this.verificar_respostas;

  //Gerando um novo segredo
  this.gerar_novo_segredo = ()=>{
    console.log("Gerando novo segredo");
    this.segredo = Math.round(Math.random()*10);  
  }
}