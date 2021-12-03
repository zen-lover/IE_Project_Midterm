function validate(){
    var maxLength = 255;
    var input = document.getElementById('inputName')
    console.log(input.length)
    var error = document.getElementById('error')

    if (input.value.length > maxLength){
        error.style.display = 'block';
        error.innerHTML = 'Name is too long!';
    } else if (!isValidStr(input.value)){
        error.style.display = 'block';
        error.innerHTML = 'You can just use letters and space!';
    } 
    else {
        error.style.display = 'none';
    }

    if (input.value.length == 0) {
        error.style.display = 'none';
    }
}

function isValidStr(str) {
    var regexPattern = /^[a-zA-Z ]+$/;
    return str.length > 0 && regexPattern.test(str);
}