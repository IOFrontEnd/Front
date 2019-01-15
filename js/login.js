function loginFunction(email, password) {
    var xhr = new XMLHttpRequest();
    var url = "http://104.248.142.195:8080/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.password);
        }
    };
    var data = JSON.stringify({
        "password": password,
        "username": email
    });
    xhr.send(data);
}