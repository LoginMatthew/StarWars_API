function CreateNavigationButtons(actual, htmlLink, maxPageNumber, PaginationElementId)
{
    var nextPage = Number(actual) < maxPageNumber ? (Number(actual)+1) : maxPageNumber;
    var previousPage =  Number(actual) > 1 ? (Number(actual)-1) : 1;
    var ul = document.getElementById(PaginationElementId);
    
    ul.appendChild(CreatePaginationButtton("&laquo;", htmlLink, 1, false));    
    ul.appendChild(CreatePaginationButtton("Previous", htmlLink, previousPage, false));        

    for(var i = 1 ; i <= maxPageNumber; i++)
    {       
        ul.appendChild(CreatePaginationButtton(i, htmlLink, i,actual == i));        
    }

    ul.appendChild(CreatePaginationButtton("Next", htmlLink, nextPage, false));    
    ul.appendChild(CreatePaginationButtton("&raquo;", htmlLink, maxPageNumber, false));  
}

function CreatePaginationButtton(buttonText, htmlLink, pageNumber, active)
{
    var li = document.createElement("li");

    if(active)
    {
        li.setAttribute("class", "page-item active");
    }
    else
    {
        li.setAttribute("class", "page-item");
    }

    var a =  document.createElement("a");
    a.setAttribute("class","page-link");
    a.setAttribute("href", `${htmlLink}?p=` + pageNumber);
    a.innerHTML = buttonText;

    li.appendChild(a);
    return li;
}

function CreatePLanetButton(link, buttonText)
{
    var a = document.createElement("a");
    a.setAttribute("class", "btn btn-secondary mx-1 my-1");
    a.setAttribute("href", link);
    a.innerHTML = buttonText;
    return a;
}

function CreateTRRow(link)
{
    var tr = document.createElement("tr");

    tr.setAttribute("style","cursor:pointer");
    tr.addEventListener("click", () =>
    {
        window.location.href = link;
    });

    return tr;
}

function CreateBackButton(tagId,link)
{
    var back = document.getElementById(tagId);
    back.setAttribute("class", "btn btn-warning w-25");
    back.setAttribute("href", link);
    back.appendChild(document.createTextNode("Back"));
}

function Create_LiTagsFilmNames(link, TagName)
{
    request("GET", link,true)
    .then(function (e) 
    {
        var li = document.createElement("li");
        li.setAttribute("style", "margin-left: 2rem;");
        var json2 = JSON.parse(e.target.responseText);
        li.innerHTML = json2.title; 
        document.getElementById(TagName).appendChild(li);

    }, function (err) 
    {
        console.log(err);
    });
}

function request(method, url) {
    return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open(method, url);          
          xhr.onload = resolve;
          xhr.onerror = reject;
          xhr.send(null);
    });
}

function CreatePersoCardBody(link, returnPage, TagName)
{
    request("GET", link,true)
    .then(function (e) 
    {
        var json2 = JSON.parse(e.target.responseText);   

        var col = document.createElement("div");
        col.setAttribute("class", "col-12 col-md-6 col-lg-4 col xl-3 my-2 ")

        var card = document.createElement("div");
        card.setAttribute("class", "card h-100 w-100");
        card.setAttribute("style", "with: 18 rem;");

        card.setAttribute("style","cursor:pointer");                        
        card.addEventListener("click", () =>
        {
            window.location.href = returnPage;
        });

        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        var h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.setAttribute("style", "text-align: center;");
        h5.innerHTML = json2.name;
        
        cardBody.appendChild(h5);

        card.appendChild(cardBody);
        col.appendChild(card);
        document.getElementById(TagName).appendChild(col); 
    }, function (err) 
    {
        console.log(err);
    });
}


function CallVehicle(link, page, TagName)
{
    request("GET", link,true)
    .then(function (e) 
    {
        var json2 = JSON.parse(e.target.responseText);   

        VeichleBodyCreater(json2, `vehicleDetails.html?id=${json2.url.split("/")[5]}&back=${page}&backp=personDetails`,TagName)
    }, 
    function (err) 
    {
        console.log(err);
    });
}




function VeichleBodyCreater(vehicle, returnLink, TagName)
{        
    //var vehicleNumber = vehicle.url.split("/")[5];
    var col = document.createElement("div");
    col.setAttribute("class", "col-12 col-md-6 col-lg-4 col xl-3 my-3 ")

    var card = document.createElement("div");
    card.setAttribute("class", "card h-100 w-100");
    card.setAttribute("style", "with: 18 rem;");

    card.setAttribute("style","cursor:pointer");
    card.addEventListener("click", () =>
    {
        //window.location.href = `vehicleDetails.html?id=${vehicleNumber}&back=${page}&backp=vehicles`;
        window.location.href = returnLink;
    });

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    var h3 = document.createElement("h3");
    h3.setAttribute("class", "card-title");
    h3.innerHTML = vehicle.name;
    
    var h6_1 = document.createElement("h6");
    h6_1.innerHTML = "Model";
    var p1 = document.createElement("p");
    p1.innerHTML = vehicle.model;    

    var h6_2 = document.createElement("h6");
    h6_2.innerHTML = "Class";
    var p2 = document.createElement("p");
    p2.innerHTML = vehicle.vehicle_class;
    
    cardBody.appendChild(h3);
    cardBody.appendChild(document.createElement("hr"));
    cardBody.appendChild(h6_1);
    cardBody.appendChild(p1);
    cardBody.appendChild(h6_2);
    cardBody.appendChild(p2);

    card.appendChild(cardBody);
    col.appendChild(card);
    document.getElementById(TagName).appendChild(col);   
}

function CreateEmptyP(TagName)
{
    var p = document.createElement("p");
    p.innerHTML= "-";
    document.getElementById("CardMainBody").appendChild(p); 
}