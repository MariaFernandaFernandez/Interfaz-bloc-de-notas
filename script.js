const backendURL = 'http://localhost:4000/notas';

function guardarNota() {
  const titulo = document.getElementById('titulo').value.trim();
  const texto = document.getElementById('nota').value.trim();

  if (!titulo || !texto) {
    alert('Por favor escribe un título y una nota.');
    return;
  }

  fetch(backendURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, texto })
  })
    .then(() => {
      document.getElementById('titulo').value = '';
      document.getElementById('nota').value = '';
      cargarNotas();
    })
    .catch(err => alert('Error al guardar'));
}

function eliminarNota(index) {
  fetch(`${backendURL}/${index}`, {
    method: 'DELETE'
  })
    .then(() => cargarNotas())
    .catch(err => alert('Error al eliminar'));
}

function cargarNotas() {
  fetch(backendURL)
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
