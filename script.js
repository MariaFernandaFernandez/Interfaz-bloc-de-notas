const esGitHubPages = window.location.hostname.includes('github.io');

function guardarNota() {
  const titulo = document.getElementById('titulo').value.trim();
  const texto = document.getElementById('nota').value.trim();

  if (!titulo || !texto) {
    alert('Por favor escribe un título y una nota.');
    return;
  }

  if (esGitHubPages) {
    alert("💡 Esta es una demo visual.\n\nLas notas no se guardan en esta versión publicada.");
    return;
  }

  fetch('http://localhost:4000/notas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, texto })
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al guardar');
      document.getElementById('titulo').value = '';
      document.getElementById('nota').value = '';
      cargarNotas();
    })
    .catch(err => alert('Error al guardar'));
}

function eliminarNota(index) {
  if (esGitHubPages) {
    alert("💡 Esta es una demo. No puedes eliminar notas en esta versión.");
    return;
  }

  fetch(`http://localhost:4000/notas/${index}`, {
    method: 'DELETE'
  })
    .then(() => cargarNotas())
    .catch(err => alert('Error al eliminar'));
}

function cargarNotas() {
  if (esGitHubPages) return;

  fetch('http://localhost:4000/notas')
    .then(res => res.json())
    .then(notas => {
      const lista = document.getElementById('listaNotas');
      lista.innerHTML = '';
      notas.forEach((nota, index) => {
        const div = document.createElement('div');
        div.className = 'nota';
        div.innerHTML = `
          <button onclick="eliminarNota(${index})">×</button>
          <h3>${nota.titulo}</h3>
          <p>${nota.texto}</p>
        `;
        lista.appendChild(div);
      });
    });
}

window.onload = cargarNotas;
