
const apiUrl = 'https://api.github.com/users/seemapoudel58';
const repoUrl = 'https://api.github.com/users/seemapoudel58/repos';
const followersUrl = 'https://api.github.com/users/seemapoudel58/followers';
const followingUrl = 'https://api.github.com/users/seemapoudel58/following';

const repoList = document.querySelector('.repoList');
const heroBio = document.querySelector('.hero-bio');
const followersCount = document.querySelector('.followers-count');
const followingCount = document.querySelector('.following-count');
const publicProfileLink = document.querySelector('.public-profile-link');
const heroImgContainer = document.querySelector('.hero-img-container');

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch user information: ${response.status}`);
    }
    return response.json();
  })
  .then(userData => {
    heroBio.textContent = userData.bio;
    followersCount.textContent = userData.followers;
    followingCount.textContent = userData.following;

    const userPhoto = document.createElement('img');
    userPhoto.src = userData.avatar_url;
    userPhoto.alt = `${userData.login}'s Photo`;
    userPhoto.classList.add('hero-photo'); 
    heroImgContainer.appendChild(userPhoto);
  })
  .catch(error => {
    console.error('Error fetching user information:', error.message);
  });

fetch(repoUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    data.forEach(repository => {
      const repoItem = document.createElement('li');
      repoItem.classList.add('repo-card');

      const repoName = document.createElement('h2');
      repoName.textContent = repository.name;

      const repoDescription = document.createElement('p');
      repoDescription.textContent = repository.description;

      const made = document.createElement('p');
      made.classList.add('repo_made-with');
      made.innerHTML = `<span>Made with:</span> ${repository.language}`;

      const starsLink = document.createElement('div');
      starsLink.classList.add('repo_stars-link');
      starsLink.innerHTML = `
        <p><i class="fa-regular fa-star"></i> ${repository.stargazers_count}</p>
        <p><a href="${repository.html_url}" target="_blank">View Repository</a></p>
      `;

      repoItem.appendChild(repoName);
      repoItem.appendChild(repoDescription);
      repoItem.appendChild(made);
      repoItem.appendChild(starsLink);
      repoList.appendChild(repoItem);
    });
  })
  .catch(error => {
    console.error('Error fetching repositories:', error.message);
  });

fetch(followersUrl)
  .then(response => response.json())
  .then(followersData => {
    followersCount.textContent = `${followersData.length} followers`;

  })
  .catch(error => {
    console.error('Error fetching followers count:', error.message);
  });

fetch(followingUrl)
  .then(response => response.json())
  .then(followingData => {
    followingCount.textContent = `${followingData.length} following`;
  })
  .catch(error => {
    console.error('Error fetching following count:', error.message);
  });
