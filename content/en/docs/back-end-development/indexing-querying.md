---
title : "Indexing / Querying"
description: "How to fetch meaningful information from a blockchain"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 45
---

The applications you will be building need to know what is the state of the blockchain so that your users know what is happening and can interact with the application effectively. An example of this is Uniswap's AMM. In order to call the swap function in the smart contracts, you need to know how many tokens you will get back with an X amount of ETH that you put into the contract. In order to display the current price of any asset, your application will either query data from the blockchain directly or it will use an indexing service that has that data already available. These APIs are very useful and are a critical part of any application.

#### TheGraph

A very popular service is [TheGraph](https://thegraph.com/en/). TheGraph is a decentralized indexing protocol that allows you to query networks like Ethereum, the protocol has an incentive layer that rewards indexers to create APIs for the data you specify. Developers can create so-called subgraphs, which are data APIs that make the data easily accessible through a GraphQL schema. GraphQL is a querying language that is used as an alternative to traditional REST APIs. GraphQL schemas are harder to set up initially, but in turn, they enjoy massive scalability. In order to learn more, check out [their documentation](https://thegraph.com/docs/en/). To learn how GraphQL works checkout the [official documentation](https://graphql.org/learn/), [HowToGraphQL](https://www.howtographql.com/) and [this YouTube playlist](https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f&ab_channel=TheNetNinja) (although it may be a bit outdated by now, better check the documentation).

#### Nodes

One of the most common ways to query data from the blockchain is by calling RPC endpoints of nodes that are syncing the full-state of the blockchain. A node runs the Ethereum blockchain, has all of its state, and syncs periodically every single time a new block appears. You can run your own node on consumer hardware, but it is unscalable if you want to use those nodes for querying data for massive applications as you'd need to build your own DevOps pipelines in order to scale to your needs accordingly. That's why most developers use a third-party node provider like [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/). You can call these APIs by using web3 libraries like [ethers.js](https://docs.ethers.io/v5/), [web3.js](https://web3js.readthedocs.io/en/v1.7.0/) or myriad others. If you have a React front end, I strongly recommend using [eth-hooks](https://github.com/scaffold-eth/eth-hooks/) (can be installed as an npm package), which is built by the scaffold-eth people.

#### Moralis

[Moralis](https://moralis.io/) is a web3 development platform that automates your backend, instead of having to query data from nodes, indexing the data, and creating databases so that you don't need to query the blockchain on every user request, Moralis does it for you. You instantiate a Moralis server that exposes an API to all blockchain data through a REST API to a PostgreSQL database. It also has smart contract alerts, cloud functions, cross-chain user authentication, and more. The only downside of using Moralis is that it's a centralized service provider. It is the easiest way to get a backend for your Dapp going as Moralis has a very simple to use SDK that helps you tap into the APIs offered by their services. It is a great way to get started building backends as most of the heavy lifting is done for you.

To learn how to use Moralis checkout [their documentation](https://docs.moralis.io/introduction/readme) and [their YouTube channel](https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw).
