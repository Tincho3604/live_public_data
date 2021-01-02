# :chart_with_upwards_trend: LIVE PUBLIC SERVER :chart_with_downwards_trend:

The purpose of the web is to show information from an API, which we are going to represent in different tables, to show different specific data that are required to be able to evaluate the objective we need.
We proceed to show the tables and describe what function each one fulfills:


##  :clipboard: 1st TABLE :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| ** Personal Data [Name, Surname, Middle Name] ** | ** Personal Data [Name, Surname, Middle Name] ** |
| ** Political party ** | ** Political party ** |
| ** Status ** | ** Status ** |
| ** Political party ** | ** Political party ** |
| ** Years in activity ** | ** Years in activity ** |
| ** Percentage of votes per party ** | ** Percentage of votes per party ** |
_DESCRIPTION -> [Upon receiving the API information in JSON format with the data of each representative, what we do is filter and use only the data that is described in the table] _

![cuadro 1](https://user-images.githubusercontent.com/62455807/89721371-2583f600-d9b3-11ea-9bf2-764ab3af82d8.png)


##  :clipboard: 2do TABLE :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| ** Members per game ** | ** Members per game ** |
| ** Total number of representatives ** | ** Total number of representatives ** |
| ** Average% of votes per party ** | ** Average% of votes per party ** |
_DESCRIPTION -> [We made a general table with the number of representatives filtering the JSON and obtaining the number of members per party and the average of votes per party]._


![cuadro 2](https://user-images.githubusercontent.com/62455807/89721421-c70b4780-d9b3-11ea-8cb5-08c5e9f78746.png)



## :clipboard: 3er TABLE :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| ** Data of the representatives Data of the representatives ** |
| ** Number of absent votes - Number of total votes ** | ** Number of absent votes - Number of total votes ** |
| ** Average% of absence ** | ** Average% of absence ** |
_DESCRIPTION -> [In this table we are going to represent 10% of the number of representatives who were absent and which have the highest percentage of absences in the total of the sessions]._


![cuadros menos ausentes](https://user-images.githubusercontent.com/62455807/89721412-99260300-d9b3-11ea-89bc-545d7f9b5f67.png)




## :clipboard: 4ta TABLE :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| ** Data of the representatives Data of the representatives ** |
| ** Number of votes absent - Number of total votes ** | ** Number of votes absent - Number of total votes ** |
| ** Average% of absence ** | ** Average% of absence ** |
_DESCRIPTION -> [In this table we are going to represent the 10% of the number of representatives who were absent the least and who have the lowest percentage of absences in the total of the sessions]._


![cuadros menos ausentes](https://user-images.githubusercontent.com/62455807/89721441-e30ee900-d9b3-11ea-9372-05a67e9294ac.png)




## :clipboard: 5ta TABLE :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| ** Data of the representatives Data of the representatives ** |
| ** Number of votes against - Number of total votes ** | ** Number of votes against - Number of total votes ** |
| ** Loyalty percentage% ** | ** Loyalty percentage% ** |
_DESCRIPTION -> [In this table we are going to represent 10% of the number of representatives who are least loyal and who have the highest percentage of votes against their party in the total number of sessions]._


![cuadro menos leal](https://user-images.githubusercontent.com/62455807/89721451-f3bf5f00-d9b3-11ea-91e6-8e055a4cd287.png)



## :clipboard: 6ta TABLE :clipboard:
| SENATE | HOUSE |
| ------------- | ------------- |
| ** Data of the representatives Data of the representatives ** |
| ** Number of votes in favor - Number of total votes ** | ** Number of votes in favor - Number of total votes ** |
| ** Loyalty percentage% ** | ** Loyalty percentage% ** |
_DESCRIPTION -> [In this table we are going to represent 10% of the number of representatives who are most loyal and who have the highest percentage of votes in favor of their party in all sessions]._

![cuadro mas leal](https://user-images.githubusercontent.com/62455807/89721457-06399880-d9b4-11ea-8337-832afc4af259.png)


## :computer: Code details :computer:
###### API connection (With AJAX)
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


###### We put the information in a variable implementing VUE.js.
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




###### We embed the variables in the HTML and we go through with a [v-for] in the HTML implementing VUE.js.
```ruby
<tbody id="mostLoyal" v-for="diptadosMasL in miembrosMasLeales">
          <th scope="row"><a v-bind:href="diptadosMasL">{{diptadosMasL.nombre}} , {{diptadosMasL.apellido}}</a></th>
            <td>{{diptadosMasL.votosPro}} of {{diptadosMasL.votosTotales}}</td>
            <td>{{diptadosMasL.porcentajeVotosPro}}%</td> 
```



## :page_with_curl: Requirements :page_with_curl:

Necessary browsers to run the web:
- Mozilla Firefox 
- Google Chrome 
- Opera 
- Microsoft Edge

## 🛠️ Tools used 🛠️

* [Boostrap](https://getbootstrap.com/) - ``Front-End Framework``
* [Vue.js] (https://vuejs.org/)  - ``Javascript Framework``
* [API Pro Publica] - (https://projects.propublica.org/api-docs/congress-api/members/) - ``API (We take the information from here)``
## ✒️ Autor ✒️

* **Martin Cumpe** - [tincho3604](https://github.com/Tincho3604)

## 🎁 ¡Thanks!🎁

* This project was developed in the Mindhub bootcamp, as part of the development in the module (Javascript Web Development) 📢



