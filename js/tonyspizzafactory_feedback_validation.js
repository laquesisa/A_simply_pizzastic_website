function form_validation() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var critic = document.getElementById("critic");
    var pname = document.getElementById("invalid_name");
    var pemail = document.getElementById("invalid_email");
    var pcritic = document.getElementById("invalid_critic");
    var form_okay = true;

    if (!name_validation(name)) {
        form_okay = false;
        input_wrong(pname, name, 'name');
    }else {
        input_correct(pname, name);
    }
    if (!email_validation(email)) {
        form_okay = false;
        input_wrong(pemail, email, 'email');
    }else {
        input_correct(pemail, email);
    }
    if (critic.value.length < 50) {
        form_okay = false;
        input_wrong(pcritic, critic, 'critic');
    }else {
        input_correct(pcritic, critic);
    }
    return form_okay;
}

function name_validation(name) {
    var name_pattern = /^[A-Za-zäöüÄÖÜ]+$/;
    return name_pattern.test(name.value);
}

function email_validation(email) {
    var email_pattern = /^[A-Za-z0-9.!#$%&'*+-\/=?^_`{|}~]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,}$/;
    return email_pattern.test(email.value);
}

function input_wrong(text, input, type) {
    switch(type) {
        case 'name':
            text.innerHTML = "Type your " + type;
            break;
        case 'email':
            if(input.value === ''){
                text.innerHTML = "Type your " + type;
            }else {
                text.innerHTML = "'" + input.value + "' is not a valid e-mail address.";
            }
            break;
        case 'critic':
            text.innerHTML = "Type your comment into the text area. It should have at least 50 characters to be valid.";
            break;
    }
    input.style.border = "3px solid #f00";
}

function input_correct(text, input) {
    input.style.border="1px solid #0275d8";
    text.innerHTML =  "";
}