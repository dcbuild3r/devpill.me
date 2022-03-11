---
title : "Introduction"
description: "What is smart contract development and how to get started?"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 60
---

Writing decentralized applications (Dapps) requires knowing how to write smart contracts as they are pieces of code that live on blockchains that can be executed inside of virtual machines. To write contracts you need to learn the programming languages that are able to compile to a target that the virtual machine can understand. In the case of the Ethereum blockchain, we have the EVM which has a set of operations it supports (a.k.a OPCODES). The most popular language for writing smart contracts on Ethereum is Solidity, which is a statically typed, object-oriented high-level programming language that takes inspiration from C++, Python, and JavaScript. With Solidity, you can program logic that executes inside of the EVM and the result of its operations is stored on the blockchain forever. The state of these applications is easily accessible from a full-node or from a third-party data indexing platform. The goal of smart contract developers is to create secure applications which perform a certain action, for example, a contract that allows for users to swap tokens, to buy and sell NFTs, to vote on proposals, etc.

There are many different stages in the smart contract development stage, from experimentation, iteration, testing, auditing, testnet deployment, and mainnet deployments. There are also different sets of best practices that developers and production teams adopt in order to mitigate the security and economic risk of their applications. Another important part of writing smart contracts on Ethereum or Ethereum L2s is optimizing the contracts to minimize the amount of gas they consume. Since block space on Ethereum and L2s is limited, there needs to be a fee mechanism in order to avoid state bloat that gives a fixed gas price to each operation executed by the respective VM. That means that the more complex a smart contract is, the more expensive it will be to deploy and for the users to use. There are various design patterns that optimize the code to consume the least amount of gas possible, whilst remaining readable and secure.
