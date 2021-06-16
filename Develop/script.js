// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

//returns an array of chosen section of character codes
function getCharCodes(startingPosition, sectionLength) {
  var code;
  var newCodes = [];
  for (code = startingPosition; code < startingPosition + sectionLength ; code++)
    newCodes.push(code);
  console.log("Getting new codes: " + newCodes);
  return newCodes;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(){
  var myPassword = "";

  //prompt password length and validate length between 8 and 128
  var pwLength = prompt("Password length: ");
  if (pwLength < 8)
    return "Password too short";
  if (pwLength > 128)
    return "Password too long";

  //prompt password generation preferences
  var pwIncludesLowerCase = confirm("Confirm password includes lower case characters");
  var pwIncludesUpperCase = confirm("Confirm password includes upper case characters");
  var pwIncludesNumbers = confirm("Confirm password includes numbers");
  var pwIncludesSpecial = confirm("Confirm password includes special characters");

  //if no preferences selected, return error message
  if (!(pwIncludesLowerCase || pwIncludesUpperCase 
      || pwIncludesNumbers || pwIncludesSpecial))
      return "Error: No Selections Made, Cannot Create Password";

  /*create an array of possible character codes based on user's choices
    such that every character is equally likely */
  var possibleCharacters = [];

  const alphabetLength = 26;

  //add lower case codes to possibleCharacters array, a to z
  if (pwIncludesLowerCase)
    possibleCharacters.concat(getCharCodes(97, alphabetLength)); //97 is "a"

  //add upper case codes to possibleCharacters array, A to Z
  if (pwIncludesUpperCase)
    possibleCharacters.concat(getCharCodes(97, alphabetLength)); //65 is "A"

  //add number codes to possibleCharacters array, 0 to 9
  if (pwIncludesNumbers)
    possibleCharacters.concat(getCharCodes(48, 10)); //48 is "0"

  //add number codes to possibleCharacters array
  if (pwIncludesSpecial){
    //Adds !, ", #, $, %, &, ', (, ), *, +, ', -, ., /
    possibleCharacters.concat(getCharCodes(33, 15)); //33 is "!"
    //Adds :, ;, <, =, >, ?, @
    possibleCharacters.concat(getCharCodes(58, 7)); //58 is ":"
    //Adds {, |, }, ~
    possibleCharacters.concat(getCharCodes(123, 4)); //123 is "{"
  }

   //randomly select from all chosen characters and append to password
   var newCharacterCode;
   for (var i=0; i<pwLength; i++){
     newCharacterCode = Math.floor(Math.random() * possibleCharacters.length);
     myPassword += String.fromCharCode(newCharacterCode);
   }  

  return myPassword;
}