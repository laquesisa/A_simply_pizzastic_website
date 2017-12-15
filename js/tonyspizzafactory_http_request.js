function http_get_request(link, type) {
    var request = new XMLHttpRequest();
    request.open("GET", link, true);
    request.product_type = type;
    request.setRequestHeader("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4");
    request.onreadystatechange = status;
    request.ontimeout = timeout;
    request.onerror = error;
    request.send(null);
}

function status () {
    if(this.readyState === 4){
        if(this.status === 200) {
            process(JSON.parse(this.responseText), this.product_type);
        }
        else {
            document.getElementById("content_in_here").textContent = "Timeout. Couldn't reach the service. (Status " + this.status + ")";
        }
    }
}

function timeout () {
    document.getElementById("content_in_here").textContent = "Timeout. Couldn't reach the service. (Status " + this.status + ")";
}

function error() {
    document.getElementById("content_in_here").textContent = "Network Error. Couldn't reach the service. (Status " + this.status + ")";
}


function process(product, type) {
    var parentDiv = document.getElementById("content_in_here");
    for(var i=0;i<product.length;i++){
        parentDiv.appendChild(show_product(product[i], type));
    }
}



function show_product(product, type){
    var product_Div = document.createElement("div");
    product_Div.setAttribute("id", product.name.toLowerCase().replace(/ /g,''));
    product_Div.classList.add("col-10", "col-md-3", "p-md-4", "mb-2", "nop");

    product_Div.appendChild(add_image(product));
    product_Div.appendChild(add_description(product, type));

    return product_Div;


}

function add_image(product){
    var imgDiv = document.createElement("div");
    imgDiv.classList.add("row");

    var newProduct = document.createElement("img");
    newProduct.setAttribute("src", product.imageUrl);
    newProduct.setAttribute("alt", product.name);
    newProduct.classList.add("col-12", "m-0", "mb-2", "product_img");
    imgDiv.appendChild(newProduct);
    return imgDiv;
}

function add_description(product, type) {
    var info = document.createElement("div");
    info.classList.add("row");
    var product_header = document.createElement("h2");
    product_header.textContent = product.name;
    product_header.classList.add("col-6", "pt-2");
    info.appendChild(product_header);

    var priceDiv = document.createElement("div");
    priceDiv.classList.add("col-3", "text-right");
    var price = document.createElement("span");
    price.classList.add("price");
    price.textContent = product.prize;
    priceDiv.appendChild(price);
    info.appendChild(priceDiv);

    var cartDiv = document.createElement("div");
    cartDiv.classList.add("col-3", "col-md-2", "col-ld-3", "text-center");
    var cartImg = document.createElement("img");
    cartImg.setAttribute("src", "images/cart.png");
    cartImg.setAttribute("alt", "shopping cart");
    cartImg.setAttribute("onclick", "order('" + product.name + "', '" + type + "');")
    cartImg.classList.add("cart");
    cartDiv.appendChild(cartImg);
    info.appendChild(cartDiv);

    if(type === "salad" || type === "softdrink"){
        var selectEle = document.createElement("select");
        selectEle.classList.add("col-5", "ml-3", "custom-select");
        var first = document.createElement("option");
        var second = document.createElement("option");

        switch(type){
            case "salad":
                first.value = "italian";
                second.value = "french";
                first.textContent = "Italian dressing";
                second.textContent = "French dressing";
                selectEle.appendChild(first);
                selectEle.appendChild(second);
                break;

            case "softdrink":
                first.value = "50";
                second.value = "33";
                first.textContent = "50cl";
                second.textContent = "33cl";
                selectEle.appendChild(first);
                selectEle.appendChild(second);
                break;
        }

        info.appendChild(selectEle);
    }


    var ingredients_p = document.createElement("p");
    ingredients_p.classList.add("ingredients", "col-12", "mb-0");

    if(type === "pizza" || type === "salad"){
        var infotext = product.ingredients[0];
        for(var j=1;j<product.ingredients.length;j++){
            infotext = infotext + ", " + product.ingredients[j];
        }
        ingredients_p.textContent = infotext;
        info.appendChild(ingredients_p);
    }

    return info;
}


function order(name, type) {
    var data = {
        "name": name,
        "type": type
    };
    if(type == "salad" || type == "softdrink"){
        var prod_select = document.getElementById(name.toLowerCase().replace(/ /g,'')).getElementsByTagName("select")[0];
        var selection = prod_select.options[prod_select.selectedIndex].value;
        switch(type){
            case "salad":
                data.dressing = selection;
                break;
            case "softdrink":
                data.cl = selection;
                break;
        }
    }
    //console.log(data);
    var url ="https://tonyspizzafactory.herokuapp.com/api/orders";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = status_order;
    xhr.onerror = error_order;
    xhr.ontimeout = timeout_order;
}

function status_order() {
    if(this.readyState == 4){
        if(this.status <= 201){
            var order = JSON.parse(this.responseText);
            //console.log(order);
            document.getElementById("content_in_here").innerHTML = "<div class='alert alert-success'>Your order was a success. You've ordered a " + order.type + ": "+ order.name + ".</div>";
        }
    }
}

function error_order() {
    document.getElementById("content_in_here").innerHTML = "<div class='alert alert-danger'>Timeout. Couldn't reach the service. (Status " + this.status + ")</div>";
}

function timeout_order(){
    document.getElementById("content_in_here").innerHTML = "<div class='alert alert-danger'>Network Error. Couldn't reach the service. (Status " + this.status + ")</div>";
}
