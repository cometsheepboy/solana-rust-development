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

### keypairs operation
- keypair generator
import { Keypair } from "@solana/web3.js";
const keypair = Keypair.generate();
console.log(`✅ Generated keypair!`);

- loading an existing keypair from .env file
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
const keypair = getKeypairFromEnvironment("SECRET_KEY");
console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`,
);

## SOL, Accounts, Addresses
- SOL is the name of Solana's native token. Each SOL is made from 1 billion Lamports.
- Accounts store tokens, NFTs, programs, and data.
- Addresses point to accounts on the Solana network. Anyone can read the data at a given address. Most addresses are also public keys.

## Lamports
- 1 SOL = 1,000,000,000 Lamports (1 billion Lamports)
- Lamports are analogous to "wei" in Ethereum or "satoshis" in Bitcoin, making them useful for handling microtransactions or precise calculations on the Solana network.

### Example Code - The balance for the wallet at address ${publicKey} is ${balanceInSOL}
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const publicKey = new PublicKey(suppliedPublicKey);
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
);
