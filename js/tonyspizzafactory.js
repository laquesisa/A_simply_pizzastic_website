function http_get_request(link, type) {
    var request = new XMLHttpRequest();
    request.open("GET", link, true);
    request.setRequestHeader("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4");
    request.setRequestHeader("Content-type", "charset=utf-8");
    request.onreadystatechange = function () {
        if(request.readyState === 4){
            if(request.status === 200) {
                process(JSON.parse(request.responseText), type);
            }
            else {
                document.getElementById("content_in_here").textContent = "Timeout. Couldn't reach the service. (Status " + this.status + ")";
            }
        }
    };
    request.ontimeout = function () {
        document.getElementById("content_in_here").textContent = "Timeout. Couldn't reach the service. (Status " + this.status + ")";
    };
    request.onerror = function() {
        document.getElementById("content_in_here").textContent = "Network Error. Couldn't reach the service. (Status " + this.status + ")";
    };
    request.send(null);
}

function process(product, type) {
    var parentDiv = document.getElementById("content_in_here");
    for(var i=0;i<product.length;i++){
        parentDiv.appendChild(show_product(product[i], type));
    }
}



function show_product(product, type){
    var product_Div = document.createElement("div");
    product_Div.id = product;
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
    cartImg.classList.add("cart");
    cartDiv.appendChild(cartImg);
    info.appendChild(cartDiv);

    if(type === "salad" || type === "softdrinks"){
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

            case "softdrinks":
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