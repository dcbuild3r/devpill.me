---
title : "Cairo"
description: "Learn how to build applications on Starknet with the Cairo smart contract programming language."
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 1004
---

## Introduction

[Cairo](https://www.cairo-lang.org/) is a Turing-complete programming language that allows blockchain developers to harnesss the power of [STARKs](https://starkware.co/stark/). In order to build on top of Starknet, developers write Cairo smart contracts and every single operation then gets run inside of the Cairo VM that creates a STARK zero-knowledge proof of the computation performed on Starknet. Cairo is still in its infancy, but as more and more developers use it, features become standardized, and less breaking changes are introduced from version to version, it will become a robust and mature ecosystem. In this section we will go over resources where you can learn Cairo and how to become a good developer on Starknet.

## How to learn Cairo?

There are a few resources that will help you get started with writing, testing and deploying Cairo smart contracts. If you have any questions when learning about Starknet and Cairo, feel free to ask anything on the official [Starknet Discord](https://discord.gg/7vbHfZKJ4m). The resources will appear in the order that I think someone getting started with Cairo should take them. To get started with Cairo I recommend going over [starknet-cairo-101](https://github.com/l-henri/starknet-cairo-101) which is a fun game where you need to read Cairo contracts, understand them and then interact with deployed versions of them to claim points. There are different levels which get progressively harder and they are a lot of fun to go through. To get started I also recommend setting up your [Argent X](https://www.argent.xyz/argent-x/) wallet so that you can interact with the smart contracts on the Starknet testnet.

After you finish, I recommend going through [starklings](https://github.com/onlydustxyz/starklings) which are a series of programming challenges where you have a Cairo contract that is missing some pieces in order to be compiled. You will learn how to work with different primitives of the language. There are a few intricacies that stem from being a STARK provable language where starklings will be a lot of help.

For finding references to the language and its standard library, there is no better place than the [Cairo documentation](https://www.cairo-lang.org/docs/). In order to play with the language you can also write contracts in the [Cairo Playground](https://www.cairo-lang.org/playground/). The experience of the playground is similar to the [Remix IDE](https://remix.ethereum.org/) used to write Solidity smart contracts, if you want to use Remix for testing Cairo smart contracts you can install the [Starknet Remix plugin](https://github.com/groksmith/starkware-remix-plugin) through the [Remix](https://remix.ethereum.org/) plugin manager (bottom left of the Remix IDE, above the gear logo).

In order to compile, test, deploy and interact with your Cairo contracts locally you can install a variety of tools like the [official cairo-lang Python library](https://starknet.io/docs/quickstart.html#quickstart), [the Nile framework](https://github.com/OpenZeppelin/nile/), the [Starknet Hardhat plugin](https://github.com/Shard-Labs/starknet-hardhat-plugin) and others. From what I've seen, most production codebases are using Nile which essentially wraps around the cairo-lang compiler and provides tooling for interacting with as well as managing Cairo contracts.

After you finish starknet-cairo-101 and starklings there are a few other tutorials and examples you can go through to get acustomed to reading and writing in Cairo. They are part of a series of starknet educational resources [starknet-edu](https://github.com/starknet-edu) sourced by the Starkware team. Next up is [starknet-erc721](https://github.com/starknet-edu/starknet-erc721) which teaches you how to deploy and customize an NFT on Starknet. Afterwards you can learn how to deploy and ERC20 contract with [starknet-erc20](https://github.com/starknet-edu/starknet-erc20). The ERC20 and ERC721 are good examples to learn Cairo syntax on as they are contracts you will interac with frequently. They are part of the the [OpenZeppelin Cairo contracts library](https://github.com/OpenZeppelin/cairo-contracts) which include things like token standards, reentrancy guard, access control, accounts and more.

Next up in the starknet-edu series we have the [StarkNet messaging bridge](https://github.com/starknet-edu/starknet-messaging-bridge) repo which will illustrate how to do L1<>L2 messaging bridges in order to build cross-layer applications (protocols like Aave and MakerDAO are already building for a multichain/multirollup future - check out [starknet-usd](https://github.com/orkunkilic/starknet-usd), [aave-starknet-bridge](https://github.com/aave-starknet-project/aave-starknet-bridge) and [starknet-dai-bridge](https://github.com/makerdao/starknet-dai-bridge)). And the last two challenges in the series are [StarkNet debug](https://github.com/starknet-edu/starknet-debug) and [starknet-accounts](https://github.com/starknet-edu/starknet-accounts).

You can also use the [Warp transpiler](https://github.com/NethermindEth/warp) to convert your code from Solidity to Cairo, although you still may need to tweak its output to work as intended in some cases.

After you've completed these tutorials the best way to keep learning is to try to build your own little pet project with Cairo. Something like a simple AMM contract, an NFT marketplace, or a Cairo version of the [lil-web3](https://github.com/m1guelpf/lil-web3/) repo created by [Miguel Piedrafita](https://twitter.com/m1guelpf). In this way you'll face issues that you will have to solve on your own, which is my experience one of the best ways to learn and solidify existing knowledge as you come to know what you don't understand. Another great way to improve is to look at production code from projects building on top of Starknet with Cairo. We mentioned the [OpenZeppelin Cairo](https://github.com/OpenZeppelin/cairo-contracts/) contracts, but there are many other projects. The only issue with reading production code is that its usually a project with a lot of files, folders and very little documentation so it might be hard to understand what the code is doing without it. That's why going over the OpenZeppelin contracts might be a better start as they are a library that is used quite often in the Starknet space.

## Cairo apps and tooling

Repos with Cairo code you can get inspired from:

- [Empiric Network (oracle provider)](https://github.com/42labs/Empiric/tree/master/contracts)
- [Astraly (IDO platform)](https://github.com/Astraly-Labs/astraly-contracts)
- [ZigZag (orderbook-based AMM)](https://github.com/ZigZagExchange/starknet-contracts)
- [Briq (composable NFTs)](https://github.com/briqNFT/briq-protocol)
- [starknet-multisig](https://github.com/eqlabs/starknet-multisig)

To see a list of most Cairo projects, libraries and tools take a look at:

- [Cairo goldmine (Cairo repo aggregator)](https://github.com/beautyisourbusiness/cairo-goldmine)
- [awesome-starknet](https://github.com/gakonst/awesome-starknet) by [gakonst](https://twitter.com/gakonst)
- [Starknet projects that I come across](https://github.com/stars/dcbuild3r/lists/starknet) ([dcbuilder](https://twitter.com/DCbuild3r))

If you want to interact with Starknet programmatically and build dapps, checkout:

- [starknet-js](https://github.com/0xs34n/starknet.js)
- [starknet-react](https://github.com/apibara/starknet-react)
- [starknet-rs](https://github.com/xJonathanLEI/starknet-rs)
- [caigo](https://github.com/dontpanicdao/caigo)

There are also additional resources which might be useful:

- [Encode Club StarkNet hackathon](https://twitter.com/anth0nybeaumont/status/1514429362807971853)
- [Solidity <> Cairo patterns:](https://github.com/behzatce/Solidity-vs-Cairo)

## STARKs

As you get deeper and deeper into the language you might also want to read the [Cairo whitepaper](https://www.cairo-lang.org/cairo-whitepaper/). Disclaimer: There is quite a bit of math involved, you do not need to understand most of it. Reading it as is still helps you understand how things work under the hood on a better level. Also if you are curious about the cryptography that goes under the hood of STARKs checkout [Starkware's STARK page](https://starkware.co/stark/).
