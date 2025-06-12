const csvUrl = 'https://raw.githubusercontent.com/Dodoccb/Catalogo-BIZA/main/FOR.BIZA.SGI.csv';

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

function renderizar(dados) {
  const container = document.getElementById('cards');
  container.innerHTML = '';
  const filtro = document.getElementById('filtroStatus').value;
  dados
    .filter(d => !filtro || d["Status"] === filtro)
    .forEach(d => container.appendChild(criarCard(d)));
}

document.getElementById('filtroStatus').addEventListener('change', () => {
  Papa.parse(csvUrl, { download: true, header: true, complete: r => renderizar(r.data) });
});

Papa.parse(csvUrl, { download: true, header: true, complete: r => renderizar(r.data) });
