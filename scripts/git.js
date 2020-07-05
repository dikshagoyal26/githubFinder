class Github {
  repos_count;
  repos_sort;
  constructor() {
    this.repos_count = 10;
    this.repos_sort = "pushed";
  }

  async getUserData(user) {
    const userProfile = await fetch(
      `https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`
    );

    const userRepo = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${client_id}&client_secret=${client_secret}`
    );

    const profile = await userProfile.json();
    const repos = await userRepo.json();
    console.dir(profile)
    console.dir(repos)

    return {
      profile,
      repos,
    };
  }
}