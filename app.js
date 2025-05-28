let contenedor = document.querySelector('#RowProductos')
let canva = document.querySelector('#ContenedorCanva')
let spiner = document.querySelector('#spiner')

let url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=10`

let productos;
let nuevo = ``
let TodosProductos = []

const ejecutar = () =>{
    setTimeout(() =>{
        fetch(url).then(response => {
            return response.json()
        }).then(datos => {     
            const producto = datos.map(item => {
                return productos = {
                    name: item.title,
                    img: item.images[0],
                    price: item.price,
                    id:item.id
                }
            })

            producto.forEach(element => {
                TodosProductos.push(element)
                contenedor.innerHTML += card(element)
            });
        
        }).catch(error => {
            alert('Ocurrio un error')
            console.error('error', error)
        }).finally(()=>{
            spiner.className='spinner-none'
            if(localStorage.length>0){
                canva.innerHTML += localStorage.getItem('NuevoProducto' || '')
            }
        })
    },0.5000)
}

ejecutar()

const card = (producto) => {
    return `
    <div class="col-12 col-md-4 col-lg-3 mb-3">
        <div class="card" style="width: 18rem;" id=${producto.id} >
            <img src="${producto.img}" class="card-img-top" alt="${producto.name}">
            <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">Precio: ${producto.price}</p>
                <button class="btn AñadirAlCarrito" onclick="datosCanvaEnviar('<strong>Producto:</strong>${producto.name},<strong> Precio:</strong> ${producto.price}, <strong>Imagen:</strong> ${producto.img}')" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight">Añadir al carrito</button>
            </div>
        </div>
    </div>
    `
}


const datosCanvaEnviar = (prod) => {
    let pro =
        `<div class="card mb-3" style="width: 18rem;">
            <div class="card-body">
                <p class="card-text">${prod}</p>
                <button class="btn AñadirAlCarrito" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight">Añadir al carrito</button>
            </div>
        </div>`

    nuevo += localStorage.setItem('NuevoProducto', pro)

    nuevo = localStorage.getItem('NuevoProducto' || '')

    canva.innerHTML += nuevo
}



