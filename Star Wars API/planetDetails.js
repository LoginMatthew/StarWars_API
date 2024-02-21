function callXMLHttpRequest()
{    
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var page = params.get("p");
    var backPage = params.get("back");
    var backPageSite = params.get("backp");

    var xhr = new XMLHttpRequest();
    xhr.open("get", `https://swapi.dev/api/planets/${page}/`);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4 && xhr.status ==200)
        {
            var json = JSON.parse(xhr.responseText);
            document.getElementById("name").innerHTML = json.name;
            document.getElementById("diameter").innerHTML = json.diameter;
            document.getElementById("surface_water").innerHTML = json.surface_water;
            document.getElementById("terrain").innerHTML = json.terrain;
            document.getElementById("climate").innerHTML = json.climate;
            document.getElementById("population").innerHTML = json.population;

            if(json.residents.length> 0)
            {
                for(var i = 0 ; i< json.residents.length; i++)
                {
                    CreatePersoCardBody(json.residents[i],`personDetails.html?p=${json.residents[i].split("/")[5]}&back=${page}&backp=planetDetails`,"CardMainBody");
                }
            }    
            else
            {
                CreateEmptyP("CardMainBody");
            }

            for (var k = 0; k< json.films.length;k++)
            {
                Create_LiTagsFilmNames(json.films[k], "films");     
            }

            //In case of to many backward event occurs, then go to actual main's page list
            if(backPageSite ==null)
            {
                backPageSite = "planets";
                backPage = 1;
            }

            CreateBackButton("backButton", `${backPageSite}.html?p=${backPage}`);
        }
    }

    xhr.send(null);
}

callXMLHttpRequest();