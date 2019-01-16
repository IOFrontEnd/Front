function loginFunction(address, email, firstName, identifierNo, password, surname) {
    var xhr = new XMLHttpRequest();
    var url = "http://104.248.142.195:8080/registration/register";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { 
            location.href="index.html";
        }
        else if (xhr.readyState === 4 && xhr.status != 200) {
            var jsonObject = JSON.parse(xhr.responseText);
            alert(jsonObject.message);
        }
    };
    var data = JSON.stringify({
        "address": address,
        "email": email,
        "firstName": firstName,
        "identifierNo": identifierNo,
        "password": password,
        "surname": surname
    });
    xhr.send(data);
}
