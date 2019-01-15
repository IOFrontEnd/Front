function loginFunction(address, email, firstName, identifierNo, password, surname) {
    var xhr = new XMLHttpRequest();
    var url = "http://104.248.142.195:8080/registration/register";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
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