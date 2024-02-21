function callXMLHttpRequest()
{    
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var page = params.get("p");

    CreateNavigationButtons(page,"planets.html", 6, "navigationPlanetsButtons");

    var xhr = new XMLHttpRequest();
    xhr.open("get", `https://swapi.dev/api/planets?page=${page}`);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4 && xhr.status ==200)
        {
            var json = JSON.parse(xhr.responseText);

            for( var  i = 0 ; i<json.results.length;i++)
            {
                TRCreation(json.results[i],page);
            }
        }
    }

    xhr.send(null);
}

function TRCreation(planet,page)
{                     
    var planetNumber = planet.url.split("/")[5];
    var tr = CreateTRRow(`planetdetails.html?p=${planetNumber}&back=${page}&backp=planets`);
    
    var td0 = document.createElement("td");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");

    td0.appendChild(document.createTextNode(planet.name));
    td1.appendChild(document.createTextNode(planet.surface_water));
    td2.appendChild(document.createTextNode(planet.films.length));
    td3.appendChild(document.createTextNode(planet.population));
    
    td4.appendChild(CreatePLanetButton(`planetdetails.html?p=${planetNumber}&back=${page}&backp=planets`,`Details`));

    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    document.getElementById("tdMainBody").appendChild(tr);   
}

callXMLHttpRequest();