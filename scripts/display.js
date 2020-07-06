class Display {
  constructor() {
    this.profile = document.querySelector("#userprofile");
  }

  showProfile(user) {
    if (user.company === null) {
      user.company = "None";
    }
    if (user.location === null) {
      user.location = "None";
    }

    const date = new Date(user.created_at);
    const newDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    if (user.blog === "") user.blog = "-";

    let content = `<div class="card card-body mb-3">
            <div class="row">
              <div class="col-md-4">
                <img class="img-fluid mb-2" src="${user.avatar_url}">
                <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>`
    // if (user.gists_url) {
    //   content += `<a href="${user.gists_url}" target="_blank" class="btn btn-info btn-block mb-4">View Gists</a>`
    // }
    content += `</div >
        <div class="col-md-8">
          <span class="badge badge-primary ">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <br><br>
            <ul class="list-group">
              <li class="list-group-item"><b> Company:<b> ${user.company}</li>
                <li class="list-group-item"><b> Website/ Blog:</b> <a href="https://${user.blog}" target=_blank> ${user.blog}</a></li>
                <li class="list-group-item"> <b> Location: </b> ${user.location}</li>
                <li class="list-group-item"> <b> Member Since: </b> ${newDate}</li>
                </ul>
              </div>
            </div>
          </div>
            <div id="repositories"></div>
          `;
    // if (user.public_repos > 10)
    //   content += `<button>More Repos</button>`
    this.profile.innerHTML = content;
  }
  showRepos(repos, count) {
    let output = `<h3 class="page-heading mb-3">${count} Latest Repositories</h3>`;
    repos.forEach(function (repo) {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
              <div class="col-md-6">
                  <h5>
                  <a href="${repo.html_url}" class="project-name" target="_blank">${repo.name}</a>
                  </h5>
              </div>
              <div class="col-md-6">
                  <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                  <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Forks: ${repo.forks_count}</span>   
              </div>
          </div>
        </div>`;
    });
    document.querySelector("#repositories").innerHTML = output;
  }

  clearProfile() {
    this.profile.innerHTML = "";
  }

  showAlert(message) {
    this.clearAlert();
    const alert = document.querySelector("#user-alert")
    alert.appendChild(document.createTextNode(message));
    alert.style.display = "block"
    // const container = document.querySelector(".searchContainer");
    // const search = document.querySelector(".search");
    // container.insertBefore(div, search);
  }

  clearAlert() {
    const alert = document.querySelector("#user-alert")
    alert.innerHTML = ""
    alert.style.display = "none"
  }
}