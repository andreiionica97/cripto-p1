var text;
var ckey;
var vkey = '';
var result = '';

function validData() {
    ckey = parseInt(document.getElementById("ckey").value);
    if (isNaN(ckey) || ckey < 1 || ckey > 25) {
        alert("Caesar key must be a number between 1 and 25.");
        return 0;
    }
    vkey = document.getElementById("vkey").value;
    if (vkey == false) {
        alert("Vigenère key cannot be empty.");
        return 0;
    }
    for (var i = 0; i < vkey.length; i ++) {
        if((vkey.charCodeAt(i) >= 65 && vkey.charCodeAt(i) <= 90) || (vkey.charCodeAt(i) >= 97 && vkey.charCodeAt(i) <= 122)) {
            continue;
        } else {
            alert("Vigenère key must contain only letters.");
            return 0;
        }
    }
    return 1;
}

document.getElementById('inputfile').addEventListener('change', function() {
    var fr=new FileReader(); 
    fr.onload=function(){ 
        text = fr.result; 
    } 
    fr.readAsText(this.files[0]); 
})

//download("output.txt", output);
function download(filename, print) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:print/plain;charset=utf-8,' + encodeURIComponent(print));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function cEncrypt() {
	var output = '';
	for (var i = 0; i < text.length; i ++) {
		var c = text[i];
		if (c.match(/[a-z]/i)) {
			var code = text.charCodeAt(i);
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 + ckey) % 26) + 65);
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 + ckey) % 26) + 97);
		}
		output += c;
	}
	return output;
};

function cDecrypt() {
	var output = '';
	for (var i = 0; i < text.length; i ++) {
		var c = text[i];
		if (c.match(/[a-z]/i)) {
			var code = text.charCodeAt(i);
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 - ckey + 26) % 26) + 65);
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 - ckey + 26) % 26) + 97);
		}
		output += c;
	}
	return output;
};

function filterKey(key) {
	var filter = [];
	for (var i = 0; i < key.length; i++) {
		var c = key.charCodeAt(i);
		if (isLetter(c))
			filter.push((c - 65) % 32);
	}
	return filter;
}

function isLetter(c) {
	return isUppercase(c) || isLowercase(c);
}

function isUppercase(c) {
	return 65 <= c && c <= 90;
}

function isLowercase(c) {
	return 97 <= c && c <= 122;
}

function vEncrypt() {
    var output = '';
    var key = filterKey(vkey);
	for (var i = 0, j = 0; i < text.length; i++) {
		var c = text.charCodeAt(i);
		if ((c >= 65) && (c <= 90)) {
			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
			j++;
		} else if ((c >= 97) && (c <= 122)) {
			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
		} else {
			output += text.charAt(i);
		}
	}
	return output;
}

function vDecrypt() {
    var output = '';
    var key = filterKey(vkey);
    for (var i = 0; i < key.length; i++){
        key[i] = (26 - key[i]) % 26;
    }
	for (var i = 0, j = 0; i < text.length; i++) {
		var c = text.charCodeAt(i);
		if ((c >= 65) && (c <= 90)) {
			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
			j++;
		} else if ((c >= 97) && (c <= 122)) {
			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
		} else {
			output += text.charAt(i);
		}
	}
	return output;
}

function encrypt() {
    if (validData() == 1) {
        result = cEncrypt();
        text = result;
        result = vEncrypt();
        download("encrypted.txt", result);
    }
}

function decrypt() {
    if (validData() == 1) {
        result = cDecrypt();
        text = result;
        result = vDecrypt();
        download("decrypted.txt", result);
    }
}