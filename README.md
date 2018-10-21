- [About ARSG Bot](#about-arsg-bot)
- [Contributing](#contributing)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Adding A Feature](#adding-a-feature)
    - [Submitting A Pull Request](#submitting-a-pull-request)
- [Built With](#built-with)
- [Author](#author)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## About ARSG Bot
Have you ever dreamed of a Discord server for your group, your community or even your classroom? 
**ARSG Bot is built for classrooms** and is used as an open source project by Highschool IT students. 

## Contributing
As I use this for my own classrooms and students, I know this might not be the perfect approach
for all the projects out there. If you have any ideas, just
[**open an issue**](https://github.com/qcarpentier/arsg-bot/issues/new) and tell me what you think.  
If you'd like to contribute, please fork the repository and make changes as
you'd like. **Pull requests are warmly welcome.** (see below how to do it)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
First, you should install [**Git**](https://git-scm.com/download/win) and [**Node.js**](https://nodejs.org/). 
You will use **NPM**. It's distributed with **Node** - which means that when you download **Node.js**, you automatically get **NPM** installed on your computer.

### Installation
1. Create a [**personal fork**](https://guides.github.com/activities/forking/) of the project on Github.
2. You can easily **clone the fork** on your local machine with the following command:
    ```
    git clone <fork_project>
    ```
3. Then, you should install all the dependencies with the wonderful help of **NPM**:
    ```
    npm install
    ```
4. Your remote repo on Github is called `origin`. Add the **original repository** (this one) as a remote called `upstream`:
    ```
    git remote add upstream https://github.com/qcarpentier/arsg-bot
    ```
5. Add a new branch to work on! Don't work directly on the `master` branch:
    ```
    git checkout -b <new_feature>
    ```

### Adding A Feature
- When implementing or fix a feature, **comment your code.**
- Follow the code style of the project, **including indentation.**
- Add or change the **documentation** as needed. (for example, the `!help` command)

### Submitting A Pull Request

1. Prior to submitting your pull request, you should double check **if any commits have been made** to the `upstream master` branch:
    ```bash
    # Fetch upstream master and merge with your repo's master branch
    git fetch upstream
    git checkout master
    git merge upstream/master
    ```
2. If there were any new commits (and to avoid conflicts), you should [**rebase**](https://help.github.com/articles/about-git-rebase/) your development branch:
    ```
    git checkout <new_feature>
    git rebase master
    ```
3. It's desirable to **squash your commits** into a single cohesive commit. These commands will open up a text editor where you can specify which commits to squash:
    ```bash
    # Rebase all commits on your development branch
    git checkout 
    git rebase -i master
    ```
4. Now, you can **commit and push all of your changes** to your fork on Github, the remote `origin`. 
5. From your fork, **open a pull request in the correct branch**. Target the project's `develop` branch if there is one, else go for `master`! 
6. Once the pull request is approved and merged, you can pull the changes from `upstream` to your local repo and delete your extra branch(es).

## Built With
* [discord.js](https://github.com/discordjs/discord.js/) - A powerful JavaScript library for interacting with the Discord API.
* [node.js](https://github.com/nodejs/node) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [colors.js](https://github.com/marak/colors.js/) - Get colors in your node.js console.

## Author
* **Quentin Carpentier** - *Initial work* - [qcarpentier](https://github.com/qcarpentier)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments
* **The project isn't finished yet**. 
For now, the Bot can only be used for specific commands. It should be available with some wonderful features targeting **Education**.
