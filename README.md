![Image description](public\Logo_MudaYa_low.png)

# MudaYa
> Software Engineering II Proyect - Universidad Nacional de Colombia

This is the frontend repository for MudaYa's website. MudaYa's purpose 
is to provide a system capable of connecting in real-time clients and moving service's providers. 

## Installing / Getting started

It is required that you already have Javascript and Nodejs set up.

In the project directory, run:

```shell
npm install
```

This command installs a package, and any packages that it depends on. If the package has a
package-lock or shrinkwrap file, the installation of dependencies will be driven by that,
with an npm-shrinkwrap.json taking precedence if both files exist. See package-lock.json and
npm-shrinkwrap.

## Developing

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/csepulvedaz/mudaya.git
cd mudaya
git flow feature start <your-feature>
```

This creates a new branch based off the project's develop branch called 
feature/<your-feature> and automatically does a git checkout into it. 
You can now work freely on it as you wish.

```shell
git flow feature publish <your-feature>
```
This publish <your-feature> to the remote server so it can be used by other users.

```shell
git flow feature finish <your-feature>
```
This finish a branch based off the project's develop branch called 
feature/<your-feature> and automatically does a git merge into develop branch.

### Building

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Deploying / Publishing

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Features

* Frontend React-based web service for MudaYa's Uber-like operation

Alongside the associated backend:

* Provide an intermediary service between the client and the moving service provider 
* Provide a platform for offering your moving services and trucks
* Provide a platform to hire said moving service and follow it live
* Rate the service provider after it has been hired
* Have a reliable database access of potential customers and service providers 
* Have a map-based approach between providers and customers

## Contributing



- Create folder: You must name the folders with lowercase letters, if it is more 
  than one word, the second one begins with a capital letter.
- Create Components: You must name the component starting with a capital letter.
- Section: Every section that is created must have a folder within components.
- Dependencies: Before using a new dependency, notify the repository owner.

## Links

- Project homepage: https://mudaya.atlassian.net/
- Repository: https://github.com/csepulvedaz/mudaya/
- Issue tracker: https://github.com/csepulvedaz/mudaya/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    fpieschaconr@una.edu.co directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!
- Related projects:
  - Backend project: https://github.com/csepulvedaz/mudaya/


## Licensing

The code in this project is licensed under GNU Affero General Public License v3.0 license.

## This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
