function callXMLHttpRequest()
{    
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var page = params.get("p");
    var backPage = params.get("back");
    var backPageSite = params.get("backp");

    var xhr = new XMLHttpRequest();
    xhr.open("get", `https://swapi.dev/api/people/${page}/`);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4 && xhr.status ==200)
        {
            var json = JSON.parse(xhr.responseText);
            document.getElementById("name").innerHTML = json.name;
            document.getElementById("birthYear").innerHTML = json.birth_year;
            document.getElementById("height").innerHTML = json.height;
            document.getElementById("gender").innerHTML = json.gender;

            if(  json.vehicles.length > 0)
            {
                for(var i =0; i < json.vehicles.length;i++)
                {
                    CallVehicle(json.vehicles[i], page, "CardMainBody");
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
                backPageSite = "people";
                backPage = 1;
            }

            document.getElementById("homeworld").appendChild(CreatePLanetButton(`planetdetails.html?p=${json.homeworld.split("/")[5]}&back=${page}&backp=personDetails`,"Details"));

            CreateBackButton("backButton", `${backPageSite}.html?p=${backPage}`);
        }
    }

    xhr.send(null);
}

callXMLHttpRequest();



    