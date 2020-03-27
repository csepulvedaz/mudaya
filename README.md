![Logo of the project](public\Logo_MudaYa_low.PNG)

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
cd mudaya/
git flow feature start <your-feature>
```

This creates a new branch based off the project's develop branch called 
feature/<your-feature> and automatically does a git checkout into it. 
You can now work freely on it as you wish.

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

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

>If there's anything else the developer needs to know (e.g. the code style
guide), you should link it here. If there's a lot of things to take into
consideration, it is common to separate this section to its own file called
`CONTRIBUTING.md` (or similar). If so, you should say that it exists here.

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

###This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
