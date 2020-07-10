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
    //followers
    //following
    let content = `<div class="card card-body mb-3">
    <div class="row">
        <div class="col-md-4 basic-profile">
            <img class="img-fluid mb-2 avatar" src="${user.avatar_url}">
            <span class="name">${user.name ? user.name : ''}</span>
            <p class="username">${user.login}</p>
            <p class="bio">${user.bio ? user.bio : ''}
            <button onclick='viewProfile("${user.html_url}")' target="_blank" class="btn btn-block view-profile">View Profile</button>
            <div>
              <img class="user-svg pb-1" src="./assets/images/users.svg"> <span><b>${user.followers}</b></span> Followers <span> .
              </span><span><b>${user.following}</b></span> Following
              <span class="badge badge-primary ">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
              <ul class="list-group">
                  <li class="list-group-item"><b> Company:<b> ${user.company}</li>
                  <li class="list-group-item"><b> Website/ Blog:</b> <a href="https://${user.blog}" target=_blank>
                          ${user.blog}</a></li>
                  <li class="list-group-item"> <b> Location: </b> ${user.location}</li>
                  <li class="list-group-item"> <b> Member Since: </b> ${newDate}</li>
              </ul>
          </div>
        </div>
        <div class="col-md-8 repos">
            <div id="repositories"></div>
        </div>
    </div>
</div>`;
    this.profile.innerHTML = content;
  }
  showRepos(user, repos) {
    console.log(repos)
    let output = '';
    let context = this;
    if (repos.length > 0) {
      output = `<h3 class="page-heading mb-3">Recent Repositories</h3>`;
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
          } output += `<span><span class="repo-language-color mr-2" style="background-color: ${color}"></span class="grey">${repo.language}</span>`
        }
        let updateddate = context.getDate(repo.updated_at)
        output += `</div>
              <div class="col-md-6">
                  <span class="badge badge-primary"> ${repo.stargazers_count} Stars</span>
                  <span class="badge badge-secondary">${repo.watchers_count} Watchers </span>
                  <span class="badge badge-success"> ${repo.forks_count} Forks</span>  
                  <p class="mt-2 grey">Updated on ${updateddate}</p> 
              </div>
          </div>
        </div>`;
      });
    }

    else
      output += `${user} doesn’t have any public repositories yet!!.`
    this.repositories = document.querySelector("#repositories")
    this.repositories.innerHTML = output;
    this.repositories.style.display = 'block'
  }
  getDate(fetched_date) {
    const date = new Date(fetched_date);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const newDate = `${date.getDate()} ${months[date.getMonth()]}`;
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