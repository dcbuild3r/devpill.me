---
title : "Decentralized file storage"
description: "How to store files in a decentralized way using networks like IPFS and Arweave"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 44
---

There are many applications that require storing files of all sorts and making them available for your decentralized applications, NFTS for example only have a link to the URI metadata on-chain, and that URI points to a decentralized storage endpoint on IPFS or Arweave. Meaning that all the images and the traits of the NFT are hosted in their file storage networks rather than on the Ethereum mainnet in order to save on costs and allow for higher bandwidth.

#### IPFS

[IPFS](https://ipfs.io/) is one of the most popular decentralized file storage solutions out there, there are projects like [Filecoin](https://filecoin.io/) being built on top and many NFT metadata are hosted inside of the network. There are solutions like [NFT Storage](https://nft.storage/docs/) that make the metadata hosting completely free to upload your NFT metadata on-chain by leveraging their Javascript API.

#### Arweave

[Arweave](https://www.arweave.org/) is another such solution. Arweave is a type of storage that backs data with sustainable and perpetual endowments, allowing users and developers to truly store data forever – for the very first time. As a collectively owned hard drive that never forgets, Arweave allows developers to remember and preserve valuable information, apps, and history indefinitely.

An increasingly popular use case of decentralized file storage solutions is web hosting, since we are on a quest to build decentralized applications that are uncensorable, it is good practice to also decentralize the user interface by deploying it on decentralized file storage networks like IPFS and Arweave. This prevents the applications you built from being censored by centralized entities shutting down your deployments on centralized platforms like Vercel, AWS, Azure, or any other. Part of good practices of modern applications is open-sourcing the front end of their applications so that anyone can run them locally and also deploying several other instances to decentralized file storage solutions as well as usually hosting their own front end in a centralized server for added performance.
