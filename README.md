# :chart_with_upwards_trend: LIVE PUBLIC SERVER :chart_with_downwards_trend:

La web tiene como finalidad mostrar información de una API, la cual vamos a representar en distintas tablas, para mostrar diferentes datos puntuales que se requieren para poder evaluar el objetivo que necesitamos. 
Procedemos a mostrar las tablas y describir que función cumple cada una: 


##  :clipboard: 1er TABLA :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| **Datos Personales [Nombre, Apellido, Segundo Nombre]**|  **Datos Personales [Nombre, Apellido, Segundo Nombre]**  |
| **Partido politico** | **Partido politico**   |
| **Estado** | **Estado** |
| **Partido politico** | **Partido politico** |
| **Años en actividad** |  **Años en actividad** |
| **Porcentaje % de votos por partido** |  **Porcentaje % de votos por partido** |
###### DESCRIPCCIÓN --> [Al recibir la información de la API en formato JSON con los datos de cada representante lo que hacemos es filtrar y usar solamente los datos que están descriptos en el cuadro]

![cuadro 1](https://user-images.githubusercontent.com/62455807/89721371-2583f600-d9b3-11ea-9bf2-764ab3af82d8.png)


##  :clipboard: 2do TABLA :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| **Miembros por partido**|  **Miembros por partido**  |
| **Numero total de representantes** |  **Numero total de representantes**   |
| **Promedio % de votos por partido** | **Promedio % de votos por partido** |
###### DESCRIPCCIÓN --> [Confeccionamos una tabla general con la cantidad de representantes filtrando el JSON y obteniendo la cantidad de miembros por partido y el promedio de votos por partido]


![cuadro 2](https://user-images.githubusercontent.com/62455807/89721421-c70b4780-d9b3-11ea-8cb5-08c5e9f78746.png)



## :clipboard: 3er TABLA :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| **Datos de los representantes Datos de los representantes**  |
| **Cantidad de votos ausentes - Cantidad votos totales** | **Cantidad de votos ausentes - Cantidad votos totales** | 
| **Promedio % de ausencia** | **Promedio % de ausencia** |
###### DESCRIPCCIÓN --> [En esta tabla vamos a representar el 10% de la cantidad de representantes que se ausentaron y los cuales tienen el mayor porcentaje de ausencias en el total de las sesiones]


![cuadros menos ausentes](https://user-images.githubusercontent.com/62455807/89721412-99260300-d9b3-11ea-89bc-545d7f9b5f67.png)




## :clipboard: 4er TABLA :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| **Datos de los representantes Datos de los representantes**  |
| **Cantidad de votos ausentes - Cantidad votos totales** | **Cantidad de votos ausentes - Cantidad votos totales** | 
| **Promedio % de ausencia** | **Promedio % de ausencia** |
###### DESCRIPCCIÓN --> [En esta tabla vamos a representar el 10% de la cantidad de representantes que menos ausentaron y los cuales tienen el menor porcentaje de ausencias en el total de las sesiones]


![cuadros menos ausentes](https://user-images.githubusercontent.com/62455807/89721441-e30ee900-d9b3-11ea-9372-05a67e9294ac.png)




## :clipboard: 5ta TABLA :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| **Datos de los representantes Datos de los representantes**  |
| **Cantidad de votos contra - Cantidad votos totales** | **Cantidad de votos contra - Cantidad votos totales** | 
| **Porcentaje % de lealtad** | **Porcentaje % de lealtad** |
###### DESCRIPCCIÓN --> [En esta tabla vamos a representar el 10% de la cantidad de representantes que menos leales y los cuales tienen el mayor porcentaje de votos en contra de su partido en el total de las sesiones] 


![cuadro menos leal](https://user-images.githubusercontent.com/62455807/89721451-f3bf5f00-d9b3-11ea-91e6-8e055a4cd287.png)



## :clipboard: 6ta TABLA :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| **Datos de los representantes Datos de los representantes**  |
| **Cantidad de votos a favor - Cantidad votos totales** | **Cantidad de votos a favor - Cantidad votos totales** | 
| **Porcentaje % de lealtad** | **Porcentaje % de lealtad** |
###### DESCRIPCCIÓN --> [En esta tabla vamos a representar el 10% de la cantidad de representantes que mas leales y los cuales tienen el mayor porcentaje de votos en a favor de su partido en el total de las sesiones] 

![cuadro mas leal](https://user-images.githubusercontent.com/62455807/89721457-06399880-d9b4-11ea-8337-832afc4af259.png)


## :computer: Detalles del codigo :computer:
###### Conexión a la API (Con AJAX)
```ruby

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
  
```


###### Metemos la información en una variable implementando VUE.js
```ruby
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
```




###### Incrustamos las variables en el HTML y recorremos con un [v-for] en el HTML implementando VUE.js
```ruby
<tbody id="mostLoyal" v-for="diptadosMasL in miembrosMasLeales">
          <th scope="row"><a v-bind:href="diptadosMasL">{{diptadosMasL.nombre}} , {{diptadosMasL.apellido}}</a></th>
            <td>{{diptadosMasL.votosPro}} of {{diptadosMasL.votosTotales}}</td>
            <td>{{diptadosMasL.porcentajeVotosPro}}%</td> 
```



## :page_with_curl: Requisitos :page_with_curl:

Navegadores necesarios para correr la web:
- Mozilla Firefox 
- Google Chrome 
- Opera 
- Microsoft Edge

## 🛠️ Herramientas usadas 🛠️

* [Boostrap](https://getbootstrap.com/) - ``Framework Front-End``
* [Vue.js] (https://vuejs.org/)  - ``Framework de Javascript``
* [API Pro Publica] - (https://projects.propublica.org/api-docs/congress-api/members/) - ``API (Tomamos la información de aqui)``
## ✒️ Autor ✒️

* **Martin Cumpe** - [tincho3604](https://github.com/Tincho3604)

## 🎁 ¡Agradecimientos !🎁

* Este proyecto fue desarrollado en el bootcamp de Mindhub, como parte del desarrollo en el modulo (Desarrollo web Javascript) 📢
* Da las gracias públicamente a Fernando Biaus por ser el tutor y profesor que me guio en este proyecto🤓 .


