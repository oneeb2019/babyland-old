const hre = require("hardhat")
require("@nomiclabs/hardhat-web3")
const fs = require("fs-extra")

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

async function main() {
	// fs.removeSync("cache")
	// fs.removeSync("artifacts")
	// await hre.run("compile")

	// // We get the contract to deploy
	// const NFTContract = await hre.ethers.getContractFactory("RarePanthers")
	// console.log("Deploying RarePanthers Contract...")

	// let network = process.env.NETWORK ? process.env.NETWORK : "rinkeby"

	// console.log(">-> Network is set to " + network)

	// // ethers is avaialble in the global scope
	// const [deployer] = await ethers.getSigners()
	// const deployerAddress = await deployer.getAddress()
	// const account = await web3.utils.toChecksumAddress(deployerAddress)
	// const balance = await web3.eth.getBalance(account)

	// console.log(
	// 	"Deployer Account " + deployerAddress + " has balance: " + web3.utils.fromWei(balance, "ether"),
	// 	"ETH"
	// )

	// const deployed = await NFTContract.deploy()

	// let dep = await deployed.deployed()

	// console.log("Contract deployed to:", dep.address)

	// await sleep(53000)
	await hre.run("verify:verify", {
		address: "0x140B78BdA04105578Ed1386E027c958ecA41E029",
		constructorArguments: [],
	})
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
