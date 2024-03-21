const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

async function main() {
    const [owner] = await ethers.getSigners();
    console.log("signer preso")
    const governor = await ethers.getContractAt(
        "MyGovernor",
        "0x68e3B10B287450aAE7F78FF2F377b367eEcAd1Fc"
      );
      const token = await ethers.getContractAt(
        "MyToken",
        "0x8b478F7D7A29C42EB9f45889852d8694e08Aae76"
      );
      console.log("contract presi")
    //2. Delegation
    await token.delegate(owner.address);
    console.log("2. ok")

    //3. Proposing
    const tx = await governor.propose(
        [token.address],
        [0],
        [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
        "Give the owner more tokens!"
      );
      const receipt = await tx.wait();
      const event = receipt.events.find(x => x.event === 'ProposalCreated');
      const { proposalId } = event.args;
    
      console.log("3. ok")

    //4. Vote on the Proposal
    const tx2 = await governor.castVote(proposalId, 1);  
    await tx2.wait();

    console.log("4. ok")

    //5. Execute the Vote
    await governor.execute(
        [token.address],
        [0],
        [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
        keccak256(toUtf8Bytes("Give the owner more tokens!"))
      );
      console.log("5. ok")
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  