document.addEventListener("DOMContentLoaded", function() {
  var teamMembers = document.getElementsByClassName("team-member"),
    numTeam = teamMembers.length;
  for (var i = 0; i < numTeam; ++i) {
    teamMembers[i].addEventListener("click", function() {
      this.classList.toggle("team-member--open");
    });
  }
});
