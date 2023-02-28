// The event listener in script1 has some repetitive code, Which we will be just refactoring that in here.

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show input error message
function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

// show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// Checking input lengths
function checkLength(input,min,max){
    if(input.value.length < min ){
        showError(input,`${getFieldName(input)} must be at least ${min} characters`);
    }else if (input.value.length > max){
        showError(input,`${getFieldName(input)} must be less than ${max} characters`);
    }else{
        showSuccess(input);
    }
}

// Check email is valid
function checkEmail(input) {
    const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if(re.test(input.value.trim())){
    showSuccess(input);
  }else{
    showError(input,"Email is not valid");
  } 
}

// Check required fields
function checkRequired(inputArray){
    inputArray.forEach(function(input){
        if(input.value.trim() === ""){
            showError(input,`${getFieldName(input)} is required`);
        }else {
            showSuccess(input);
        }
    })
}

// Check passwords match
function checkPasswordsMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2,"Passwords do not match");
    }
}

// GetfieldName function - to make the first word of the error message capital.
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners
form.addEventListener("submit",function(event){
    event.preventDefault();
    

    // Just refactored by removing those if statements.
    checkRequired([username,email,password,password2]);

    // checking length of username , passwords and matching passwords
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordsMatch(password,password2);
});

