---
title : "DID"
description: "Decentralized identity and user authentication."
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 47
---

DID (decentralized identity) and web3 user authentication are a disruptive new primitive on the internet as we can be self-sovereign users of the internet and own our own value within it for the first time in human history. Usually, your user profile is managed by centralized service providers like Google, Facebook, Apple, Amazon, and others. In web3, the concept of a digital identity is much broader as it can span many more different areas such as financial history, games, social interaction (decentralized social media, i.e. [Lens Protocol](https://github.com/aave/lens-protocol)), and much more. It is still not clear how web3 user management will look like a few years from now, but there are a few solutions that are being standardized and are emerging as potential winners.

#### SpruceID

[SpruceID](https://www.spruceid.com/) is a decentralized identity toolkit that allows users to sign and verify W3v verifiable credentials which are configurable across many interfaces. Use cases cited in the [SpruceID documentation](https://spruceid.dev/docs/) include: Authenticity for NFT creators, decentralized backup or recovery of decentralized identity, decentralized on-boarding for private DeFi pools, decentralized app-hosting, and many more potential use cases in the future. In order to integrate the Spruce DID solutions visit their developer portal.

#### Sign-in with Ethereum

[Sign-in with Ethereum](https://login.xyz) is an initiative that came off [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) which set off to standardize how Ethereum accounts interact and authenticate with off-chain services by signing a standard message format parameterized by scope, session details, and security mechanisms (e.g., a nonce). The goals of this specification are to provide a self-custodied alternative to centralized identity providers, improve interoperability across off-chain services for Ethereum-based authentication, and provide wallet vendors a consistent machine-readable message format to achieve improved user experiences and consent management.

Many application builders have already adopted this signature standard for building applications on Ethereum as it streamlines the process for everyone and makes it more seamless for users since they have easily readable signatures from [EIP-191](https://eips.ethereum.org/EIPS/eip-191). The aim of this EIP specification is to create a login standard similar to how web2 login with Google and Facebook became catalysts for adoption.
