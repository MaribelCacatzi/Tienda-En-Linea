let contenedor = document.querySelector('#RowProductos')
let canva = document.querySelector('#ContenedorCanva')
let spiner = document.querySelector('#spiner')

let url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=10`

let productos;
let nuevo = ``

const ejecutar = () =>{
    setTimeout(() =>{
        fetch(url).then(response => {
            return response.json()
        }).then(datos => {
            console.log(datos)
        
            const producto = datos.map(item => {
                return productos = {
                    name: item.title,
                    img: item.images,
                    price: item.price
                }
            })
        
            producto.forEach(element => {
                contenedor.innerHTML += card(element)
            });
        
        }).catch(error => {
            alert('Ocurrio un error')
            console.error('error', error)
        }).finally(()=>{
            spiner.className='spinner-none'
        })
    },1000)
}

ejecutar()

const card = (producto) => {
    return `
    <div class="col-12 col-md-4 col-lg-3 mb-3">
        <div class="card" style="width: 18rem; height:;">
            <img src="${producto.img}" class="card-img-top" alt="${producto.name}">
            <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">Precio: ${producto.price}</p>
                <button class="btn AñadirAlCarrito" onclick="datosCanvaEnviar('Producto:${producto.name}, Precio: ${producto.price}, Imagen: ${producto.img}')" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight">Añadir al carrito</button>
            </div>
        </div>
    </div>
    `
}

const datosCanvaEnviar = (producto) => {
    let pro = `
        <div class="card mb-3" style="width: 18rem;">
            <p class="card-title">${producto}</p>
        </div>
    `
    localStorage.setItem('NuevoProducto', pro)
    canva.innerHTML += localStorage.getItem('NuevoProducto' || '')
}

canva.innerHTML += localStorage.getItem('NuevoProducto' || '')

