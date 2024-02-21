function callXMLHttpRequest()
{    
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var page = params.get("p");

    CreateNavigationButtons(page,"people.html", 9, "navigationPeopleButtons");

    var xhr = new XMLHttpRequest();
    xhr.open("get", `https://swapi.dev/api/people?page=${page}`);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4 && xhr.status ==200)
        {
            var json = JSON.parse(xhr.responseText);

            for( var  i = 0 ; i<json.count;i++)
            {
                TRCreation(((page-1)*10)+i+1,json.results[i],page);
            }
        }
    }

    xhr.send(null);
}

function TRCreation(id,person,page)
{                        
    var tr = CreateTRRow(`personDetails.html?p=${person.url.split("/")[5]}&back=${page}&backp=people`);

    var td0 = document.createElement("td");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");

    td0.appendChild(document.createTextNode(id+"."));
    td1.appendChild(document.createTextNode(person.name));
    td2.appendChild(document.createTextNode(person.birth_year));
    td3.appendChild(document.createTextNode(person.films.length));
    td4.appendChild(document.createTextNode(`${person.height} cm`));
    td5.appendChild(document.createTextNode(person.gender));

    td6.appendChild(CreatePLanetButton(`planetdetails.html?p=${person.homeworld.split("/")[5]}&back=${page}&backp=people`,"Details"));

    if(person.vehicles.length > 0)
    {
        for(var i = 0 ; i< person.vehicles.length; i++)
        {
            td7.appendChild(CreatePLanetButton(`vehicleDetails.html?id=${person.vehicles[i].split("/")[5]}&back=${page}&backp=people`,`${i+1}. Details`));
        }
    }
    else
    {
        td7.appendChild(document.createTextNode("-"));
    }
            
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7); 

    document.getElementById("tdMainBody").appendChild(tr);
}

callXMLHttpRequest();