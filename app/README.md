# Frontend

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Git installed on your machine. You can download it from [here](https://git-scm.com/downloads).

### Cloning the Repository

To clone the repository, run the following command in your terminal:

```bash
git clone https://gitlab.utu.fi/capstonespring2024/frontend.git
```

### Creating a Branch

Navigate into the cloned repository:

```bash
cd frontend/tesy-app
```

#### Install the dependencies

If you are using npm as your package manager, run:

```bach
npm  install
```

If you are using yarn as your package manager, run:

```bach
yarn  install
```

These commands read the `package.json` file in your project directory and install the necessary packages listed under `dependencies` and `devDependencies`.

Create a new branch to make your changes:

```bash
git checkout -b <your-branch-name>
```

### Making Changes and Pushing to GitLab

After making your changes, stage and commit them:

```bash
git add .
git commit -m "Write whtat changes you have made"
```

Push your changes to GitLab:

```bash
git push origin <your-branch-name>
```

```
Remember to replace `<your-branch-name>` with the actual name of your branch.
```

### Stay updated

To stay updated with the main branch, you can periodically pull the latest changes from the main branch into your local repository. Here's how you can do it:

First, make sure you are on the main branch:

```bash
git checkout main
```

Then, pull the latest changes from the main branch:

```bash
git pull origin main
```

This will fetch the latest changes from the main branch on the remote repository and merge them into your local main branch.

If you are working on a different branch and want to incorporate the latest changes from the main branch into your branch, you can merge the main branch into your branch:

```bash
git checkout <your-branch-name>
git merge main
```

Or, if you prefer to rebase your branch on top of the main branch:

```bash
git checkout <your-branch-name>
git rebase main
```

Remember to replace `<your-branch-name>` with the actual name of your branch.

To create a pull request (also known as a merge request in GitLab), follow these steps:

1. Push your branch to the remote repository:

```bash
git push origin <your-branch-name>
```

2. Go to the GitLab page for your project.

3. Click on "Merge Requests" in the left sidebar.

4. Click on the "New Merge Request" button.

5. In the "Source branch" field, select your branch. In the "Target branch" field, select the branch you want to merge your changes into (usually `main` or `master`).

6. Click on the "Compare branches and continue" button.

7. Fill in the title and description for your merge request, then click on the "Submit merge request" button.

8. Once your merge request has been reviewed and all discussions have been resolved, someone with the appropriate permissions can click on the "Merge" button to merge your changes into the target branch.

### Clean up

After merging a branch, it's a good practice to delete the branch if it's no longer needed. Here's how you can do it:

1. Delete the branch locally:

```bash
git branch -d <your-branch-name>
```

2. Delete the branch on the remote repository:

```bash
git push origin --delete <your-branch-name>
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
