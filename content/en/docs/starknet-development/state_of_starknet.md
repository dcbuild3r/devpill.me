---
title : "State of StarkNet"
description: "Is StarkNet ready for developers and adoption? Read more to find out"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 1003
---

This section is not going to be kept up to date but will rather serve the purpose of illustrating the general state and direction of the network at the time of release of this section (Summer 2022). In order to keep up to date with the latest developments in Starknet, its technologies and its ecosystem, check out the How to stay up to date with Starknet section.

## Execution environment

[Cairo](https://www.cairo-lang.org) is the execution environment used within Starknet. It was built the Starkware teams and it provides the first Turing-complete language for creating provable programs for general computation, builtins and field elements that enable efficient generation of proofs and production ready environment for building scalable dapps on Ethereum.

It is a very nascent ecosystem and therefore the language, the underlying infrastructure and the tooling around it is still rapidly evolving. That means that it is not as mature as the EVM ecosystem where there have been over 6 years of development and the environment is stable with very few breaking changes happening. As a developer you can expect that some of the ways of doing things will change with time, however everything you learn will translate within the Starknet ecosystem itself. However if you learn Cairo, some primitives will not translate to other ecosystems like Optimism, zkSync, Aztec or other blockchains and scaling solutions and viceversa.

The biggest difference coming from an EVM ecosystem is the lack of a mature development environment with robust testing and build tools, talent/companies performing security audits, smaller community support (although Starkware and the wider Starknet ecosystem is very supportive), more breaking changes from version to version of Cairo compared to languages like Solidity or Vyper, etc.

There are also a few quirks to the Cairo language which stem from the fact that ZK rollups have certain restrictions and patterns in which they do things and those get reflected in the language. We will talk more about this in the Cairo section.

## Ecosystem and adoption

[The Starknet ecosystem](https://www.starknet-ecosystem.com/) is growing rapidly, but it is still in its early stages of adoption. The Starknet Alpha was launched on testnet over a year ago and mainnet alpha came a little bit after that. [The network is scheduled to undergo a full state reset](https://medium.com/starkware/regenesis-starknets-no-sweat-state-reset-e296b12b80ae) (Q4 2022) and all currently deployed contracts and addresses will need to be redeployed. This change however will only happen once and will be the last one that Starkware performs (there may be another as the network will be decentralized and operated by the community).

![Starknet ecosystem](https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/c4de6e90-28b7-4de3-b19b-a2210020ad0f_1920x1080.jpeg)

The Starknet ecosystem has a lot of projects and developers already building on it compared to other nascent ecosystems and it is growing at a steady pace. Major applications such as MakerDAO, Aave and others are deploying contracts on Starknet and are putting resources into building on top of the platform. It is a promising space and if you are a developer trying to build on Starknet there won't be a lack of opportunities as the demand for good Cairo developers far outpaces the available supply. Within the Starknet developer guide there is a section on how to find a job in the Starknet ecosystem which might be worthwhile checking out.

## How to stay up to date with Starknet

Being a developer on a fastly moving platform is not easy. There are new changes being made to the execution environment, new libraries coming into existence, new tooling for building robust applications, services like smart contract auditing being provided by more and more companies and more applications coming to life that you can integrate with. In order to be able to focus on what matters as a developer, it is important to be aware of these things, and there are a few newsletters and resources which can help you with this.
Checkout:

- [Starknet Weekly News](https://swagtimus.substack.com/) from [Swagtimus](https://twitter.com/Swagtimus?s=20&t=QOCyoyk_lC6htwskZizzGA)
- [Starknet Daily News](https://nurstar.substack.com/) by [0xnurstar](https://twitter.com/0xNurstar/)
- [Summaries from the Starknet ecosystem](https://twitter.com/Testnet_Digger/) by [@Testnet_Digger](https://twitter.com/Testnet_Digger/)
- [Starkware Blog](https://starkware.medium.com/)
