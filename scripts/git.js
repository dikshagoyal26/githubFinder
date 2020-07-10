class Github {
  repos_count;
  repos_sort;
  headers;
  constructor() {
    this.repos_count = 10;
    this.repos_sort = "pushed";
    this.headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': pactoken
      }
    }
  }
  async getUserData(user) {
    const userProfile = await fetch(githubUrl + user, this.headers);
    const profile = await userProfile.json();

    const userRepo = await fetch(githubUrl + `${user}/repos?per_page=${profile.public_repos}&sort=${this.repos_sort}`, this.headers)

    const repos = await userRepo.json();
    console.log({ profile, repos })
    // profile.bio
    return {
      profile,
      repos,
    };
  }
}