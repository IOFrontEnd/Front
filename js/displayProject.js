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

    projectsToDisplay += '<li class="list-group-item"><h5><a href="#" id="' + selectedProject.id +
        '">' +
        selectedProject.projectName +
        '</a><span class="badge badge-primary" style="float:right;">Liczba glosow: ' + selectedProject.voteAmount +
        '</span></h5><p>' + selectedProject.description + '</p><br><br>'+
        '<p>Dzielnica: ' + selectedProject.neighbourhood+'</p><p>Ulica: '
        + selectedProject.Address+'</p><p>Sugerowany koszt: '
        + selectedProject.budget +'zł</p></li>';

    document.getElementById("project").innerHTML = projectsToDisplay;
});

