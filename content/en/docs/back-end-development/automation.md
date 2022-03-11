---
title : "Automation"
description: "How to automate tasks in your smart contracts."
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 48
---

Within blockchain applications there are many actions that are repetitive and cumbersome to execute, for example, having to change the liquidity provision ranges inside of an active Uniswap v3 liquidity provision strategy, claiming rewards from yield vaults, and many other actions that users would like to automate so as to not have to deal with manual execution overhead.

#### Gelato network

[Gelato Network](https://www.gelato.network) is an automation protocol that runs as a decentralized network of bots used by web3 developers to automate smart contract executions on public EVM compatible blockchains including Ethereum, Polygon, Fantom, Arbitrum, Binance Smart Chain, and Avalanche.

In order to get started automating tasks inside of your application check out the [official Gelato documentation](https://docs.gelato.network/guides/tutorial) which has tutorials on how to set up bots to regularly execute any given task in exchange for a small transaction fee.
The setup inside of the contract function that you want bots to run would look something like this:

![gelato.png](https://github.com/dcbuild3r/blockchain-development-guide/blob/main/images/gelato.png?raw=true)
