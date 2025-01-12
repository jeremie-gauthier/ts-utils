# ts-utils

[![codecov](https://codecov.io/gh/jeremie-gauthier/ts-utils/graph/badge.svg?token=41WLAHPFCT)](https://codecov.io/gh/jeremie-gauthier/ts-utils)
[![Documentation](https://ts-utils-assets.s3.amazonaws.com/coverage.svg)](https://jeremie-gauthier.github.io/ts-utils/ 'Go to project documentation')
[![Known Vulnerabilities](https://snyk.io/test/github/jeremie-gauthier/ts-utils/badge.svg)](https://snyk.io/test/github/jeremie-gauthier/ts-utils)

![Tests CI](https://github.com/jeremie-gauthier/ts-utils/actions/workflows/tests.yml/badge.svg)
![gh-pages CD](https://github.com/jeremie-gauthier/ts-utils/actions/workflows/docs.yml/badge.svg)

A collection of TypeScript utils functions with no external dependencies.

[Documentation](https://jeremie-gauthier.github.io/ts-utils/)

## Introduction

This is a personal collection of utility functions written in **TypeScript**.
This library is **free from external dependencies**. Every utils can be copy/paste to different project with the guarantee to work as-is.

## Technical

### Code

The project is split in domain modules. You'll find every utils functions for `string` manipulation under the **string** module, `number` under the **number** module and so on.

I'm applying a **strict level of typing**. Check out my [tsconfig](tsconfig.json).

### CI/CD

Prior to everything, a **git pre-push hook** takes care of running essentials check before proceding to push.
This allow early catch of errors and faster iterations.

The project contains **3 CI/CD workflows**:

1. [Tests CI](.github/workflows/tests.yml): is a **CI workflow** that is responsible of **running the unit tests** ([jest](https://jestjs.io/)). After what a coverage report is issued and then uploaded to [codecov](https://app.codecov.io/gh/jeremie-gauthier/ts-utils).
   _This workflow runs whenever a new utilitary function is added to the project and pushed to the `main` branch._

2. [GH-Pages CD](.github/workflows/docs.yml): is a **CD workflow** that is responsible of **deploying the [static website for documentation](https://jeremie-gauthier.github.io/ts-utils/index.html)**. The documentation is hosted on [Github Pages](https://pages.github.com/).
   _This workflow runs only upon successful completion of the [Tests CI](.github/workflows/tests.yml) one._

3. [Infra Stack CD](.github/workflows/stack.yml): is a **CD workflow** that is responsible of **deploying an AWS Stack** with [Cloudformation](https://aws.amazon.com/fr/cloudformation/) (IaC solution).
   _This workflow runs in standalone, everytime a change is made to the stack.yml config file and pushed to the `main` branch._

## Author

[jergauth](https://jergauth.fr)
