$(function addProject() {
    var xhr = new XMLHttpRequest();
    var url = "http://104.248.142.195:8080/projectManagement/getAllProjects";
    var retrievedObject = localStorage.getItem('loginObject');
    if (retrievedObject != null) {
        var token = 'Bearer ' + JSON.parse(retrievedObject).token
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Authorization", token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                var projectsToDisplay='';
                console.log(jsonObject.listOfProjects);
                var projects = jsonObject.listOfProjects;
                for (var i = 0, len = projects.length; i < len; i++) {
                    projectsToDisplay+='<li class="list-group-item"><h5>' + projects[i].projectName +
                    '<span class="badge badge-primary" style="float:right;">Liczba glosow: ' + projects[i].voteAmount +
                    '</span></h5><div id="project1">'+ projects[i].description.slice(0, 200); +'</div></li>';
                }
                document.getElementById("projectList").innerHTML = projectsToDisplay;
                console.log(projects[1].projectName);
            }
            if (xhr.readyState === 4 && xhr.status != 200) {
                alert("Something went terribly wrong!");
            }
        };
        xhr.send();
    } else {
        alert("Make sure you are logged in!");
    }
});
