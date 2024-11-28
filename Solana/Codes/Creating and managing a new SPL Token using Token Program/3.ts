// We can then use Metaplex to update our NFT:

const NFTImagePath = path.resolve(__dirname, "nft.png");

const buffer = await fs.readFile(NFTImagePath);
let file = createGenericFile(buffer, NFTImagePath, {
    contentType: "image/png",
});

// upload new image and get image uri
const [image] = await umi.uploader.upload([file]);
console.log("image uri:", image);

// upload updated offchain json using irys and get metadata uri
const uri = await umi.uploader.uploadJson({
    name: "Updated ",
    symbol: "UPDATED",
    description: "Updated Description",
    image,
});
console.log("NFT offchain metadata URI:", uri);

// Load the NFT using the mint address
const mint = UMIPublicKey("Zxd9TmtBHQNti6tJxtx1AKYJFykNUwJL4rth441CjRd");
const nft = await fetchMetadataFromSeeds(umi, { mint });

await updateV1(umi, {
    mint,
    authority: umi.identity,
    data: {
        ...nft,
        sellerFeeBasisPoints: 0,
        name: "Updated Asset",
    },
    primarySaleHappened: true,
    isMutable: true,
}).sendAndConfirm(umi);

let explorerLink = getExplorerLink("address", mint, "devnet");
console.log(`NFT updated with new metadata URI: ${explorerLink}`);

console.log("✅ Finished successfully!");