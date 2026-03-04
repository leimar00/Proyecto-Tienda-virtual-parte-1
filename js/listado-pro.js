// variables globales
let tablePro = document.querySelector("#table-pro tbody");
let searchInput = document.querySelector("#search-input");

//evento para probar el campo de buscar 
searchInput.addEventListener("keyup", ()=> {
    console.log(searchInput.value);
})

// evento para el navegador
document.addEventListener("DOMContentLoaded", ()=> {
    getTableData();
});


//funcion para traer los datos de la BD a la tabla
let getTableData = async ()=> {
    let url = "http://localhost:3000/api/productos";
    try {

        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        
        if(respuesta.status === 204){
            console.log("No hay datos en la BD");

        }else{
            let tableData = await respuesta.json();
            console.log(tableData);
            // agregar los datos a LocalStorage
            localStorage.setItem("datosTabla", JSON.stringify(tableData));


            // agregar los datos a la tabla
            tableData.forEach((prod, i) => {
                let row = document.createElement("tr");
                row.innerHTML= ` 
                        <td> ${i+1} </td>
                        <td> ${prod.nombre} </td>
                        <td> ${prod.descripcion} </td>
                        <td> ${prod.precio} </td>
                        <td> ${prod.stock} </td>
                        <td> <img src= "${prod.imagen}" width="100px"></td>
                        <td><button id="btn-edit" onclick="editDataTable(${i})" type="button" class="btn btn-warning m-3"> Editar </button>
                            <button id="btn-delete" onclick="deleteDataTable(${i})" type="button" class="btn btn-danger"> Eliminar </button>
                        </td>
                `;
                tablePro.appendChild(row);
            });
        }
    } catch (error) {
        console.log(error);
    }
}


//funciona para editar algun producto de la tabla
let editDataTable = ( pos )=> {
    let products = [];
    let productsSaved = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSaved != null) {
        products = productsSaved;
    }
    let singleProduct = products[pos];
    //console.log(singleProduct)
    localStorage.setItem("productEdit", JSON.stringify(singleProduct));
    localStorage.removeItem("datosTabla");
    location.href = "http://127.0.0.1:5500/Proyecto-Tienda-virtual-parte-1/crear-pro.html";

}


//funcion para eliminar algun producto de la tabla
let deleteDataTable = ( pos )=> {
    let products = [];
    let productsSaved = JSON.parse(localStorage.getItem("datosTabla"));
    if (productsSaved != null) {
        products = productsSaved;
    }
    let singleProduct = products[pos];
    //console.log( "Producto a eliminar: " + singleProduct.nombre );
    let IDProduct = {
        id : singleProduct.id
    }
    let confirmar = confirm(`¿Deseas eliminar ${singleProduct.nombre} ?`);
    if (confirmar){
        // llamar la función para realizar la petición
        sendDeleteProduct( IDProduct );
    }
}

// funcion para realizar la peticion de eliminar un producto
let sendDeleteProduct = async ( id ) => {
    let url = `http://localhost:3000/api/productos/${id.id}`;
    try {

        let respuesta = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
        
    });
        if(respuesta.status === 406){
            alert("El ID enviado no fue admitido");
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}