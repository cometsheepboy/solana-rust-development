const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: recipient,
    lamports: LAMPORTS_PER_SOL * amount,
});

transaction.add(sendSolInstruction);

/*
The SystemProgram.transfer() function requires:
- a public key corresponding to the sender's account
- a public key corresponding to the recipient's account
- the amount of SOL to send in lamports.
*/


const signature = sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
]);

/*
The sendAndConfirmTransaction() function takes the following parameters:
- a cluster connection
- a transaction
- an array of keypairs that will act as signers on the transaction - in this example, we only have one signer: the sender.
*/

// work on devnet
await airdropIfRequired(
    connection,
    keypair.publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL,
);

/*
This will deposit 1 SOL into your account which you can use for testing. This won't work on Mainnet where it would have value. But it's incredibly convenient for testing locally and on Devnet.
*/