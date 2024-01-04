/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    const newString = str.toLowerCase();
    let countVowel = 0;
    for(let i=0;i<str.length;i++){
      if(newString[i]=="a" || newString[i]=="e" ||newString[i]=="i" ||newString[i]=="o"||newString[i]=="u"){
        countVowel=countVowel+1;
      }
    }
    return countVowel;
}

module.exports = countVowels;