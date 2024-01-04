/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let strFined = "";
  for(let i=0;i<str.length;i++){
    if(str[i]===" " || str[i]==='!' || str[i]==='?' || str[i]===',' || str[i]==='.'  ){
      continue;
    }
    if (typeof str[i]=== 'string') {
      strFined += str[i];      
    }
  }
  const newStr = strFined.toLowerCase();
  let pointer1=0;
  let pointer2=newStr.length-1;
  while (pointer1<=pointer2) {
    if(newStr[pointer1]!=newStr[pointer2]){
      return false
    }
    pointer1+=1;
    pointer2-=1;
  }
  return true;
}

module.exports = isPalindrome;
