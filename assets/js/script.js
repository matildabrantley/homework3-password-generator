// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

//returns an array of chosen section of character codes
function getCharacterCodes(startingPosition, sectionLength) {
  var code;
  var newCodes = [];
  for (code = startingPosition; code < startingPosition + sectionLength ; code++)
    newCodes.push(code);
  //console.log("Getting new codes: " + newCodes);
  return newCodes;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(){
  var myPassword = "";

  //prompt password length and validate it is between 8 and 128
  var pwLength = prompt("Password length: ");
  if (pwLength < 8)
    return "Password too short";
  if (pwLength > 128)
    return "Password too long";

  const isCustom = document.getElementById('customize').checked;

  //prompt password generation preferences
  var pwIncludesLowerCase = isCustom ? confirm("Confirm password includes lower case characters") : true;
  var pwIncludesUpperCase = isCustom ? confirm("Confirm password includes upper case characters") : true;
  var pwIncludesNumbers = isCustom ? confirm("Confirm password includes numbers") : true;
  var pwIncludesSpecial = isCustom ? confirm("Confirm password includes special characters") : false;

  //if no preferences selected, return error message
  if (!(pwIncludesLowerCase || pwIncludesUpperCase 
      || pwIncludesNumbers || pwIncludesSpecial))
      return "Error: No Selections Made, Cannot Create Password";

  /*create an array of possible character codes based on user's choices
    such that every character is equally likely */
  var possibleCodes = [];

  const alphabetLength = 26;
  //add lower case codes to possibleCodes array, a to z
  if (pwIncludesLowerCase)
    possibleCodes = possibleCodes.concat(getCharacterCodes(97, alphabetLength)); //97 is "a"

  //add upper case codes to possibleCodes array, A to Z
  if (pwIncludesUpperCase)
    possibleCodes = possibleCodes.concat(getCharacterCodes(65, alphabetLength)); //65 is "A"

  //add number codes to possibleCodes array, 0 to 9
  if (pwIncludesNumbers)
    possibleCodes = possibleCodes.concat(getCharacterCodes(48, 10)); //48 is "0"

  //add number codes to possibleCodes array
  if (pwIncludesSpecial){
    //Adds !, ", #, $, %, &, ', (, ), *, +, ', -, ., /
    possibleCodes = possibleCodes.concat(getCharacterCodes(33, 15)); //33 is "!"
    //Adds :, ;, <, =, >, ?, @
    possibleCodes = possibleCodes.concat(getCharacterCodes(58, 7)); //58 is ":"
    //Adds {, |, }, ~
    possibleCodes = possibleCodes.concat(getCharacterCodes(123, 4)); //123 is "{"
  }

  //check if all codes added to array correctly
  //console.log("All possible codes: " + possibleCodes);

   //randomly select from all chosen characters and append to password
   var randomIndex, newPasswordCharacter;
   for (var i=0; i<pwLength; i++){
     //get random index for possibleCodes
     randomIndex = Math.floor(Math.random() * possibleCodes.length);
     //console.log("Random index: " + randomIndex);
     
     //retrieve and assign character by using the code at random index of possibleCodes
     newPasswordCharacter = String.fromCharCode(possibleCodes[randomIndex]);
     //console.log("New character: " + newPasswordCharacter);

     //append character to password string
     myPassword += newPasswordCharacter;
     //console.log("Building up password: " + myPassword);
   }  

  return myPassword;
}