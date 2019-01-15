function loginFunction(email, password) {
    var xhr = new XMLHttpRequest();
    var url = "http://104.248.142.195:8080/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {           
            var jsonObject = JSON.parse(xhr.responseText);
            console.log(jsonObject.token);
            localStorage.setItem('loginObject', JSON.stringify(jsonObject));
            location.href="index.html";
        }
        if (xhr.readyState === 4 && xhr.status != 200) {
            alert("Something went terribly wrong!");
        }
    };
    var data = JSON.stringify({
        "password": password,
        "username": email
    });
    xhr.send(data);
}

function printStorage() {  
    var retrievedObject = localStorage.getItem('loginObject');
    console.log('Barer', JSON.parse(retrievedObject).token);   
}