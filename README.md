# Tesy App

## Overview

The Animal Welfare App is designed to facilitate the management and coordination of animal welfare activities. It provides a platform for users to report animal welfare issues, track the status of reported cases, and manage resources for animal care. The backend of the application is built using Node.js and Express, providing a robust and scalable API for the frontend to interact with the database and perform various operations.

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: A library for routing in React applications.
- **React Hook Form**: A library for managing form state in React.
- **Bootstrap**: A CSS framework for building responsive web interfaces.
- **React Bootstrap**: Bootstrap components built with React.
  Development Tools
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.

## Installation

### Prerequisites

- Node.js
- npm or yarn
- Database (e.g., MySQL, PostgreSQL)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/sajal9922/Tesy.git
   ```
2. **Navigate to the project directory**:
   `sh
    cd tesy-app
    ` 3.**Install dependencies**:

```sh
  cd install
```

4.**Set up the database**:

- Create a new database.
- Run the database migrations (if applicable).

5.**Configure environment variables**:

- Create a .env file in the root directory.
- Add the necessary environment variables (e.g., database connection details).

# Backend

---

Main branch is protected and it's only used for merging production code when a development branch is ready for first production release.

We use development branch for to collect all features from developers. For each new feature (ie. user-authentication, animals-queries etc.) developer will create new feature branch.

Already created branches can be found here on lefthand side dropdown menu.

### This development branch will be deployed to Heroku

### so theres some things to note!

Heroku doesn't use dotenv -file, it pulls the environment variables straight from its own process.
So while we use dotenv like this:

.env

```
SERVER_PORT=5000
```

config.js -file

```
const SERVER_PORT=process.env.SERVER_PORT
module.exports = SERVER_PORT
```

Heroku uses its own variables which are assigned separately from the dotenv and config file. Remember, this is the production code so it's running on the cloud.

Login to Heroku

```
heroku login
```

View all the herokus environment variables

```
heroku config
```

Herokus config vars (environment variables) are set like this:

```
heroku config:set SERVER_PORT=12345
```

This means when we're pushing to this development branch and it will deploy it to Heroku through CI/CD pipeline the code doesn't need the dotenv anymore.

Comment out the imports from the .js -files about that and just use bluntly:

```
process.env.SERVER_PORT
```

and that will work if its set on Heroku.

Hope this makes sense, because usually the dotenv problems are from this. Also, see the heroku logs:

```
heroku logs --tail
```

### Initial setup

```
cd your_development_directory
git init
git remote add origin https://github.com/sajal9922/Tesy.git
```

### How to get the code and start working on a new feature?

When starting feature development with `git fetch`, you typically follow these steps:

1. **Update Your Local Repository**: Pull the latest changes from the remote repository to ensure your local repository is up to date:

   ```bash
   git pull origin
   ```

2. **Create a Feature Branch**: Create a new branch for your feature development based on the latest changes fetched from the remote repository. For example:

   ```bash
   git checkout -b feature/my-feature origin/development
   ```

   This command creates a new local branch named `feature/my-feature` based on the latest changes in the `development` branch of the remote repository.

3. **Start Development**: Begin developing your feature on the newly created branch. Make changes to the code, add new files, or modify existing ones as needed.

4. **Commit Changes**: Once you've made some progress on your feature, commit your changes to the local branch:

   ```bash
   git add .
   git commit -m "Implement feature X"
   ```

5. **Fetch Regularly**: Throughout the development process, continue fetching changes from the remote repository regularly to stay updated with any changes made by other team members:

   ```bash
   git fetch origin
   ```

6. **Resolve Conflicts (if any)**: If there are conflicts between your changes and the changes fetched from the remote repository, resolve them by editing the conflicting files and then committing the resolved changes.

7. \*\*Push code to feature branch before taking a break:

   ```bash
   git push origin feature/test-feature
   ```

8. **Create a Pull Request**: On the repository hosting platform (e.g., GitHub, GitLab), create a pull request to merge your feature branch into the `development` branch. Provide a clear description of the changes made in the pull request.

9. **Code Review and Merge**: Have your code reviewed by team members. Address any feedback or suggestions. Once approved, merge your feature branch into the `development` branch.

# TLDR

Feature branches are just copies of the development code so we can work as team and not _accidentally_ force merge etc. with `git pull` for example.

Change branches
`git checkout branch_x` or `git checkout feature/some-feature`

Get latest changes
`git fetch origin`

Check whats going on
`git status`

Remember to add your changes
`git add .` for adding everything or `git add some.js other.js asmanyfiles.js`

Commit the changes
`git commit -m "Comment here"`

Push the code to your feature branch
`git push origin feature/the-feature-youre-working-on`

Push the ready code to development branch
`git push origin feature/test-feature:development`
