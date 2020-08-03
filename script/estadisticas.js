

if(document.querySelector(".senado")){
var camara = "senate"
}else{
  var camara ="house"
}

$(document).ready(
$.ajax({

url: `https://api.propublica.org/congress/v1/113/${camara}/members.json`,

headers: {
  "X-API-Key" : "WHGjELx6xD0KDMZ3q0Qfgk0JIiq4tkRgBYbHqQaB"
},
success: function(info){
  var data = []
  data = info.results[0].members
      miPrograma(data)
    }
  })
)



function miPrograma(data){

  
  //<----->  OBJETO  app   <----->
  
  
  var app = new Vue({
      el:'#app',
      data: {
        numeroDemocrats: '', 
        numeroRepublicans: '' ,
        numeroIndependents:'',
        
        promedioDemocrats: '',
        promedioRepublicans: '' ,
        promedioIndependents:'',
        
        totalMiembros:0,
        totalPorecentajeMiembros:0,
        
        informacion:[],
        //----------INFORMACION MIEMBROS---------- 
        miembrosMenosComprometidos:[],
        miembrosMasComprometidos:[],
    
        miembrosMenosLeales:[],
        miembrosMasLeales:[],
    
      }
    })
    
  
  // ----------------------------------------------- DATOS [Cantidad de integrantes y % de votos] -----------------------------------------------
  
  //<----->  OBTENEMOS EL VALOR DE LA CANTIDAD DE REPRESENTANTES  <----->
    let numDemo = 0
    let numRepu = 0
    let numInde = 0
  
    for(let valor of data){       // <---------    Recorremos y buscamos los miembros de cada partido
      if(valor.party == "R"){
        numRepu += 1
      }
      else if(valor.party == "D"){
      numDemo += 1
  
    }else{
      numInde += 1
      } 
    }
    app.numeroDemocrats = numDemo
    app.numeroRepublicans = numRepu        // <---------    Aqui pasamos los datos al objeto app
    app.numeroIndependents = numInde
  //<----->  OBTENEMOS EL VALOR DE LA CANTIDAD DE REPRESENTANTES  <----->
  
  

  
  
  //<----->  OBTENEMOS EL PORCENTAJE DE LA CANTIDAD DE REPRESENTANTES  <----->
    var sumaRepresDemo = 0
    var sumaRepresRepu = 0          // <---------    En estas variables Guardamos las sumas de los porcentajes de cada partido
    var sumaRepresInde = 0
    
    var porcRepresDemo=0 
    var porcRepresRepu=0  // <---------    En estas variables Guardamos los porcentajes de cada partido
    var porcRepresInde=0 
  
    for(let valor of data){
        if(valor.party == "D"){
        sumaRepresDemo += valor.votes_with_party_pct
  
      }else if(valor.party == "R"){
      sumaRepresRepu += valor.votes_with_party_pct          // <---------    En este condicional recorremos el objeto y almacenamos 
      
    }else{
      sumaRepresInde += valor.votes_with_party_pct
      }
    }
  
    porcRepresDemo = sumaRepresDemo / numDemo
    porcRepresRepu = sumaRepresRepu / numRepu      // <---------    En estas variables obtenemos el resultado de los porcentajes
    porcRepresInde = sumaRepresInde / numInde
    
    
    
    function detectarNulo(valor){      // <---------  Con esta funcion si no hay Independents en la lista su porcentaje va a ser 0.00 y no NaN
    if(isNaN(valor)){
        return 0    
    }
    return valor
}

  var porInde = detectarNulo(porcRepresInde)     // <---------    En estas variable guardo el resultado de la verificacion
  
    var finalPorDemo =  0 
    var finalPorRepre = 0                // <---------    En estas variables vamos a almacenar 
    var finalPorInde = 0
finalPorDemo = porcRepresDemo.toFixed(2)
finalPorRepre = porcRepresRepu.toFixed(2)
finalPorInde = porInde.toFixed(2) 

    app.promedioDemocrats = finalPorDemo
    app.promedioRepublicans =  finalPorRepre   // <---------     Y aqui los pasamos al objeto app
    app.promedioIndependents = finalPorInde
    
    
    
    function sumarTotalMiembros(numD,numR,numI){
     var suma = 0
     suma = numD+numR+numI                               // <---------     Esta funcion suma y calcula el total de miembros
     return suma
    }



    var sumaTotal = sumarTotalMiembros(numDemo,numRepu,numInde)            // <---------    En estas variables obtenemos el resultado de los porcentajes
    app.totalMiembros = sumaTotal                             

    



    function calcularPromedioMiembros(porD,porR,porI){
        var resultado = 0
        var divisor = 3
        var redondeo
        resultado = porD+porR+porI                               // <---------     Esta funcion suma y calcula el promedio de miembros
        resultado = resultado/3
        redondeo = resultado.toFixed(2)
        return redondeo
    }


    var promedioTotal = calcularPromedioMiembros(porcRepresDemo,porcRepresRepu,porInde)
    app.totalPorecentajeMiembros = promedioTotal                                     // <---------    En estas variables obtenemos el resultado de los porcentajes



    //<----->  OBTENEMOS EL PORCENTAJE DE LA CANTIDAD DE REPRESENTANTES  <----->
  
  // ----------------------------------------------- DATOS [Cantidad de integrantes y % de votos] -----------------------------------------------
  

  // ----------------------------------------------- Codigo Tabla general [Cantidad de integrantes y % de votos] -----------------------------------------------
function obtener10(sum_total){
  var resultado = 0
  resultado = (sum_total * 10)/100       //<---------     Esta funcion me va a calcular el 10% que necesito mostrar devolviendome un entero
  resultado.toFixed(0)
  
  return parseInt(resultado)
}




function calculoPorcentaje(numTotal,num){
    var resultado
    var redondeo

    resultado = (num * 100) / numTotal            //<---------     Esta funcion me va a calcular el porcentaje de miembros segun su asistencia
    resultado.toFixed(2)
    redondeo = resultado.toFixed(2)
    return parseFloat(redondeo)
}





function calculoVotos(porcentaje,totalVotos){
    var resultado = 0                                 //<---------     Esta funcion me va a calcular la cantidad de votos en base a los porcentajes y total de votos de cada miembro
    resultado = (totalVotos*porcentaje)/100
    resultado.toFixed(0)
    return parseInt(resultado)
}

function vacio(e){
  if(e == null){
    return 0
  }else{
    return e
  }

}






                                          //FILTRAMOS Y RELLENAMOS A LOS DIPUTADOS MENOS COMPROMETIDOS
//-----------------------------------------------------------------------------------------------------------------------------------
var arrayDiputadosMasAusentes= []                                                                    // <--- Creo un array vacio
data.map(item => {                                                                            // <---Recorro con Map el JSON y guardo cada elemento en el array
  var caja = {}                                                                                      // <--- Creo un objeto caja para almacenar la informacion
  caja.nombre = item.first_name                                                                      // <--- Tomo los datos que necesito
  caja.apellido = item.last_name
  caja.link = item.url
  caja.votosPerdidos = item.missed_votes
  caja.votosTotales = item.total_votes
  caja.porcentajeMasAusentes = detectarNulo(calculoPorcentaje(item.total_votes,item.missed_votes))    // <--- Logro hayar el porcentaje que necesito para la tabla gracias a la funcion calculoPorcentaje
  arrayDiputadosMasAusentes.push(caja)                                                                // <--- Pusheo en mi array nuevo los datos que obtube
 
  arrayDiputadosMasAusentes.sort((a,b) => b.porcentajeMasAusentes - a.porcentajeMasAusentes)          // <--- Ordeno mi array (Segun necesite)
                              // <--- Lo mando a la propiedad de mi objeto app
})

var cajaMenosComprometido= []                                                                          // <--- Creo un array nuevo

 for(var i=0; i<obtener10(sumaTotal); i++){
  cajaMenosComprometido.push(arrayDiputadosMasAusentes[i])                                             // <--- Procedemos a filtrar solo el 10%
                                                                                                      /* ¿Como lo hacemos? Bueno, primero lo primero, con la funcion obtener10 lo que hacemos es averiguar el 10% de la cantidad total de miembros*/
}                                                                                                     /*Luego iteramos en un bucle con ese valor como maximo los primeros elementos (Segun me pida)
                                                                                                      // Por ultimo  introducimos ese 105 en el array nuevo*/
 app.miembrosMenosComprometidos= cajaMenosComprometido
//-----------------------------------------------------------------------------------------------------------------------------------






                                     //FILTRAMOS Y RELLENAMOS A LOS DIPUTADOS MAS COMPROMETIDOS
//-----------------------------------------------------------------------------------------------------------------------------------
var arrayDiputadosMenosAusentes= []
data.map(item => {        
  var datos = {}
  datos.nombre = item.first_name
  datos.apellido = item.last_name
  datos.link = item.url
  datos.votosPerdidos = item.missed_votes
  datos.votosTotales = item.total_votes
  datos.porcentajeMenosAusentes = detectarNulo(calculoPorcentaje(item.total_votes,item.missed_votes))
  arrayDiputadosMenosAusentes.push(datos)
 
  arrayDiputadosMenosAusentes.sort((a,b) => a.porcentajeMenosAusentes - b.porcentajeMenosAusentes)
  
})

var cajaMasComprometido= []

 for(var i=0; i<obtener10(sumaTotal); i++){
  cajaMasComprometido.push(arrayDiputadosMenosAusentes[i])
}

 app.miembrosMasComprometidos = cajaMasComprometido
//----------------------------------------------------------------------------------------------------------------------------------------


                                          //FILTRAMOS Y RELLENAMOS A LOS DIPUTADOS MENOS LEALES
//-----------------------------------------------------------------------------------------------------------------------------------
var arrayMiembrosMenosLeales= []                                                                    // <--- Creo un array vacio
data.map(item => {                                                                            // <---Recorro con Map el JSON y guardo cada elemento en el array
  var caja = {}                                                                                      // <--- Creo un objeto caja para almacenar la informacion
  caja.nombre = item.first_name                                                                      // <--- Tomo los datos que necesito
  caja.apellido = item.last_name
  caja.link = item.url
  caja.porcentajeVotosContra = vacio(item.votes_against_party_pct)
  caja.votosTotales = item.total_votes
  caja.votosContra = detectarNulo(calculoVotos(item.total_votes, item.votes_against_party_pct))    // <--- Logro hayar el porcentaje que necesito para la tabla gracias a la funcion calculoPorcentaje
  arrayMiembrosMenosLeales.push(caja)                                                                // <--- Pusheo en mi array nuevo los datos que obtube
 
  arrayMiembrosMenosLeales.sort((a,b) => b.porcentajeVotosContra - a.porcentajeVotosContra)          // <--- Ordeno mi array (Segun necesite)

})

var cajaMenosLeales= []                                                                          // <--- Creo un array nuevo

 for(var i=0; i<obtener10(sumaTotal); i++){
  cajaMenosLeales.push(arrayMiembrosMenosLeales[i])                                             // <--- Procedemos a filtrar solo el 10%
                                                                                                      // ¿Como lo hacemos? Bueno, primero lo primero, con la funcion obtener10 lo que hacemos es averiguar el 10% de la cantidad total de miembros//
}                                                                                                     //Luego iteramos en un bucle con ese valor como maximo los primeros elementos (Segun me pida)//
                                                                                                    // Por ultimo  introducimos ese 105 en el array nuevo//
 app.miembrosMenosLeales= cajaMenosLeales
//-----------------------------------------------------------------------------------------------------------------------------------







                                          //FILTRAMOS Y RELLENAMOS A LOS DIPUTADOS MAS LEALES
//-----------------------------------------------------------------------------------------------------------------------------------
var arrayMiembrosMasLeales= []                                                                    // <--- Creo un array vacio
data.map(item => {                                                                            // <---Recorro con Map el JSON y guardo cada elemento en el array
  var caja = {}                                                                                      // <--- Creo un objeto caja para almacenar la informacion
  caja.nombre = item.first_name                                                                      // <--- Tomo los datos que necesito
  caja.apellido = item.last_name
  caja.link = item.url
  caja.porcentajeVotosPro = vacio(item.votes_with_party_pct)
  caja.votosTotales = item.total_votes
  caja.votosPro = detectarNulo(calculoVotos(item.total_votes, item.votes_with_party_pct))    // <--- Logro hayar el porcentaje que necesito para la tabla gracias a la funcion calculoPorcentaje
  arrayMiembrosMasLeales.push(caja)                                                                // <--- Pusheo en mi array nuevo los datos que obtube
 
  arrayMiembrosMasLeales.sort((a,b) => b.porcentajeVotosPro - a.porcentajeVotosPro)          // <--- Ordeno mi array (Segun necesite)

})

var cajaMasLeales= []                                                                          // <--- Creo un array nuevo

 for(var i=0; i<obtener10(sumaTotal); i++){
  cajaMasLeales.push(arrayMiembrosMasLeales[i])                                             // <--- Procedemos a filtrar solo el 10%
                                                                                                      // ¿Como lo hacemos? Bueno, primero lo primero, con la funcion obtener10 lo que hacemos es averiguar el 10% de la cantidad total de miembros//
}                                                                                                     //Luego iteramos en un bucle con ese valor como maximo los primeros elementos (Segun me pida)//
                                                                                                    // Por ultimo  introducimos ese 105 en el array nuevo//
 app.miembrosMasLeales= cajaMasLeales
//-----------------------------------------------------------------------------------------------------------------------------------




var cajaDespacho= []
data.map(item => {        
  var datos = {}
  datos.nombre = item.first_name
  datos.apellido = item.last_name
  datos.partido = item.party
  datos.estado = item.state
  datos.link = item.url
  datos.añosTrabajados = item.seniority
  datos.porcentajeConPartido = item.votes_with_party_pct
  cajaDespacho.push(datos)
   
})

var cajaFinal= []

 for(var i=0; i<cajaDespacho.length; i++){
  cajaFinal.push(cajaDespacho[i])
}

 app.informacion = cajaFinal
 console.log(app.informacion)

}
