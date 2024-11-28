// creating and managing a new SPL Token using the Token Program:

// 1. Creating a new Token Mint
// 2. Creating Token Accounts
// 3. Minting
// 4. Transferring tokens from one holder to another

// Token Mint
const tokenMint = await createMint(
    connection,
    payer,
    mintAuthority,
    freezeAuthority,
    decimal,
);

// The createMint function returns the publicKey of the new token mint. This function requires the following arguments:

// - connection - the JSON-RPC connection to the cluster
// - payer - the public key of the payer for the transaction
// - mintAuthority - the account that is authorized to do the actual minting of tokens from the token mint.
// - freezeAuthority - an account authorized to freeze the tokens in a token account. If freezing is not a desired attribute, the parameter can be set to null
// - decimals - specifies the desired decimal precision of the token

// Under the hood, the createMint function is simply creating a transaction that contains two instructions:

// 1. Create a new account
// 2. Initialize a new mint

import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

async function buildCreateMintTransaction(
    connection: web3.Connection,
    payer: web3.PublicKey,
    decimals: number,
): Promise<web3.Transaction> {
    const lamports = await token.getMinimumBalanceForRentExemptMint(connection);
    const accountKeypair = web3.Keypair.generate();
    const programId = token.TOKEN_PROGRAM_ID;

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: accountKeypair.publicKey,
            space: token.MINT_SIZE,
            lamports,
            programId,
        }),
        token.createInitializeMintInstruction(
            accountKeypair.publicKey,
            decimals,
            payer,
            payer,
            programId,
        ),
    );

    return transaction;
}