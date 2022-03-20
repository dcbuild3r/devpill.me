---
title : "Symmetric ciphers"
description: "What are symmetric ciphers and how do they work?"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 103
---

A cipher is symmetric when the same Key used to encrypt information is also used to decrypt information resulting in Key symmetry. A simple example of this is a XOR cipher. To encrypt with an XOR cipher you simply XOR the bits of the key with the bits of the plaintext. To decrypte the cipher text you XOR the same key with the plaintext. I have provided an XOR truth table bellow for convienence.

|  A | B | A XOR B |
| -- | - | ------ |
| 0  | 1 | 1 |
| 0  | 0 | 0 |
| 1  | 1 | 0 |
| 1  | 0 | 1 |

**NOTE** this cipher is if the same key is used more then once. See this [article](https://idafchev.github.io/crypto/2017/04/13/crypto_part1.html) for the details

Other examples of symmetric ciphers include the transposition ciphers like [Caesar's Cipher](https://en.wikipedia.org/wiki/Caesar_cipher), and permutation ciphers. Both are easily broken by [frequency analysis](https://en.wikipedia.org/wiki/Frequency_analysis). Most monoalphabetic Symmetric ciphers (one alphabet) are broken with frequency analysis.

There are existing Symmetric ciphers that have not been broken. A good example is the Advanced Encryption Standard or [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). However, the security of AES relies on having a sufficiently large key size.

Symmetric ciphers are appropriate until you need to send a key over a communication protocol securely. You and the receiving party must share a key to share private information over a secure communication channel. You can see this chicken or the egg problem forming. How do you securely share the Key?
