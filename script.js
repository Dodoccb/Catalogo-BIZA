const csvUrl = 'https://raw.githubusercontent.com/Dodoccb/Catalogo-BIZA/main/FOR.BIZA.SGI.csv';
let dadosOriginais = [];

// Cria visualmente o card
function criarCard(obj) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <h3>Ideia #${obj["Item"]}</h3>
    <p><strong>Status:</strong> ${obj["Status"]}</p>
    <p><strong>Data:</strong> ${obj["Data da Ideia"]}</p>
    <p><strong>Descrição:</strong> ${obj["Descrição da Ideia de Melhoria (O que / Como)"]}</p>
    <p><strong>Agente:</strong> ${obj["Agente da Melhoria"]}</p>
  `;
  return div;
}

// Renderiza os cards com base nos filtros
function renderizar() {
  const container = document.getElementById('cards');
  container.innerHTML = '';

  const statusSelecionado = document.getElementById('statusFilter').value;
  const termoBusca = document.getElementById('pesquisa').value.toLowerCase();

  const filtrados = dadosOriginais.filter(d => {
    const statusOk = !statusSelecionado || d["Status"] === statusSelecionado;
    const textoCard = `${d["Item"]} ${d["Status"]} ${d["Data da Ideia"]} ${d["Descrição da Ideia de Melhoria (O que / Como)"]} ${d["Agente da Melhoria"]}`.toLowerCase();
    const pesquisaOk = textoCard.includes(termoBusca);
    return statusOk && pesquisaOk;
  });

  filtrados.forEach(d => container.appendChild(criarCard(d)));
}

// Evento ao mudar o filtro de status
document.getElementById('statusFilter').addEventListener('change', renderizar);

// Evento ao digitar na pesquisa
document.getElementById('pesquisa').addEventListener('input', renderizar);

// Carrega os dados do CSV uma vez e armazena em memória
Papa.parse(csvUrl, {
  download: true,
  header: true,
  complete: result => {
    dadosOriginais = result.data;
    renderizar();
  }
});
