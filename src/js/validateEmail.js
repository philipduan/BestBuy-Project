function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validate(theInputText,colorSuccess, colorError) {
    if (validateEmail(theInputText)) {
        return $('<p>Thanks for signing up!</p>').css({'color':colorSuccess});
    } else {
        return $('<p>Please re-enter your email address using the proper format.</p>').css({'color':colorError});
    }

}