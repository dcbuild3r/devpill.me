---
title : "Tooling"
description: "Which complementary tools will you use as a front end blockchain developer"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 41
---

As a developer, there are many tools you'll use to make building applications easier and more efficient, to collaborate on projects with other people, to manage dependencies, and much more. This is a short section on different tooling you'll find yourself using regularly.

#### Package management

If you've gotten this far in the front-end specialization you've certainly had to install packages like React, Next.js, tailwind.css, ethers.js, and many others. The most popular package managers in the JavaScript ecosystem are `npm` and `yarn`. Package managers allow you to keep track of which versions of which external code libraries your application uses as well as how the project's code is structured, how to run different tests, how to run your program, and various other miscellaneous tasks.

As you build more complex applications it is good to learn the depths of your package manager, how to structure `package.json` files, how to write scripts that automate the boring stuff, how to set up a CI/CD pipeline (we'll talk about this in a bit), and more.

- [Package management basics](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management)
- [npm](https://www.npmjs.com/)
- [yarn](https://yarnpkg.com/)

#### Styling / Animation

There are many CSS libraries and frameworks which modify the way in which you write CSS. There are libraries that allow you to write CSS within JavaScript, component libraries for React which have a lot of the styling done for you, animation libraries, and more. I'll mention a few of the most popular ones, feel free to suggest changes as I'm not an expert in the area.

- [styled-components](https://www.styled-components.com/) (CSS in JS)
- [Tailwind.css](https://tailwindcss.com/) (CSS framework)
- [Framer Motion](https://www.framer.com/motion/) (Animations framework)
- [Chakra UI](https://chakra-ui.com/) (component library)
- [Material UI](https://mui.com/) (component library)
- [Sass](https://sass-lang.com/) (CSS pre-processor)
- [PostCSS](https://postcss.org/) (CSS pre-,post-processor)
- [awesome-CSS](https://github.com/awesome-css-group/awesome-css) (CSS learning repo)

#### Linting / Formatting

A linter is a static code analysis tool used to flag programming errors, bugs, stylistic errors, and suspicious constructs and a code formatter makes sure that the code you write has a homogenous style structure and abides by the formatting rules of a specific programming language (i.e. [PEP8](https://www.python.org/dev/peps/pep-0008/) for Python). When you're writing code, it's easy to miss a space, a tab, a colon, an opening or closing bracket, or to write code with bad and inconsistent styling. That's where linters and formatters will come in handy as they automate the task, they can be configured to run on saving and on commit, so that badly styled code never gets into production or into a public repo. The most popular choices are:

- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

#### CI/CD

CI/CD stands for continuous integration / continuous deployment, they are a set of tools that allow you to create automatic processes that execute whenever a change is made to the codebase usually hosted on the cloud so that the production servers running your application get automatically updated with the newly pushed code. These actions can also modify and run tests on the code before it gets pushed into production, if tests fail the commit or update will not go through and collaborators will get notified of this. Once projects become bigger and they have big teams of contributors a solid CI/CD pipeline is very important so as to maximize the security and correctness of code being pushed into production. Examples of popular CI/CD tooling are:

- [GitHub Actions](https://github.com/features/actions)
- [CircleCi](https://circleci.com/)
- [Husky](https://typicode.github.io/husky/#/)

#### Testing

A key part of development is mitigating how many bugs are inside of your application. To ensure that the code behaves as it is intended to we write [unit tests](https://en.wikipedia.org/wiki/Unit_testing), [integration tests](https://en.wikipedia.org/wiki/Integration_testing) or even [end-to-end tests](https://www.browserstack.com/guide/end-to-end-testing). Each kind of test focuses on a different part of the application lifecycle. Modern tooling like Cypress allows you to simulate all possible states of your application and simulate user flows, you can even record user session tests as if you were recording a real user going through your website. In web3 you will also be doing integration tests for smart contract interaction. You can test smart contracts using libraries like [Foundry](https://github.com/gakonst/foundry), [Hardhat](https://hardhat.org/) or [Truffle](https://trufflesuite.com/). Most of these tests will be written by a smart contract or full-stack developer, however, as a frontend developer, you need to test how the interactions with the contracts will influence the flow of the user interface of your application. You can write various tests in JavaScript with ethers.js and couple it with Cypress to write complex tests. The web3 app development lifecycle usually goes from locally deployed smart contracts and front-end, to testnets (live network environment but with non-valuable assets), and to mainnet (not necessarily Ethereum mainnet, it can be an L2 like Arbitrum, a sidechain like Polygon PoS, etc). On the smart contract, side development teams hire external security auditors to verify that the contracts are secure to use, we will cover this in-depth in the [smart contract development section]().

- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)
- [Mocha](https://mochajs.org/)

#### ENS integration

[ENS domains](https://ens.domains/) are human-readable domains for Ethereum addresses, the registrar for these domains is fully on-chain and the protocol is decentralizaed and governed by a DAO. ENS domains serve as an on-chain identity mechanism which many Ethereum users use to express themselves on-chain and to display information about themselves through ENS profile metadata containing contact information like email, Twitter, Discord or links to websites, a profile picture (NFT image metadata) and more. As a web3 front end developer you can tap into this registrar and display users' information once they've connected to your application with their web3 wallet.

The best way to get started with ENS is [their official documentation](https://docs.ens.domains/), here you can get a general understanding of the ENS protocol. For integrating ENS into your dapp, visit [this section](https://docs.ens.domains/dapp-developer-guide/ens-enabling-your-dapp). You need to perform 3 steps in order to support ENS within your application:

1. [Resolve ENS names](https://docs.ens.domains/dapp-developer-guide/resolving-names)
2. [Support reverse resolution](https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution)
3. [Let users manage their ENS names](https://docs.ens.domains/dapp-developer-guide/managing-names)

If you are interested in how the on-chain parts of ENS work, check out the [smart contract development section]()
