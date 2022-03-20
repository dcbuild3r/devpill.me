---
title : "Digital signatures"
description: "How digital signatures are used in modern DLT systems"
lead: ""
date: 2022-03-09T08:47:36+00:00
lastmod: 2022-03-09T08:47:36+00:00
draft: false
images: []
weight: 105
---

We can create a new cryptographic primitive called a digital signature with asymmetric cryptography. For example, you want to prove that you have the corresponding private key to a public key (to authorize a transaction). A simple way to think about this is what if you encrypt information with your private key and allow anyone to use your public key to decrypt this information. The Elliptic Curve Digital Signature algorithm [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) is slightly more complex and requires you to have a vital source of randomness as one of the parameters. Nonetheless, this is how you authorize (send) a transaction from your wallet. You sign the transaction with your private key (revealing no information about the private key) to prove you have the authority to authorize your transaction. You can now see how anyone with your private key can authorize transactions on your behalf. *Not your keys, not your crypto*
