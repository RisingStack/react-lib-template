## React Lib Template - by [RisingStack](https://risingstack.com/)

<details>
<summary><strong>Table of Contents</strong></summary>
<!-- Do not edit the Table of Contents, instead regenerate with `npm run build-toc` -->

<!-- toc -->

- [React Lib Template - by RisingStack](#react-lib-template---by-risingstack)
- [Introduction :wave:](#introduction-wave)
- [Installation :cd:](#installation-cd)
  - [Manual setup](#manual-setup)
- [Platform support :computer:](#platform-support-computer)
- [Alternative builds :wrench:](#alternative-builds-wrench)
- [Contributors :sparkles:](#contributors-sparkles)

<!-- tocstop -->

</details>

## Introduction :wave:

React Lib Template is a template repository for React based libraries.

## Installation :cd:

Create git repository based on this template by clicking the `Use this template` button.

### Manual setup

Add `COVERALLS_REPO_TOKEN`, `GH_TOKEN` and `NPM_TOKEN` to CircleCI Environment Variables. The last two is required for [Semantic Release Authentication](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/ci-configuration.md#authentication-for-plugins).

[Enable CircleCI](https://circleci.com/docs/2.0/enable-checks/).

[Setup Coveralls](https://github.com/marketplace/coveralls).

## Platform support :computer:

- Node: 6 and above
- Chrome: 49 and above
- Firefox: 38 and above
- Safari: 10 and above
- Edge: 12 and above
- Opera: 36 and above
- React Native: 0.59 and above

_This library is based on non polyfillable ES6 Proxies. Because of this, it will never support IE._

## Alternative builds :wrench:

This library detects if you use ES6 or commonJS modules and serve the right format to you. The default bundles use ES6 features, which may not yet be supported by some minifier tools. If you experience issues during the build process, you can switch to one of the ES5 builds from below.

- `@risingstack/react-lib-template/dist/es.es6.js` exposes an ES6 build with ES6 modules.
- `@risingstack/react-lib-template/dist/es.es5.js` exposes an ES5 build with ES6 modules.
- `@risingstack/react-lib-template/dist/cjs.es6.js` exposes an ES6 build with commonJS modules.
- `@risingstack/react-lib-template/dist/cjs.es5.js` exposes an ES5 build with commonJS modules.

If you use a bundler, set up an alias for `@risingstack/react-lib-template` to point to your desired build. You can learn how to do it with webpack [here](https://webpack.js.org/configuration/resolve/#resolve-alias) and with rollup [here](https://github.com/rollup/rollup-plugin-alias#usage).

## Contributors :sparkles:

Contributions are always welcome, please read our [contributing documentation](CONTRIBUTING.md).
