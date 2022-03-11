---
title : "Miscellaneous APIs"
description: "Different APIs you might use throughout your blockchain development journey"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 49
---

When building applications you will want to display miscellaneous information from various different other applications or protocols, e.g. price feeds for different tokens on different AMMs, the price of NFTs listed on different marketplaces, various data from services your application relies on, etc. As a backend developer, your responsibilities are to know where you can find reliable sources of data for your application and build the infrastructure needed to fetch it so that frontend developers can display it on the site. It is also important to build redundancy of the data you query and store it in your own databases in order to prevent your application from failing in the case of API dependency failure.

#### OpenSea

A good example of such an API is [OpenSea’s API](https://docs.opensea.io/reference/api-overview) which is public and can be queried in order to get the prices of NFT listings OpenSea, get floor prices, volumes, a bunch of other prices historical data, NFT metadata, and more.

As a developer, you can also create your own databases and API endpoints to fetch data from those databases. It is also a good way to earn revenue, by creating SaaS services around API keys with rate limits for how much data anyone can query off your servers. For building APIs you can for example use a REST API infrastructure with NodeJS and PostgreSQL, or for example, you can write a TheGraph subgraph.
