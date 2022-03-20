---
title : "Asymmetric ciphers"
description: "What are assymetric ciphers and where are they used?"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 104
---

The ciphers used today that distributed ledgers rely on are asymmetric ciphers. Asymmetric ciphers address the key exchange problem presented above by using a different key to encrypt information than they do to decrypt information. These keys are known as the public and private key pair. The asymmetric cryptosystem is only possible because of a mathematical relationship between the public and private key pair. The first breakthrough with asymmetric cryptography was the Rivest Shamir Alderman [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) cipher named after its creators. The security of RSA relies on the fact that factoring large prime numbers is hard, more precisely [the Discrete Log Problem](https://en.wikipedia.org/wiki/Discrete_logarithm). These ciphers allow anyone to encrypt information intended for you with your public key, but only you can decrypt it with your private key.

While RSA was a breakthrough in cryptography, it was computationally not as fast as some of the leading symmetric ciphers at the time. Thus, RSA was used to securely share the symmetric key cipher, after which the symmetric cipher was used. RSA was the state of the art until a curve initially discovered about 2000 years ago by [Dophantus](https://en.wikipedia.org/wiki/Diophantus) was explored for a better approach.

There is an algebraic structure called a [finite field](https://en.wikipedia.org/wiki/Finite_field). In a finite field, the elements in the field obey slightly more abstract rules when compared to arithmetic operators on real numbers. You can define a finite field of rational points on a curve given that you can define multiplication and addition between these points, and the results under these definitions remain rational points on the curve. The class of curves that these fields have been defined over for asymmetric cryptography are called elliptic curves and fallow the general equation of y<sup>2</sup> = x<sup>3</sup> + ax + b where a and b are constants.

How does this relate to the discrete log problem? It turns out that the discrete log problem in the finite field of an elliptic curve is preserved and still very difficult. Thus we can construct similar primitives like those constructed in RSA over fields of elliptic curves. The advantage over RSA is that they are relatively fast, so more than 90% of all internet traffic year to date is encrypted with elliptic curves.

Detail on the parameters for curve p256 can be read about [here](https://csrc.nist.gov/csrc/media/events/workshop-on-elliptic-curve-cryptography-standards/documents/papers/session6-adalier-mehmet.pdf). If you are curious about how the addition and multiplication operators are defined in the finite fields over these curves, I recommend this [reading](https://hackernoon.com/what-is-the-math-behind-elliptic-curve-cryptography-f61b25253da3).
