const axiosClient = axios.create({baseURL: 'http://localhost:3000'});
const selector = (tag)=>{
    return document.querySelector(tag)
}




const getAll = async ()=>{
    try{
        
        const response = await fetch("http://localhost:3000/caballeros");
        const json = await response.json();
        console.log(json);
        json.forEach(seiya => {
            let row = document.createElement("tr");
            
            row.innerHTML = `           
            <td class="col-sm-2 col-md-2 col-lg-1">${seiya.nombre}</td>
            <td class="col-sm-3 col-md-3 col-lg-1">${seiya.constelacion}</td>
            <td class="col-sm-5 col-md-5 col-lg-3">${(seiya.historia)}</td>
            
            <td class="col-sm-2 col-md-2 col-lg-1">
            <section class="d-flex  justify-content-center align-items-center btnOpciones">
            <div class="opacityIMG_Button imgHover">
            <button onclick="eliminarSeiya(${seiya.id})" class="btn btn-danger m-1" title="Eliminar Caballero"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="opacityIMG_Button imgHover">
            <button onclick="editarDatosSeiya(${seiya.id})" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#seiyaModal" title="Editar Caballero"><i class="fas fa-list-alt"></i></button>
            </div>
            
            </section>
            
            `
            row.className="paddingTr tablaColorText";
            const table = document.querySelector("#cuerpoTabla");
            table.append(row);
           
            
            
        });
    }catch(err){
        console.log(err);
    }
     

};

function agregarCaballero (event) {
    event.preventDefault();
    let name = selector("#seiyaName").value;
    let constel = selector("#seiyaConstelacion").value;
    let armadura = selector("#seiyaArmadura").value;
    
    let data = {
        "nombre": name,
        "constelacion": constel,
        "historia": armadura,
    }
    console.log(data);
}

function limpiarCamposModal (){
    
      selector("#seiyaName").value = "";
      selector("#seiyaConstelacion").value = "";
      selector("#seiyaArmadura").value = "";
    
}




document.addEventListener("DOMContentLoaded",getAll)