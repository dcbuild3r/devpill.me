---
title : "Testing"
description: "How to test smart contracts"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 63
---

Testing smart contracts is an essential part of the development process as it ensures that the code you write behaves as intended and is secure against various technical and economic exploits. Many different libraries are used by different teams, there are pros and cons to using each different library and in some cases, they can be used in a complementary fashion. We will cover the most popular ones among top-tier developers as well as the most commonly used ones like HardHat and Truffle.

**Opinionated recommendations:** Foundry for testing and Hardhat for deployments

#### Foundry

[Foundry](https://github.com/gakonst/foundry) is the hottest library in the Ethereum development landscape, it is originally built by Georgios Konstantopoulos who is one of the most highly respected developers in the entire Ethereum ecosystem. Georgios is currently the CTO at Paradigm and part of his job is building tools for developers that will be used to create the applications of the future.

Foundry is composed of two parts: Forge and Cast.

- **Forge:** Forge is a fast and flexible Ethereum testing framework, inspired by Dapptools.
- **Cast:** Swiss army knife for interacting with EVM smart contracts, sending transactions, and getting chain data.

The library is written in Rust, which is a systems-level programming language that has memory safety, borrow checking, performant concurrency, and many other features which are making it one of the favorite languages used by developers across all fronts. Many popular libraries are being written in Rust, popular compiler targets like WASM are supported by Rust, a lot of Ethereum developer tooling is built using Rust or is refactoring their infrastructure to use Rust. It is a very exciting trend in blockchain development and many developers are learning the language to be able to contribute to these cool pieces of software. The best way to get started with Rust is [The Rust Book](https://doc.rust-lang.org/book/) and the [Rustlings repo](https://github.com/rust-lang/rustlings/).

The reason why Foundry is getting a lot of popularity and it is so important, is because Solidity tests should be written in Solidity and not in JavaScript. It is very hard to master two different languages at once and Solidity developers shouldn't be forced to learn it in order to be able to test their smart contracts. Foundry is also getting an increasingly superior development environment in terms of features. The main features for which you might use other toolkits are mainly deployment which is not supported by Foundry so far. For managing deployments, the standard toolkit is HardHat. For testing, gas optimization features, fuzzing, symbolic execution (hevm), etc, do use Foundry. Good resources for learning and mastering Foundry are:

- [Brockjelmore's Foundry walkthrough](https://www.youtube.com/watch?v=Rp_V7bYiTCM)
- [The Foundry Book](https://onbjerg.github.io/foundry-book/) - Community sourced documentation
- [Foudry 2.0](https://www.paradigm.xyz/2022/03/foundry-02)
- [Tweet from @andreasbigger](https://twitter.com/andreasbigger/status/1500209878433894400?s=20&t=5HKeV0q_h3Z3QoRvlkO_hQ):
  - Familiarize yourself w/ [Forge-cli](https://github.com/gakonst/foundry/blob/master/cli/README.md)
  - Checkout some templates:
    - [FrankieIsLost forge template](https://github.com/FrankieIsLost/forge-template)
    - [ZeframLou forge template](https://github.com/ZeframLou/foundry-template)
    - [AndreasBigger femplate](https://github.com/abigger87/femplate)
  - Dive into repos using Foundry:
    - [lil-web3](https://github.com/m1guelpf/lil-web3/)
    - [n3rp](https://github.com/GrantStenger/n3rp)
    - [zen](https://github.com/zkSoju/zen)
    - [cloaks](https://github.com/abigger87/cloaks)
    - [ethernaut-x-foundry](https://github.com/ciaranmcveigh5/ethernaut-x-foundry)
    - [damn-vulnerable-defi-foundry](https://github.com/nicolasgarcia214/damn-vulnerable-defi-foundry)
    - [Multicall](https://github.com/mds1/multicall)
  - [Brockelmore's testing verbosity with forge-std](https://github.com/brockelmore/forge-std)
  - Foundry templates
    - [Femplate](https://github.com/abigger87/femplate) - [@andreasbigger](https://twitter.com/andreasbigger)
    - [Foundry Rust monorepo](https://github.com/gakonst/foundry-rust-template) - [@gakonst](https://twitter.com/gakonst)
    - [Foundry template](https://github.com/ZeframLou/foundry-template) - [@boredGenius](https://twitter.com/boredGenius)
    - [Opinionated Forge Guide](https://www.libevm.com/2022/03/19/opinionated-forge-guide/) - [@libevm](https://twitter.com/libevm)

#### HardHat

[Hardhat](https://hardhat.org/) is the Ethereum development library that’s the most widely used across the ecosystem and is the standard in most production codebases like Aave, Uniswap, and many others. Usually, all the deploy scripts, migration files, automation scripts, etc are written using Hardhat and their tooling suite. It is a javascript library (that has Typescript support). Recently the Hardhat team announced that they are moving their infrastructure to Rust as most of the tooling ecosystem is moving to use it do its performance and security.

**Learning resources:**

- To get started, go through the [official documentation](https://hardhat.org/getting-started/)

#### Dapptools

[Dapptools](https://github.com/dapphub/dapptools)  is a suite of Ethereum focused CLI tools following the Unix design philosophy, favoring composability, configurability, and extensibility.

There are 4 key elements in Dapptools:

- **dapp** - All you need Ethereum development tool. Build, test, fuzz, formally verify, debug & deploy solidity contracts.
- **seth** - Ethereum CLI. Query contracts, send transactions, follow logs, slice & dice data.
- **hevm** - Testing-oriented EVM implementation. Debug, fuzz, or symbolically execute code against local or mainnet state.
- **ethsign** - Sign Ethereum transactions from a local Keystore or hardware wallet.

A cool innovation done by app tools was the hEVM which is an EVM implementation written in Haskell (a functional programming language) that allows to symbolically execute Solidity code and formally verify the results of the resulting bytecode (opcode operations). This feature was later adopted by Foundry, including many others that were first provided by Dapptools.

#### Truffle Suite

[Truffle Suite](https://trufflesuite.com/) is a suite of tools developed by Consensys to locally test smart contracts by deploying them on a local instance of the Ethereum blockchain, mocking user addresses using the Ganache library, writing tests using Truffle, and creating on-chain data pipelines for user interfaces using Drizzle. It was one of the first complete Ethereum developer tooling ecosystems that were released, but they’ve fallen out of favor in recent years as libraries like Hardhat overtook it.

Personally would not recommend Truffle as testing should be done in Solidity and not in Javascript and deployments are handled better in Harhat.