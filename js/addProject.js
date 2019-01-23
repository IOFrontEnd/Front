function addProject(address,budget,description,neighbourhood,projectName) {
    var xhr = new XMLHttpRequest();
    var url = "http://104.248.142.195:8080/projectManagement/createProject";
    var retrievedObject = localStorage.getItem('loginObject');
    if (retrievedObject != null) {
        var token = 'Bearer ' + JSON.parse(retrievedObject).token
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Authorization", token);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                location.href = "index.html";
            }
            else if (xhr.readyState === 4 && xhr.status != 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                alert(jsonObject.message);
            }
        };
        var data = JSON.stringify({
            "address": address,
            "budget": budget,
            "description": description,
            "id": "83",
            "neighbourhood": "Wojska Polskiego",
            "projectName": projectName,
            "voteAmount": "0"
        });
        xhr.send(data);
    } else {
        alert("Make sure you are logged in!");
    }
}
