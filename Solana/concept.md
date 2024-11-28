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

### Symmetric and Asymmetric Cryptography
- Symmetric Cryptography is where the same key is used to encrypt and decrypt
- Asymmetric Cryptography is also called 'public key cryptography' (if it's encrypted with a public key, only the secret key from the same keypair can be used to read it)

## SOL, Accounts, Addresses
- SOL is the name of Solana's native token. Each SOL is made from 1 billion Lamports.
- Accounts store tokens, NFTs, programs, and data.
- Addresses point to accounts on the Solana network. Anyone can read the data at a given address. Most addresses are also public keys.

## Lamports
- 1 SOL = 1,000,000,000 Lamports (1 billion Lamports)
- Lamports are analogous to "wei" in Ethereum or "satoshis" in Bitcoin, making them useful for handling microtransactions or precise calculations on the Solana network.

## Transactions on the Solana Network
All modifications to onchain data happen through transactions. Transactions are mostly a set of instructions that invoke Solana programs. Transactions are atomic, meaning they either succeed - if all the instructions have been executed properly - or fail as if the transaction hasn't been run at all.

### Transactions are atomic
A transaction on Solana is similar to a transaction elsewhere: it is atomic. **Atomic means the entire transaction runs or fails.**
Atomic means either the transaction happens - meaning all the individual steps succeed - or the entire transaction fails.

### Transactions contain instructions
The steps within a transaction on Solana are called instructions.
Each instruction contains:
- an array of accounts that will be read from and/or written to. This is what makes Solana fast - transactions that affect different accounts  are processed simultaneously
- the public key of the program to invoke
- data passed to the program being invoked, structured as a byte array

## About Wallets
- **Wallets** store your secret key and allow users to sign transactions
- **Hardware wallets** store your secret key on a separate device
- **Software wallets** use your computer for secure storage. On desktops, software wallets are often browser extensions that add the ability to connect to a wallet from a website. On mobile, wallet apps have their own browsers.
- **Solana's Wallet Adapter** allows you to build websites that can request a user's wallet address and propose transactions for them to sign

## Tokens on Solana
- You may recall SOL is the 'native token' of Solana. All other tokens, fungible and non-fungible tokens (NFTs), are called **SPL Tokens**. (SPL - Solana Program Library)
- The **Token Program** contains instructions for creating and interacting with SPL Tokens.
- **Token Mints** are accounts that define a specific token. This includes information about the token itself (like how many decimals it has), the account allowed to mint more tokens (called the mint authority), and where to find more information about the token like a description, image, etc. The mint authority can use the token mint to make more tokens!
- **Token Accounts** hold tokens of a specific Token Mint. For most users, their balances of each token mint are stored in **Associated Token Accounts** - accounts with addresses made from their wallet address and the token's mint.
- Creating Token Mints and Token Accounts requires allocating **rent** in SOL. The rent for a Token Account can be refunded when the account is closed. Additionally, tokens created with the **Token Extensions Program** can also close Token Mints.

### Token Burning and Delegation
- **Burning tokens** reduces the total supply of a token by removing them from circulation.
- **Approving a delegate**, allows another account to transfer or burn a specified amount of tokens from a token account while retaining original account ownership.
- **Revoking a delegate**, removes their authority to act on behalf of the token account owner.
- Each of these operations is facilitated through the spl-token library, utilizing specific functions for each action.

### Solana NFTs with Metaplex
- **Non-Fungible Tokens (NFTs)** are SPL Tokens with an associated metadata account, 0 decimals, and a maximum supply of 1
- **Metadata** attaches additional properties to token mints (both NFTs and regular tokens). For NFTs, metadata includes the token name and a link to an offchain JSON file. This JSON file contains links to artwork and other media files, any special traits the NFT has, and more.
- The **Metaplex Token Metadata** program is an onchain program that attaches metadata to a token mint. We can interact with the Token Metadata program using the Token Metadata package via Umi, a tool made by Metaplex for working with onchain programs.

#### The most popular way Solana NFTs have been created is by using the Metaplex Token Metadata program.
- When creating an NFT, the Token Metadata program creates an onchain metadata account using a Program Derived Address (PDA) with the token mint as a seed. This allows the metadata account for any NFT to be located deterministically using the address of the token mint. The onchain metadata contains a URI field that points to an offchain .json file.

- The offchain metadata in the JSON file stores the link to the media (images, videos, 3D files) of the NFT, any traits the NFT may have, and additional metadata. Permanent data storage systems such as Arweave are often used to store the offchain component of NFT metadata.

#### UMI Instance
Umi is a framework for making JS/TS clients for onchain programs, that was created by Metaplex. Umi can create JS/TS clients for many programs, but in practice, it's most commonly used to communicate to the Token Metadata program.
Note that Umi has different implementations for many concepts than web3.js, including Keypairs, PublicKeys, and Connections. However, it is easy to convert from web3.js versions of these items to the Umi equivalents.