var datosGuardados = JSON.parse(localStorage.getItem('miLista')) || [];
var listaElemento = document.getElementById('lista');

datosGuardados.forEach(function(item) {
  var nuevoElemento = document.createElement('li');
  
  nuevoElemento.innerHTML = `
      <p>Usuario: ${item.usuario}</p>
      <p>Descripción: ${item.descripcion}</p>
      <img src="${item.imagen || 'img/pingu_6-removebg-preview.png'}" alt="Imagen del usuario">
    `;
  
  listaElemento.appendChild(nuevoElemento);
});

async function agregarElemento() {
    var usuario = document.getElementById('usuario').value;
    var descripcion = document.getElementById('descripcion').value;

    var imagenInput = document.getElementById('imagen');
    var imagenFile = imagenInput.files[0];

    if (!usuario || !descripcion || !imagenFile) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    var nuevoDato = {
        usuario: usuario,
        descripcion: descripcion,
        imagen: await convertirImagenABase64(imagenFile)
    };

    var nuevoElemento = document.createElement('li');
    nuevoElemento.innerHTML = `
      <p>Usuario: ${usuario}</p>
      <p>Descripción: ${descripcion}</p>
      <img src="${nuevoDato.imagen || 'img/pingu_6-removebg-preview.png'}" alt="Imagen del usuario">
    `;

    listaElemento.appendChild(nuevoElemento);

    datosGuardados.push(nuevoDato);
    localStorage.setItem('miLista', JSON.stringify(datosGuardados));

    document.getElementById('usuario').value = '';
    document.getElementById('descripcion').value = '';
    imagenInput.value = '';
}

function convertirImagenABase64(imagenFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(imagenFile);
    });
}
