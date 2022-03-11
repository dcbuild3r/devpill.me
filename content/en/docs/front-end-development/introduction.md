---
title : "Introduction"
description: "What is front end development?"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 32
---

Front-end (FE) development is probably the easiest once out of all of the ones I'll be listing in my guide. Most of the technology stack blockchain developers use to build user interfaces for their applications overlaps with the traditional web-development infrastructure and so there are is a mature ecosystem of languages, libraries, and APIs you can make use of as a developer to make your life much easier as well as a vast community of developers which maintain codebases, provide support through platforms like [StackOverflow](https://stackoverflow.com/) and create very well produced tutorials and documentations for learning these established technologies, something which isn't the norm in rapidly emerging and constantly evolving web3 technologies.

The key principles of front-development require knowing how to structure and style websites, how to make them dynamic with JavaScript and different frameworks, how to manage state within applications, basic design, how to fetch data from APIs and databases, and how to create good web3 user experiences regarding wallets and the interactions with the smart contract backend of your application. One of the biggest differences in web3 FE development is user-authentication as instead of logging in with your email and password or your Google account, you log in with your wallet using a third-party application like [Metamask](https://metamask.io/) or [WalletConnect](https://walletconnect.com/) and protocols like [ENS](https://ens.domains/) to display information about the user (provided they have an Ethereum domain). If a smart contract contains a state which represents past interactions with the application by the user, you also need to fetch historical data from the blockchain on-demand or maintain a local database with indexed data which is easily queriable by the FE of the application.

As a front-end blockchain developer you need to know what a Contract Application Binary Interface ([ABI](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html)) is in order to be able to interact with smart contracts on the Ethereum blockchain or on an L2 like Optimism, Arbitrum, Starknet, or ZkSync which are Ethereum-based scaling solutions that we'll cover in the [L2 section](#l2). You also need to query data from various APIs to accurately display the price of various assets (if applicable), the user's balance of ERC20 tokens or NFTs, and various other data you might need from either the blockchain itself or an external database.

Another interesting feature of programming decentralized applications is the need for building applications that are not hosted on a centralized server, to remedy this problem many developers have their web interfaces open-sourced and have many instances of those interfaces on decentralized storage solutions like IPFS, Arweave, and others. In this way, if one of the servers hosting the interface to interact with the smart contracts goes down, users can interact with it from many other different places. It's also amazing that since the functions are able to be called by anyone, users can interact with decentralized applications from completely different frontends as long as they have the ABI, this allows for massive composability which we'll cover a bit later.

This roadmap will focus on the frontend technologies that I've seen are mostly used in blockchain development today. I've used the roadmap.sh frontend roadmap, a friend's tech stack, and my experience as a reference for creating this specialization.  If you are a more experienced reader feel free to suggest pull requests to add/edit/remove content or you can suggest changes by DMing me on Twitter or Telegram (@dcbuild3r).
