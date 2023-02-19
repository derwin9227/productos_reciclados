let selectedFile;
let template = (nombre, cedula, producto, kilos=0, precio=0, total=0) => `
        <h2 class="nombreReciclador">nombre: ${nombre}</h2>
        <h3 class="cedula">cedula: ${cedula}</h3>
        <h4 class="producto">ID prodcuto: ${producto}</h4>
            <li class="kilos">kilos: ${kilos}</li>
            <li class="precio">precio: ${precio}</li>
            <li class="total">total: ${total}</li>
        </div>`;
let contenedor = document.querySelector(".contenedor");
document
  .getElementById("fileUpload")
  .addEventListener("change", function(event) {
    selectedFile = event.target.files[0];
  });
document
  .getElementById("uploadExcel")
  .addEventListener("click", function() {
    if (selectedFile) {
      var fileReader = new FileReader();
      fileReader.onload = function(event) {
        var data = event.target.result;

        var workbook = XLSX.read(data, {
          type: "binary"
        });
        let hojaJson;
        workbook.SheetNames.forEach(sheet => {
          hojaJson = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
          /* let jsonObject = JSON.stringify(rowObject);
          document.getElementById("jsonData").innerHTML = jsonObject; */
        });
        //alert("cargo");
        const filtradoCedula = new Set();
        let kilosTotales=0;
        hojaJson.forEach(item => filtradoCedula.add(item.Cédula));
        const listaCedulas = Array.from(filtradoCedula).sort().reverse();
            //contenedor.innerHTML += template(e.Nombre, e.Cédula, e.Material_ID, e["Total Kg Chatarra"], e["Precio Chatarra"], e["Total Precio Chatarra"]);
            //console.log(`nombre ${e.Nombre} kilos chatarra ${e["Total Kg Chatarra"]}`);
        const totales =[];

        for(let i=0; i<listaCedulas.length;i++){
            let ac=0;
            hojaJson.forEach(item => {
                if(listaCedulas[i]===item.Cédula){
                    ac+=item["Total Kg Chatarra"];
                }
            });
            totales.push({cedula: listaCedulas[i],totalKilos: ac});
        }
        console.log(totales);
          
        
      };

      fileReader.readAsBinaryString(selectedFile)

    }
  });



