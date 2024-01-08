var datosGuardados = JSON.parse(localStorage.getItem('miLista')) || [];
var tarjetasContainer = document.getElementById('tarjetas');
var campoBusqueda = document.getElementById('campoBusqueda');

function actualizarTarjetas() {
    var terminoBusqueda = campoBusqueda.value.toLowerCase();

    var resultadosFiltrados = datosGuardados.filter(function (item) {
        return item.usuario.toLowerCase().includes(terminoBusqueda);
    });

    tarjetasContainer.innerHTML = "";
    resultadosFiltrados.forEach(function (item, index) {
        var tarjetaHtml = `
        <div class="col-md-4">
            <div class="card border-light mb-3">
                <div class = "row g-0 justify-content-end">
                    <a class="btn btn-info" href="registrar.html" style="max-width: 2em;">
                        <i class="bi bi-pencil-fill"></i>
                    </a>
                    <button class="btn btn-danger" style="max-width: 2em;" onclick="confirmarEliminacion(${index})">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </div>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${item.imagen}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.usuario}</h5>
                            <p class="card-text">Descripción:<br> ${item.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        tarjetasContainer.innerHTML += tarjetaHtml;
    });
}

campoBusqueda.addEventListener('input', actualizarTarjetas);

function confirmarEliminacion(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
        eliminarItem(index);
    }
}

function eliminarItem(index) {
    datosGuardados.splice(index, 1);
    localStorage.setItem('miLista', JSON.stringify(datosGuardados));
    actualizarTarjetas();
}

actualizarTarjetas();