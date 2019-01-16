$(function displayProject() {

    var projectsObject = JSON.parse(localStorage.getItem('projectsObject'));
    var projects = projectsObject.listOfProjects;
    var id = localStorage.getItem('projectId');
    var projectsToDisplay = '';
    var selectedProject;

    for (var i = 0, len = projects.length; i < len; i++) {
        if (projects[i].id === parseInt(id, 10)) {
            selectedProject = projects[i];
            break;
        }
    }
    console.log(selectedProject);

    projectsToDisplay += '<li class="list-group-item"><h5><a href="#" id="' + selectedProject.id +
        '">' +
        selectedProject.projectName +
        '</a><span class="badge badge-primary" style="float:right;" id="votes">Liczba glosow: ' + selectedProject.voteAmount +
        '</span><br> <a href="#" class="badge badge-success" style="float:right;" role="button" onclick="vote()">Zagłosuj na projekt</a></h5><p>' + selectedProject.description + '</p><br><br>' +
        '<p>Dzielnica: ' + selectedProject.neighbourhood + '</p><p>Ulica: ' +
        selectedProject.address + '</p><p>Sugerowany koszt: ' +
        selectedProject.budget + 'zł</p></li>';

    document.getElementById("project").innerHTML = projectsToDisplay;
});


function updateVotes(){
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
                localStorage.setItem('projectsObject', JSON.stringify(jsonObject));
                location.reload(); 
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                alert(jsonObject.message);
            }
        };
        xhr.send();
    } else {
        alert("Make sure you are logged in!");
    }
}

function vote() {
    var xhr = new XMLHttpRequest();
    var url = "http://104.248.142.195:8080/projectManagement/voteForProject/project/";
    var id = localStorage.getItem('projectId');
    var retrievedObject = localStorage.getItem('loginObject');
    if (retrievedObject != null && id != null) {
        var token = 'Bearer ' + JSON.parse(retrievedObject).token;
        xhr.open("GET", url + id.toString(10), true);
        xhr.setRequestHeader("Authorization", token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                updateVotes();
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                alert(jsonObject.message);
            }
        };
        xhr.send();
    } else {
        alert("Make sure you are logged in!");
    }
}

function addComment() {
    var xhr = new XMLHttpRequest();
    var url = "http://104.248.142.195:8080/projectManagement/addCommentToProject";
    var retrievedObject = localStorage.getItem("loginObject");
    var id = localStorage.getItem("projectId");
    if (retrievedObject != null && id != null) {
        var token = "Bearer " + JSON.parse(retrievedObject).token;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Authorization", token);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                location.href = "wybranyProjekt.html";
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                alert(jsonObject.message);
            }
        };
        var comment = document.getElementById("commentText").value;
        var data = JSON.stringify({
            "comment": comment,
            "projectId": parseInt(id)
        });
        console.log(data);
        xhr.send(data);
    } else {
        alert("Make sure you are logged in!");
    }
}

$(function fetchComments() {
    var xhr = new XMLHttpRequest();
    var url = "http://104.248.142.195:8080/projectManagement/getComments/project/";
    var retrievedObject = localStorage.getItem("loginObject");
    var id = localStorage.getItem("projectId");
    if (retrievedObject != null && id != null) {
        var token = "Bearer " + JSON.parse(retrievedObject).token;
        xhr.open("GET", url + id.toString(10), true);
        xhr.setRequestHeader("Authorization", token);
        var commentsToDisplay = "";
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var comments = JSON.parse(xhr.responseText).listOfComments;
                for (var i = 0; i < comments.length; i++) {
                    commentsToDisplay += `<div class="col-sm-8 mb-3">
                    <div class="panel panel-white post panel-shadow">
                      <div class="post-heading">
                        <div class="pull-left image">
                          <img src="http://bootdey.com/img/Content/user_1.jpg" class="img-circle avatar" alt="user profile image">
                        </div>
                        <div class="pull-left meta">
                          <div class="title h5 mt-3">
                            <a href="#"><b>` + comments[i].email + `</b></a>
                            napisał:
                          </div>
                        </div>
                      </div>
                      <div class="post-description">
                        <p>` + comments[i].comment + `</p>
                      </div>
                    </div>
                  </div>`;
                }
                document.getElementById("commentList").innerHTML = commentsToDisplay;
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                alert(jsonObject.message);
            }
        }
        xhr.send();
    } else {
        alert("Upewnij sie, ze jestes zalogowany!");
    }
});