const LEVEL_0 = "GO";
let LEVEL_1 = "IN";
let LEVEL_2 = '';
let LEVEL_3 = ''
const schoolCodeGen = (isLocal,stateCityCode,totalRow, countryCode) => {
	if(parseInt(stateCityCode) && stateCityCode < 10) {
		LEVEL_2 = `0${stateCityCode}`
	} else {
		LEVEL_2 = `${stateCityCode}`
	}

	let digitLen = `${totalRow + 1}`.length;
	totalRow = parseInt(totalRow) + 1;
	if(digitLen == 1) {
		LEVEL_3 = `000${totalRow}`
	} else if(digitLen === 2 ) {
		LEVEL_3 = `00${totalRow}`

	} else if(digitLen === 3 ) {
		LEVEL_3 = `0${totalRow}`
	} else if(digitLen > 3) {
		LEVEL_3 = totalRow;
	}
	if(!isLocal) {
		LEVEL_1 = countryCode;
	} else {
		LEVEL_1 = "IN";
	}
	return LEVEL_0 + LEVEL_1 + LEVEL_2 + LEVEL_3;
}
const generatePassword = () =>{
	var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	 var passwordLength = 8;
	 var password = "";
	 for (var i = 0; i <= passwordLength; i++) {
   var randomNumber = Math.floor(Math.random() * chars.length);
   password += chars.substring(randomNumber, randomNumber +1);
  }
  return password
}
module.exports = {
	schoolCodeGen,
	generatePassword
}