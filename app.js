let contenedor = document.querySelector('#RowProductos')
let canva = document.querySelector('#ContenedorCanva')

let url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=10`

let productos;

fetch(url).then(response =>{
    return response.json()
}).then(datos =>{
    console.log(datos)

    const producto = datos.map(item =>{
        return productos = {
            name: item.category.name,
            img: item.category.image,
            precio: item.price
        } 
    })
    
    producto.forEach(element => {
        contenedor.innerHTML+= card(element)
    });

}).catch(error =>{
    console.error('error', error)
})

const card = (producto) =>{
    return `
    <div class="col-12 col-md-4 col-lg-3 mb-3">
        <div class="card" style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top" alt="${producto.name}">
            <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">Precio: ${producto.precio}</p>
                <button class="btn AñadirAlCarrito" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight">Añadir al carrito</button>
            </div>
        </div>
    </div>
    `
}

const datosCanva = (producto) =>{
    let pro= `
    <div class="col-12 col-md-4 col-lg-3 mb-3">
        <div class="card" style="width: 10rem;">
            <img src="${producto.img}" class="card-img-top" alt="${producto.name}">
            <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">Precio: ${producto.precio}</p>
                <button class="btn AñadirAlCarrito" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight">Añadir al carrito</button>
            </div>
        </div>
    </div>
    `
    localStorage.setItem('NuevoProducto', JSON.stringify(pro))
}