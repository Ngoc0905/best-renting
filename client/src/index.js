function scramble(str1, str2) {
    var arrStr2 = str2.split();
    for(let i = 0; i< arrStr2.length; i++){
    if ( str1.indexOf(arrStr2[i]) !== -1){
    arrStr2.slice(str2.indexOf(arrStr2[i]),1);
    }
    } 
    if(arrStr2.length === 0){
    return true;
    } return false; 
   }

   scramble('rkqodlw','world');