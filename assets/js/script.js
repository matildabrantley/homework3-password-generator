// Assignment Code
const generateBtn = document.querySelector("#generate");

//Show/Hide Customization Options
function showOptions() {
  const options = document.getElementById("options");
  options.style.display = document.getElementById('customize').checked ? "block" : "none";
}

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}

//returns an array of chosen section of character codes
function getCharacterCodes(startingPosition, sectionLength) {
  let code;
  const newCodes = [];
  for (code = startingPosition; code < startingPosition + sectionLength ; code++)
    newCodes.push(code);
  //console.log("Getting new codes: " + newCodes);
  return newCodes;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(){
  let myPassword = "";
  let pwLength, pwIncludesLowerCase, pwIncludesUpperCase, pwIncludesNumbers, pwIncludesSpecial;

  if (document.getElementById('customize').checked) {
    //prompt password length and validate it is between 4 and 128
    pwLength = document.getElementById('pw-length').value;
    if (pwLength < 4)
      return "Password too short";
    if (pwLength > 128)
      return "Password too long";

    //prompt password generation preferences
      pwIncludesLowerCase = document.getElementById('includes-lower-case').checked;
      pwIncludesUpperCase = document.getElementById('includes-upper-case').checked;
      pwIncludesNumbers = document.getElementById('includes-numbers').checked;
      pwIncludesSpecial = document.getElementById('includes-specials').checked;
  } else { //use defaults
      pwLength = 10;
      pwIncludesLowerCase = true;
      pwIncludesUpperCase = true;
      pwIncludesNumbers = true;
      pwIncludesSpecial = false;
  }

  //if no preferences selected, return error message
  if (!(pwIncludesLowerCase || pwIncludesUpperCase 
      || pwIncludesNumbers || pwIncludesSpecial))
      return "Error: No Selections Made, Cannot Create Password";

  /*create an array of possible character codes based on user's choices
    such that every character is equally likely */
  let possibleCodes = [];

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
   let randomIndex, newPasswordCharacter;
   for (let i=0; i<pwLength; i++){
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