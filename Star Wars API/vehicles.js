function callXMLHttpRequest()
{    
    var url = window.location.search;
    var params = new URLSearchParams(url);
    var page = params.get("p");

    CreateNavigationButtons(page,"vehicles.html", 4, "navigationVehichlesButtons");

    var xhr = new XMLHttpRequest();
    xhr.open("get", `https://swapi.dev/api/vehicles?page=${page}`);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4 && xhr.status ==200)
        {
            var json = JSON.parse(xhr.responseText);
            
            for( var  i = 0 ; i<json.results.length;i++)
            {
                VeichleBodyCreater(json.results[i],`vehicleDetails.html?id=${json.results[i].url.split("/")[5]}&back=${page}&backp=vehicles`, "CardMainBody");
            }
        }
    }

    xhr.send(null);
}


callXMLHttpRequest();