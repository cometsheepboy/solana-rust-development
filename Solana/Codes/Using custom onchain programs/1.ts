// we used the SystemProgram.transfer() function from @solana/web3.js, which creates an instruction for the System program to transfer SOL.

// When working with other programs, however, you'll need to create instructions manually. With @solana/web3.js, you can create instructions with the TransactionInstruction constructor:

const instruction = new TransactionInstruction({
    programId: PublicKey;
    keys: [
        {
            pubkey: Pubkey,
            isSigner: boolean,
            isWritable: boolean,
        },
    ],
    data?: Buffer;
});

// TransactionInstruction() takes 3 fields:

// The programId field is fairly self - explanatory: it's the public key (also called the 'address' or 'program ID') of the program.

// keys is an array of accounts and how they will be used during the transaction.You need to know the behavior of the program you are calling and ensure that you provide all of the necessary accounts in the array.

// - pubkey - the public key of the account
// - isSigner - a boolean representing whether or not the account is a signer on the transaction
// - isWritable - a boolean representing whether or not the account is written to during the transaction's execution
// an optional Buffer containing data to pass to the program.We'll be ignoring the data field for now, but we will revisit it in a future lesson.


// After making our instruction, we add it to a transaction, send the transaction to our RPC to be processed and confirmed, then look at the transaction signature.
const transaction = new web3.Transaction().add(instruction);

const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer],
);

console.log(`✅ Success! Transaction signature is: ${signature}`);


// We'll start by using the same packages and .env file we made earlier in Intro to Writing Data.

// Name the file send-ping-transaction.ts:

import * as web3 from "@solana/web3.js";
import "dotenv/config";
import {
    getKeypairFromEnvironment,
    airdropIfRequired,
} from "@solana-developers/helpers";

const payer = getKeypairFromEnvironment("SECRET_KEY");
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const newBalance = await airdropIfRequired(
    connection,
    payer.publicKey,
    1 * web3.LAMPORTS_PER_SOL,
    0.5 * web3.LAMPORTS_PER_SOL,
);


// Now let's talk to the Ping program! To do this, we need to:

// create a transaction
// create an instruction
// add the instruction to the transaction
// send the transaction
// Remember, the most challenging piece here is including the right information in the instructions. We know the address of the program that we are calling. We also know that the program writes data to a separate account whose address we also have. Let's add the string versions of both of those as constants at the top of the file:

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS =
    "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

// Now let's create a new transaction, then initialize a PublicKey for the program account, and another for the data account.

const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

// Next, let's create the instruction. Remember, the instruction needs to include the public key for the Ping program and it also needs to include an array with all the accounts that will be read from or written to. In this example program, only the data account referenced above is needed.

const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new web3.TransactionInstruction({
    keys: [
        {
            pubkey: pingProgramDataId,
            isSigner: false,
            isWritable: true,
        },
    ],
    programId,
});

// Next, let's add this instruction to the transaction we created. Then, call sendAndConfirmTransaction() by passing in the connection, transaction, and payer. Finally, let's log the result of that function call so we can look it up on Solana Explorer.

transaction.add(instruction);

const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer],
);

console.log(`✅ Transaction completed! Signature is ${signature}`);