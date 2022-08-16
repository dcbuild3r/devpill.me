---
title : "Why StarkNet?"
description: "StarkNet value propositions. Why should devs build on StarkNet?"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 1002
---

There are many different scalability solutions which are in different stages of development/production. There are pros and cons to using each one and so it is overwhelming to decide which environment to build on and what tools to learn when you don't have a full picture of the technologies out there. Building on Starknet means that you are making a bet on the ecosystem and the technologies underlying it. Most of the skills you will acquire by building applications on Starknet will transfer over to any other development platform, but some others like knowledge of Cairo syntax may not transfer over as Starknet and StarkEx are the only platforms that currently utilize this language as their VM. That's why it's important to know the underlying properties of the platforms on top of which you will be building as it has a direct impact over your career as a blockchain developer.

Starknet is a nascent ecosystem with tons of opportunities, a lot of technological innovation, bright minds, very capable engineers and prominent builders.

## How to choose which platform to build on top of

Before deciding which platform (chain) to use to build your applications it is good to review the following:

- ecosystem maturity
- execution environment
- interoperability
  - applications
  - liquidity
  - composability
- rate of adoption
- funding
- job opportunities
- personal goals and timelines

In order to to be able to choose the best developer ecosystem to build upon we need to reflect on the afforementioned properties of what makes up a good platform. Let's go over each of the main points and expand on why they are important for blockchain developers.

If you want to learn more about L2 technology and have a good understanding of the pros and cons of each platform read [The Complete Guide to Rollups](https://members.delphidigital.io/reports/the-complete-guide-to-rollups/).

### Ecosystem maturity

This refers to how well developed the technological stack is and how many developers are skilled in the stack. A mature technology is defined as a technology that has been in use for long enough that most of its initial faults and inherent problems have been removed or reduced by further development. Ecosystem maturity is comprised of technological and communital maturity. There are various types of people that need to be skilled in the technology in order to have a thriving ecosystem that has development support, services like smart contract auditing, general security, a lot of engineers that understand the intricacies of the platform, design patterns that emerge from popular large scale codebases, and a lot more. Nascent ecosystems usually have rapidly changing development environments where breaking changes occur from release to release, whereas a mature one does not and only rarely makes changes to the 'usual way of doing things'.

### Execution environment

An execution environment is the place where your code wil be compiled/interpreted and executed by the underlying network of nodes (sequencers in the case of L2s). An environment can support different programming languages/paradigms and has different technical nuissances that are specific to it. Currently the most popular and mature execution environment in the blockchain industry is the Ethereum Virtual Machine (EVM), but there are others such as CosmWasm (Cosmos/Tendermint), zkVM (LLVM - zkSync), Substrate (Polkadot) etc. The execution environment of Starknet is called Cairo and will be the main focus of this guide.

### Interoperability

In the realm of blockchains and web3 applications interoperability can mean different things, but it generally refers to communication between different technological primitives inside of a network (application, blockchain, database storage, oracles, bridges, smart contracts) and to the available applications on a network along with the value within those.

### Rate of adoption

Unfortunately, how good a technology is is not the only indicator for the success of an ecosystem, it also needs to be adopted by a wide enough base of developers, builders, creators and users in order for it to thrive going into the future. There need to be employment opportunities for people learning these technologies or at least awareness from investors and a big enough appeal from potential users in order to start building a good ecosystem. In the realm of blockchains it is especially hard as these computer networks settle value are competing against one another for applications, users, builders, and every possible resource out there in a very public manner. Oftentimes these blockchain ecosystems rely on monetary incentives in the form of ecosystem funding, grants programs, educational programs, event sponsorships and many more.

### Funding

If you want to build a project in any blockchain ecosystem it is important for you to have investors that are able to fund and support the development of your application in a way that's mutually beneficiary and incentive-aligned. Investors need to see your ecosystem in a good light and understand the technological differences between your project and your competitors'. If an ecosystem is too niche or not popular among investors, it might be very hard to bootstrap enough capital to create useful applications on top of them as well as finding the right people to build it since salaries would be a lot more constrained.

### Job opportunities

This applies to both the employer and the employee, a good ecosystem requires for there to enough supply and demand for qualified workforce in different areas, from business development, to growth, design, and most importantly developers. A good way to see whether an ecosystem is healthy is to look at job boards, projects that are building in production and their hiring pages, talking to community members, seeing how many downloads popular developer libraries and packages are getting and how many apps are in production using those technologies, etc.

### Personal goals and timelines

Each ecosystem is at a different stage of adoption and maturity and each individual project or developer has their own personal goals and timelines and so there needs to be awareness of the stage at which the technology is at in order to be sure whether the use case is possible within the current limitations. We will explore this in the next section.

## Starknet value proposition

Before we discuss the state of Starknet, let's take a look at it's value propositions as a scaling solution. Starknet is a zero knowledge rollup, meaning it is a separate ledger with a separate execution environment that computes state transitions and constructs a zero knowledge proof for it. The ZK proofs and based on STARKs, which do not require a trusted setup, have a big proof size but have shorter proving times and are comparably fast to verify. The ZK proofs of state transitions on Starknet get batched and submitted to Ethereum mainnet where they get verified and committed to Ethereum state (currently stored as calldata, in the future stored in blob storage - see [EIP4844](http://eip4844.com)) where they achieve finality. By being a rollup Starknet only needs to have at least one honest sequencer and prover for the state to advance. This means that it can inherit Ethereum's security guarantees whilst being orders of magnitude more scalable. It has its own execution environment named Cairo which is tightly coupled with the rest of its infrastructure. This allows Starknet to provide a very scalable environment for developers to build their applications on top of.
