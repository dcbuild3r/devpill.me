---
title : "Design patterns"
description: "Modern Solidity application design patterns"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 64
---

Once you're comfortable with writing more and more complex contracts and maybe taking a look at the front-end code and it interacts with the smart contracts, you'll start getting a feel for how smart contracts are designed from a more high-level view. There are certain designs and patterns which are commonplace, things like the approved pattern for tokens, and more. At this point, it is a good idea to start thinking more about the overall architecture of your code and the structure that it will take to efficiently implement the functionality you want to enable.

There are common patterns employed in smart contract development, this [Solidty-patterns](https://github.com/fravoll/solidity-patterns) repo implements some of them.

Since the EVM is such a constrained environment where each additional operation executed by the EVM adds gas costs to the execution of the smart contract, developers try to build as least resource-intensive contracts as possible whilst also maximizing readability and security. Since blockchains are a very adversarial environment were mistakes in a smart contract could lead to fund drains (RUGS) and exploits, it can be considered mission-critical software and so many developers get inspiration from other mission-critical software guidelines like the ones of NASA which are responsible for the lives of astronauts going to space. These development principles are guidelines that help optimize a codebase for maximum security through the adoption of a standardized procedure and developer mindset.

#### ENS integration

We mentioned how to integrate ENS domain names into your dapp within the [front end development section](#front-end-development), but as a smart contract developer you can also [resolve ENS domain names on-chain](https://docs.ens.domains/contract-developer-guide/resolving-names-on-chain), [write your own resolver](https://docs.ens.domains/contract-developer-guide/writing-a-resolver) which implements [EIP137](https://github.com/ethereum/EIPs/issues/137) or even [write your own registrar](https://docs.ens.domains/contract-developer-guide/writing-a-registrar).
