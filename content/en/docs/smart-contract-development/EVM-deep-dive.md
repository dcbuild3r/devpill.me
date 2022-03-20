---
title : "EVM deep dive"
description: "Learn about the inner workings of the EVM."
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 66
---

Understanding the ins and outs of the EVM is crucial for building highly optimized applications as each operation executed by the EVM has a gas cost attached to it and users have to pay the price for executing functions within the applications that they use. There is a compromise between readability and code optimizations however, which needs to be taken into consideration. Sometimes using techniques like bitshifting and bitmapping ([Hacker's Delight](https://github.com/lancetw/ebook-1/blob/master/02_algorithm/Hacker's%20Delight%202nd%20Edition.pdf) is a good book that talks about bit manipulation techniques in detail) can have a negative impact on readability and thus security, as other contributors and auditors may not be able to wrap their heads around these complex optimizations or it would simply take too much time for them to do so. For code that actually goes into production, each project needs to asses how much do they want to optimize their code for gas savings  over readability. Security usually comes first, however there are still a set of well-known good practices that will allow you to save some gas. If you end up using gas optimization techniques it is also advised to document them well with comments inside of your Solidity contracts. Another important point is that as these technologies scale and developers are less constrained by the virtual machine executing smart contract bytecode, the needs for optimizations becomes less important along with the fact that the compilers converting static code to machine code are getting better and better at optimizing code for performance and low costs. As technologies like L2s and data availability layers become mainstream we also may see an emergence of new VM architectures that experiment with new designs that do not require developers to work with low-level optimizations as they will be highly performant and scalable.

For a comprehensive EVM deepdive, I suggest these resources:

- [EVM development starter kit](https://freddycoen.medium.com/evm-starter-kit-1790bcc992ef)
- Read Chapter 13 (EVM) of [The Ethereum Book](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)
- Read Femboy Capital's [Playdate with the EVM](https://femboy.capital/evm-pt1)
- Go over OpenZeppelin's series on [Deconstructing smart contracts](https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/)
- Read [Analyzing smart contracts](https://costa.fdi.ucm.es/papers/costa/AlbertCGRR20bTR.pdf) by Elvira Albert (very math heavy)
- Read over [TakeNobu's slides on how the EVM works (visualized)](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)
- Go over [design patterns section](https://www.devpill.me/docs/smart-contract-development/design-patterns/)
- Go over the exemplary good codebases at the beginning of the [Solidity section](https://www.devpill.me/docs/smart-contract-development/solidity/)
- Follow gas optimizoors like [@transmission11](https://twitter.com/transmissions11) for gas alpha
- Get used to going to lookup gas costs for different OPCODE operations at [EVM Codes](https://www.evm.codes/)
- Check out the [EVM execution specs](https://github.com/ethereum/execution-specs)
- Learn to use [Foundry](https://www.devpill.me/docs/smart-contract-development/testing/) well
- Bonus resources in comments of [this Twitter thread](https://twitter.com/0x_doggie/status/1494025503446945799?s=20&t=jydW6zat0cCXAb3mUhPFWw)

Special thanks to [@0x_doggie](https://twitter.com/0x_doggie/) and [@freddycoen](https://twitter.com/freddycoen/) from whose threads I extrapolated these resources.

- [Thread 1](https://twitter.com/freddycoen/status/1485572733706682368)
- [Thread 2](https://twitter.com/0x_doggie/status/1496507944803848194)

You might wanna go through [Nick's Posts](https://ethereum.stackexchange.com/users/1254/nick-johnson) and [Jean's Solidity articles](https://jeancvllr.medium.com/solidity-tutorial-all-about-assembly-5acdfefde05c)
