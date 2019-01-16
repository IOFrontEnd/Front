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
                console.log("added project");
                location.href = "index.html";
            }
            if (xhr.readyState === 4 && xhr.status != 200) {
                alert("Something went terribly wrong!");
            }
        };
        var data = JSON.stringify({
            "Address": address,
            "budget": budget,
            "description": description,
            "id": "80",
            "neighbourhood": "Wojska Polskiego",
            "projectName": projectName,
            "voteAmount": "0"
        });
        xhr.send(data);
    } else {
        alert("Make sure you are logged in!");
    }
}
