var github, display;
window.addEventListener('load', () => {
  const gitUsername = document.querySelector("#gitUsername");
  github = new Github();
  display = new Display();
  gitUsername.addEventListener("keyup", getData());
})

function getData() {
  const githubid = gitUsername.value;
  if (githubid !== "") {
    github.getUserData(githubid).then((data) => {
      if (data.profile.message === "Not Found") {
        display.showAlert("User not found");
      } else {
        display.clearAlert();
        display.showProfile(data.profile);
        display.showRepos(data.profile.login, data.repos ? data.repos.length > 10 ? data.repos.slice(0, 10) : data.repos : []);
      }
    });
  } else {
    display.clearAlert();
    display.clearProfile();
  }
}

function viewProfile(url) {
  window.open(url, '_blank');
}

const debounce = function (delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData();
    }, delay);
  };
};

const fetchData = debounce(400);