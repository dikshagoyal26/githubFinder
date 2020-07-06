class Display {
  profile;
  repositories;
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
    let newDate = this.getDate(user.created_at)
    if (user.blog === "") user.blog = "-";
    console.dir(this)

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
            <div id="repositories" class="card card-body"></div>
          `;
    // if (user.public_repos > 10)
    //   content += `<button>More Repos</button>`
    this.profile.innerHTML = content;
  }
  showRepos(repos) {
    let output = `<h3 class="page-heading mb-3">Repositories</h3>`;
    let context = this;
    repos.forEach(function (repo) {
      output += `
        <div class=" mb-2 repo-card">
          <div class="row">
              <div class="col-md-6">
                  <h5>
                  <a href="${repo.html_url}" class="project-name" target="_blank">${repo.name}</a>
                  </h5>
                  `
      if (repo.language) {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        } output += `<span><span class="repo-language-color mr-2" style="background-color: ${color}"></span>${repo.language}</span>`
      }
      let updateddate = context.getDate(repo.updated_at)
      output += `</div>
              <div class="col-md-6">
                  <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                  <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Forks: ${repo.forks_count}</span>  
                  <p class="mt-2">Updated at ${updateddate}</p> 
              </div>
          </div>
        </div>`;
    });
    this.repositories = document.querySelector("#repositories")
    this.repositories.innerHTML = output;
    this.repositories.style.display = 'block'
  }
  getDate(fetched_date) {
    const date = new Date(fetched_date);
    const newDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    return newDate
  }
  clearProfile() {
    this.profile.innerHTML = "";
  }

  showAlert(message) {
    this.clearAlert();
    const alert = document.querySelector("#user-alert")
    alert.appendChild(document.createTextNode(message));
    alert.style.display = "block"
  }

  clearAlert() {
    const alert = document.querySelector("#user-alert")
    alert.innerHTML = ""
    alert.style.display = "none"
  }
}