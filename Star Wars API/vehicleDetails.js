var params = new URLSearchParams(window.location.search);
var page = params.get("id");
var backPage = params.get("back");
var backPageSite = params.get("backp");

var xhr = new XMLHttpRequest();
xhr.open("GET", `https://swapi.dev/api/vehicles/${page}/`);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) 
    {
        var json = JSON.parse(xhr.responseText);

        document.getElementById("name").innerHTML = json.name;
        document.getElementById("model").innerHTML = json.model;
        document.getElementById("vehicle_class").innerHTML = json.vehicle_class;
        document.getElementById("max_atmosphering_speed").innerHTML = json.max_atmosphering_speed;
        document.getElementById("cost_in_credits").innerHTML = json.cost_in_credits;
        document.getElementById("crew").innerHTML = json.crew;
        document.getElementById("length").innerHTML = json.length;

        if(json.pilots.length> 0)
        {
            for(var i = 0 ; i< json.pilots.length; i++)
            {
                CreatePersoCardBody(json.pilots[i], `personDetails.html?p=${json.pilots[i].split("/")[5]}&back=${page}&backp=vehicleDetails`, "CardMainBody");            
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
            backPageSite = "vehichles";
            backPage = 1;
        }

        CreateBackButton("backButton", `${backPageSite}.html?p=${backPage}`);
    }
};

xhr.send(null);