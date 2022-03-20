---
title : "Smart contracts"
description: "What are smart contracts and how to write your first one."
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: [remix.png]
weight: 24
---

A smart contract is a program that runs on the Ethereum blockchain. It's a piece of code that has functions and data (state) which resides at a specific address on the Ethereum blockchain.

Smart contracts are a type of [Ethereum account](https://ethereum.org/en/developers/docs/accounts/) meaning that they have a balance and can send transactions over the network. They are deployed on the network and run as programmed, user accounts (externally-owned accounts, or EOAs) can interact with a smart contract by submitting transactions that interact with functions that are publicly accessible. Smart contracts can be used to define rules which are enforced via code, e.g. a smart contract that allows for two parties to swap their tokens (like Uniswap).

#### How do I create a smart contract?

The most popular smart contract programming language which targets the Ethereum virtual machine is [Solidity](https://docs.soliditylang.org/). It is a high-level language that was influenced by C++, Python, and Javascript and so its syntax looks familiar. Solidity is statically typed, supports inheritance, libraries, user-defined types, and more. Solidity is a compiled language, which means that before having a runnable smart contract, a Solidity program needs to be run through a compiler that generates a low-level interpretation which is called bytecode. Bytecode are instructions that the EVM can understand and execute.

There are other languages that can be used to target the EVM like [Vyper](https://vyper.readthedocs.io/en/stable/toctree.html) and [Fe](https://fe-lang.org/) that have their pros and cons, however, they don't have as robust development ecosystems and aren't as widely used by projects deployed in production.

Here's how a [simple counter program](https://solidity-by-example.org/first-app/) would look like in Solidity:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Counter {
    uint public count;

    // Function to get the current count
    function get() public view returns (uint) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        count -= 1;
    }
}
```

In the beginning, you declare the version of Solidity you are using the `pragma solidity + version` keyword. To indicate the creation of a contract you write it using the `contract ContractName {}` form. Within the contract curly brackets, the logic of the program is declared. We then declare a simple variable with the name `count` with unsigned integer type (meaning it can only hold positive integers). Afterward, we declare three different functions, one to retrieve the value held inside of the `count` variable, one to increase the variable's value by one, and the last one to decrement its value. The `public` keyword specifies that the function can be called by any address on the blockchain (be it a smart contract or a user-owned account). The `view` modifier specifies that the function doesn't alter the state within the contract (it only reads values already available). The `returns` keyword is used to specify the type of the object that is returned back by the function, unsigned integer type in the case of the `get()` function. Everything which is written after a `//` is considered a comment and is ignored by the Solidity compiler. Comments are used to make the code more readable and manageable, which is especially helpful if you are working with teams or revisit a codebase after some time. It also acts as documentation for what the code it is doing.

#### How do I compile and deploy my first contract?

In order to compile and deploy our first smart contract, we will use the Remix IDE which is a website where we can write smart contracts, compile them and deploy them on a local instance of the EVM. We can also interact with the local deployed smart contract to test out its functionality. To deploy our simple counter contract, go to [Remix](https://remix.ethereum.org/), add a new file in the contracts directory, name it `Counter.sol`, and copy-paste the code in the [counter example](https://solidity-by-example.org/first-app/). Now click on the second icon from the top in the selection bar on the left, it is the logo of the Solidity programming language and it symbolizes the Solidity compiler in Remix. In the compiler dropdown select 0.8.10 which is the Solidity version in our smart contract and click "Compile Counter.sol". After you have compiled your contract click on the third icon from the top, it should have the "Deploy & Run Transactions" name. Click "Deploy". After you have deployed, you should see a list item with "> COUNTER AT 0x.... (MEMORY). You've successfully compiled and deployed your first smart contract! Now that you have it deployed, you can interact with it by calling the `inc()` or `dec()` functions to increase or decrease the value of the `count` variable. You can call the `get()` function to retrieve the value of the `count` variable.

![Remix IDE](https://raw.githubusercontent.com/dcbuild3r/blockchain-development-guide/main/images/remix.png)

We will go into a lot more depth on how smart contracts are programmed, tested, and deployed in the [smart contract development section](https://www.devpill.me/docs/smart-contract-development/introduction/).
