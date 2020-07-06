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
        display.showRepos(data.repos);
      }
    });
  } else {
    display.clearAlert();
    display.clearProfile();
  }
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