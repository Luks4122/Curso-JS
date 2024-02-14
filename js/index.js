const productos = [
    // FromSoftware  - - - - - - - - - - - - - - - - - - - - -
    {
        id: "dark-souls-1",
        titulo: "Dark Souls Remastered",
        imagen: "./img/fromsoftware/ds1.jpg",
        categoria: {
            nombre: "FromSoftware",
            id: "fromsoftware",
        },
        precio: 40
    },
    {
        id: "dark-souls-2",
        titulo: "Dark Souls II",
        imagen: "./img/fromsoftware/ds2.jpg",
        categoria: {
            nombre: "FromSoftware",
            id: "fromsoftware",
        },
        precio: 40
    },
    {
        id: "dark-souls-3",
        titulo: "Dark Souls III",
        imagen: "./img/fromsoftware/ds3.jpg",
        categoria: {
            nombre: "FromSoftware",
            id: "fromsoftware",
        },
        precio: 60
    },
    {
        id: "bloodborne",
        titulo: "Bloodborne",
        imagen: "./img/fromsoftware/bloodborne-noenpc.jpg",
        categoria: {
            nombre: "FromSoftware",
            id: "fromsoftware",
        },
        precio: 20
    }
    // Capcom  - - - - - - - - - - - - - - - - - - - - -
    ,
    {
        id: "dmc-collection",
        titulo: "DMC HD COLLECTION",
        imagen: "./img/capcom/dmc-hd-collection.jpg",
        categoria: {
            nombre: "Capcom",
            id: "capcom",
        },
        precio: 30
    },
    {
        id: "dmc-4",
        titulo: "DMC 4",
        imagen: "./img/capcom/dmc4.jpg",
        categoria: {
            nombre: "Capcom",
            id: "capcom",
        },
        precio: 20
    },
    {
        id: "dmc-4-se",
        titulo: "DMC 4 SE",
        imagen: "./img/capcom/dmc4-se.jpg",
        categoria: {
            nombre: "Capcom",
            id: "capcom",
        },
        precio: 25
    },
    {
        id: "dmc-5",
        titulo: "DMC 5",
        imagen: "./img/capcom/dmc5.jpg",
        categoria: {
            nombre: "Capcom",
            id: "capcom",
        },
        precio: 30
    }
    //God of War - - - - - - - - - - - - - - - - - - - - -
    ,
    {
        id: "gow-collection",
        titulo: "God of War Collection",
        imagen: "./img/sm-studio/gow-collection.jpg",
        categoria: {
            nombre: "Santa Monica",
            id: "santamonica",
        },
        precio: 25
    },
    {
        id: "gow-3",
        titulo: "God of War III",
        imagen: "./img/sm-studio/gow3.jpg",
        categoria: {
            nombre: "Santa Monica",
            id: "santamonica",
        },
        precio: 20
    },
    {
        id: "gow-ascension",
        titulo: "God of War Ascension",
        imagen: "./img/sm-studio/gow-ascension.jpg",
        categoria: {
            nombre: "Santa Monica",
            id: "santamonica",
        },
        precio: 25
    },
    {
        id: "gow-2018",
        titulo: "God of War (2018)",
        imagen: "./img/sm-studio/gow-2018.jpg",
        categoria: {
            nombre: "Santa Monica",
            id: "santamonica",
        },
        precio: 50
    }
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector ("#titulo-principal");
let botonesAgregar = document.querySelectorAll (".producto-agregar");
const numerito = document.querySelector("#numerito");





function cargarProductos (productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">
                    ${producto.titulo}
                </h3>
                <p class="producto-precio">
                    $${producto.precio}
                </p>
                <button class="producto-agregar" id="${producto.id}">
                    Agregar
                </button>
            </div>
        `;

        contenedorProductos.append(div);
        
    })

    actualizarBotonesAgregar();
    console.log(botonesAgregar);

}

cargarProductos(productos);

botonesCategorias.forEach(boton =>{
    boton.addEventListener ("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;


            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);

        } else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
})

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosEnCarrito = [];

function agregarAlCarrito (e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);

    }

    actualizarNumerito();
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
} 