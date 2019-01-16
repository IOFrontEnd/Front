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
                localStorage.setItem('projectsObject', JSON.stringify(jsonObject));
                var projects = jsonObject.listOfProjects;
                for (var i = 0, len = projects.length; i < len; i++) {
                    projectsToDisplay+='<li class="list-group-item"><h5><a href="#" role="button" id="'+projects[i].id 
                    +'">' 
                    + projects[i].projectName +
                    '</a><span class="badge badge-primary" style="float:right;">Liczba glosow: ' + projects[i].voteAmount +
                    '</span></h5><div>'+ projects[i].description.slice(0, 200); +'</div></li>';
                }
                document.getElementById("projectList").innerHTML = projectsToDisplay;
                document.getElementById("projectList").onclick = projectSelected;
            }
            else if (xhr.readyState === 4 && xhr.status != 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                alert(jsonObject.message);
            }
        };
        xhr.send();
    } else {
        alert("Make sure you are logged in!");
    }
});

function projectSelected(event) {
    var element = event.target
    if(element.id != ""){
        localStorage.setItem('projectId', element.id);
        location.href="wybranyProjekt.html";
    }
}