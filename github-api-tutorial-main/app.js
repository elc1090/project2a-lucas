const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');
    let reposInput = document.getElementById('reposInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;
    let gitHubRepository = reposInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername, gitHubRepository)
        .then(response => response.json())
        .then(data => {

            let ul = document.getElementById('userRepos');
            ul.innerHTML = (``);

            for (let i in data) {

                if (data.message === "Not Found") {
                    ul = document.getElementById('userRepos');
                    let li = document.createElement('li');
                    li.innerHTML = (`
                        <p><strong>Nome de usuário e/ou repositório não encontrado(s)!</strong></p>
                    `);
                    ul.appendChild(li);
                } else {
                    ul = document.getElementById('userRepos');
                    let li = document.createElement('li');

                    li.innerHTML = (`
                        <p><strong>Author:</strong> ${data[i].commit.author.name}</p>
                        <p><strong>Date:</strong> ${data[i].commit.author.date}</p>
                        <p><strong>Message:</strong> ${data[i].commit.message}</p>
                    `);

                    // Append each li to the ul
                    ul.appendChild(li);
                }
            }
        })
})

function requestUserRepos(username, repos) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/repos/${username}/${repos}/commits`));
}
