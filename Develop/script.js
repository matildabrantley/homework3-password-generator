// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(){
  var pw = "";

  var pwLength = prompt("Password length: ");
  var pwIncludesLowerCase = confirm("Confirm password includes lower case characters");
  var pwIncludesUpperCase = confirm("Confirm password includes upper case characters");
  var pwIncludesNumbers = confirm("Confirm password includes numbers");
  var pwIncludesSpecial = confirm("Confirm password includes special characters");

  for (var i=0; i<pwLength; i++){

  }  

  return pw;
}