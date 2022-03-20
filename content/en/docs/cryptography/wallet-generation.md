---
title : "Wallet generation in Ethereum"
description: "How wallet generation works in Ethereum"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 106
---

To generate a wallet address in Ethereum, you first randomly generate a 256 bit private Key with a verifiably random function (VRF). Then you use elliptic curve cryptography to generate the corresponding 256-bit public Key. Finally, you hash the 256 bit public Key with [keccak256](https://keccak.team/keccak.html) to a 160-bit address. With a 256-bit key, the odds of someone generating a private key already in use (a collision) is 2<sup>-256</sup> and computationally unfeasible.
