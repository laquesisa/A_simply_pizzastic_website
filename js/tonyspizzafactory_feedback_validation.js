function form_validation() {
    return (name_validation() & email_validation() & critic_validation()) ? true : false;
}

function name_validation() {
    var name = document.getElementById("name");
    var pname = document.getElementById("invalid_name");
    var name_pattern = /^(?:[A-Za-zäöüÄÖÜ'ñêéèôàâç-]+ )*[A-Za-zäöüÄÖÜ'ñêéèôàâç-]+$/;
    if (!name_pattern.test(name.value)){
        input_wrong(pname, name, 'name');
    }else{
        input_correct(pname, name);
    }
}

function email_validation() {
    var email = document.getElementById("email");
    var pemail = document.getElementById("invalid_email");
    var email_pattern = /^[A-Za-z0-9.!#$%&'*+-\/=?^_`{|}~]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!email_pattern.test(email.value)){
        input_wrong(pemail, email, 'email');
    }
    else{
        input_correct(pemail, email);
    }
}
function critic_validation() {
    var critic = document.getElementById("critic");
    var pcritic = document.getElementById("invalid_critic");
    if (critic.value.length < 50) {
        input_wrong(pcritic, critic, 'critic');
    } else{
        input_correct(pcritic, critic);
    }

}

function input_wrong(text, input, type) {
    switch(type) {
        case 'name':
            if(input.value === ''){
                text.innerHTML = "Type your name";
            }else {
                text.innerHTML = "'" + input.value + "' is not a valid name. Only letters and apostrophes are allowed.";
            }
            break;
        case 'email':
            if(input.value === ''){
                text.innerHTML = "Type your email";
            }else {
                text.innerHTML = "'" + input.value + "' is not a valid e-mail address.";
            }
            break;
        case 'critic':
            text.innerHTML = "Type your comment into the text area. It should have at least 50 characters to be valid.";
            break;
    }
    input.style.border = "3px solid #f00";
    return false;
}


function input_correct(text, input) {
    input.style.border="1px solid #0275d8";
    text.innerHTML =  "";
    return true;
}