---
title : "General learning"
description: "What do you need to learn in order to learn core development"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 92
---

There are many topics to learn about in core-development, one can specialize in any area. Here is a selection of learning-resources:

#### Basic

- **Merkle trees**:
  - [Ethereum execution-layer Merkle Patricia Tree walkthrough](https://dzone.com/articles/ethereum-yellow-paper-walkthrough-27)
- [Execution and Consensus layer Merge design](https://www.youtube.com/watch?v=8N10a1EBhBc), video by Danny Ryan
- [Rollup centric roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698), post by Vitalik
- Ethereum protocol ELI5 (coming soon)

#### Medium:

- [Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): L1 protocol specification in paper form
- [ABI: Application Binary Interface](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html) to interact with contracts
- [EVM opcodes](https://www.evm.codes/): interactive reference
- [RLP](https://eth.wiki/fundamentals/rlp): the encoding used everywhere in execution-layer
- [SSZ specs](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md): encoding and merkleization of Eth2,
  also see [visualized encoding](https://github.com/protolambda/eth2-docs/blob/master/eth2-ssz.svg) 
  and [visualized hash-tree-root](https://github.com/protolambda/eth2-docs/blob/master/eth2-htr.svg).
- [EVM](https://ethereum.org/en/developers/docs/evm/): overview of the machine that runs smart-contracts
- Executable specs: readability-first python implementations of the protocol specification.
  - [Consensus-layer](https://github.com/ethereum/consensus-specs), also see [pip package](https://pypi.org/project/eth2spec/)
  - [Execution-layer](https://github.com/ethereum/execution-specs), also see the [rendered version](https://ethereum.github.io/execution-specs/).
- [Simplified Eth2 Phase0 specs intro](https://notes.ethereum.org/@djrtwo/Bkn3zpwxB)
- [Light client design](https://www.youtube.com/watch?v=ysW-Bq05pJQ) and [implementation](https://www.youtube.com/watch?v=bX8I9U2PYMk)

#### Advanced:

- **Builder proposer separation**:
  - [Proposer/block builder separation-friendly fee market designs](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
  - [Flashbots: frontrunning the MEV crisis](https://ethresear.ch/t/flashbots-frontrunning-the-mev-crisis/8251)
  - [state of research](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) and 
- [Fork-choice Gasper paper: Combining GHOST and Casper](https://arxiv.org/abs/2003.03052)
- [Dagger-Hashimoto (legacy PoW)](https://eth.wiki/concepts/dagger-hashimoto)
- **State DB design, Erigon docs**:
  - [Choice of storage engine](https://github.com/ledgerwatch/erigon/wiki/Choice-of-storage-engine)
  - [State representation](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md)
- BLS:
  - [Signature aggregation in eth2](https://ethresear.ch/t/pragmatic-signature-aggregation-with-bls/2105) by Justin Drake
  - [BLS12-381 For The Rest Of Us](https://hackmd.io/@benjaminion/bls12-381) by Ben Edgington
  - [BLS Signature for Busy People](https://gist.github.com/paulmillr/18b802ad219b1aee34d773d08ec26ca2) by Paul Miller
- KZG:
  - [KZG polynomial commitments](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) by Dankrad Feist
  - [ZK Study Club part 1: polynomial commitments](https://www.youtube.com/watch?v=bz16BURH_u8) by ZK FM podcast with Justin Drake
- ZK:
  - [ZK study club playlist](https://www.youtube.com/watch?v=Pnc9J7uQgqs&list=PLj80z0cJm8QHm_9BdZ1BqcGbgE-BEn-3Y) by ZK FM podcast
- Fraud proofs (optimistic rollup tech):
  - [The State of Optimistic Rollup](https://medium.com/molochdao/the-state-of-optimistic-rollup-8ade537a2d0f) older overview by Daniel Goldman
  - [Inside Arbitrum](https://developer.offchainlabs.com/docs/inside_arbitrum) arbitrum fraud proof
  - [Cannon](https://medium.com/ethereum-optimism/cannon-cannon-cannon-introducing-cannon-4ce0d9245a03) optimism fraud proof
- [LibP2P](https://docs.libp2p.io/): the network layer in Eth2, Polkadot, Filecoin and other blockchains.
- [DevP2P](https://github.com/ethereum/devp2p/): the original network layer in Eth1 / execution-layer of ethereum.
- [Whisk: A practical shuffle-based SSLE protocol for Ethereum](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763)
- [VDF research](https://vdfresearch.org/): verifiable delay function for ethereum and other protocols
- **Data Availability Sampling (DAS)**:
  - [DAS in practice](https://notes.ethereum.org/@vbuterin/r1v8VCULP)
  - [DAS in full sharding design](https://hackmd.io/@vbuterin/sharding_proposal)
