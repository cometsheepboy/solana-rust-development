## What is Web3?
Web3 is an evolution of the internet that allows people to transact directly with each other:
- Users own their accounts, represented by their wallet.
- Transfers of value can occur directly between users.
- Tokens - representing currencies, digital art, event tickets, real estate, or whatever else - are fully under the custody of the user.

## What is Solana?
Solana allows people to transact directly with each other instantly at almost no cost.
Compared to older platforms like Bitcoin and Ethereum, Solana is:
- Significantly faster - most transactions complete in a second or two.
- Massively cheaper - transaction fees (referred to as 'gas fees' in older networks) are typically $0.00025 (much less than one penny) regardless of the value of what's being transferred.
- Highly decentralized, having one of the highest Nakamoto coefficients (decentralization score) of any proof-of-stake network.

## KEY Concept(keypair, public key, secret key)
- A keypair is a matching pair of public key and secret key.
- The public key is used as an “address” that points to an account on the Solana network. A public key can be shared with anyone.
- The secret key is used to verify authority over the account. As the name suggests, you should always keep secret keys secret.
- [@solana/web3.js] provides helper functions for creating a brand new keypair, or for constructing a keypair using an existing secret key.