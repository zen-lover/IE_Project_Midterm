// This is general function for validation input name.
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

// This function is for validate letter of input name
function isValidStr(str) {
    var regexPattern = /^[a-zA-Z ]+$/;
    return str.length > 0 && regexPattern.test(str);
}

// This function is for call API and get data from given endpiont.
function callAPI(event) {
    event.preventDefault();
    var input = document.getElementById('inputName')
    const xhttp = new XMLHttpRequest();
    var saved = localStorage.getItem(input.value);
    if(saved) { 
        document.getElementById('Log').innerHTML = input.value + ':' + saved;
    }

    xhttp.onload = function() {
        document.getElementById('gender_result').innerHTML = JSON.parse(this.responseText).gender;
        document.getElementById('probability_result').innerHTML = JSON.parse(this.responseText).probability;

        console.log(JSON.parse(this.responseText))
    }
    xhttp.open("GET", `https://api.genderize.io/?name=${input.value}`);
    xhttp.send();
}

// This function save data to storage when user click on save button
function saveToStorage(event) {
    event.preventDefault();

    var input = document.getElementById('inputName');
    if (input.value.length > 0 && input.value.length < 256) {
        var male = document.getElementById('radioMale');
        var female = document.getElementById('radioFemale');
        var APIresult = document.getElementById('gender_result');
        finalGender = '';
        if(female.checked){
            finalGender = 'female'
        } else if(male.checked){
            finalGender = 'male'
        } else if(APIresult.innerHTML.length > 1) {
            finalGender = APIresult.innerHTML;
        }
        
        if (finalGender) {
            localStorage.setItem(input.value, finalGender);
            document.getElementById('Log').innerHTML = input.value + ':' + finalGender;

        }
    }
}

// This function clear data for given name from storage
function clearStorage(event) {
    event.preventDefault()

    var inputName = document.getElementById('Log').innerHTML.split(':')[0];
    localStorage.removeItem(inputName)
    document.getElementById('Log').innerHTML = null;
    
}