import { isMobile } from "react-device-detect";
import Web3 from "web3";
import { config } from "../../const";
import CLOVER_SEEDS_CONTROLLER from "../../const/abis/clover_seeds_controller_abi.json";
import CLOVER_SEEDS_NFT from "../../const/abis/clover_seeds_nft_abi.json";
import CLOVER_SEEDS_STAKE from "../../const/abis/clover_seeds_stake_abi.json";
import CLOVER_SEEDS_TOKEN from "../../const/abis/clover_seeds_token_abi.json";

let { web3 } = window
// Function to get Accounts
export const getCoinbase = async () => {
    //  Get Accounts
    const accounts = isMobile? await web3.eth.getAccounts() : await window.ethereum.request({ method: 'eth_requestAccounts' })
    //  Get Chain Id
    // const chainId = await web3.eth.chainId();
    //  Get Network Id
    // const networkId = await web3.eth.net.getId();
    return accounts.length > 0 ? accounts[0] : ""
}

// Function to get Contract
export const getContract = async (key) => {
    let ABI, address
    if (key === "CLOVER_SEEDS_TOKEN") {
        ABI = CLOVER_SEEDS_TOKEN.abi
        address = CLOVER_SEEDS_TOKEN.contractAddress
    } else if (key === "CLOVER_SEEDS_STAKE") {
        ABI = CLOVER_SEEDS_STAKE.abi
        address = CLOVER_SEEDS_STAKE.contractAddress
    } else if (key === "CLOVER_SEEDS_NFT") {
        ABI = CLOVER_SEEDS_NFT.abi
        address = CLOVER_SEEDS_NFT.contractAddress
    } else if (key === "CLOVER_SEEDS_CONTROLLER") {
        ABI = CLOVER_SEEDS_CONTROLLER.abi
        address = CLOVER_SEEDS_CONTROLLER.contractAddress
    }
    
    web3 = new Web3(window.ethereum)
    let contract = new web3.eth.Contract(ABI, address, {from: await getCoinbase()})
    return contract;
}

class CloverSeedsTokenContract {
    async transfer(to, amount) {
        let contract = await getContract("CLOVER_SEEDS_TOKEN")
        return (await contract?.methods.transfer(to, amount).send({
            from: await getCoinbase(),
            gasPrice: config.default_gasprice_gwei*1e9,
            gas: config.default_gas_amount,
        }))
    }
    async totalSupply() {
        let contract = await getContract("CLOVER_SEEDS_TOKEN")
        return (await contract?.methods.totalSupply().call())
    }
    async approve(spender, amount) {
        let contract = await getContract("CLOVER_SEEDS_TOKEN")
        return (await contract?.methods.approve(spender, amount).send({
            from: await getCoinbase(),
            gasPrice: config.default_gasprice_gwei*1e9,
            gas: config.default_gas_amount,
        }))
    }
    async balanceOf(address) {
        let contract = await getContract("CLOVER_SEEDS_TOKEN")
        return (await contract?.methods.balanceOf(address).call())
    }
}

class CloverSeedsStakeContract {
	constructor() {
		CLOVER_SEEDS_STAKE.callFunctions.forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract("CLOVER_SEEDS_STAKE")
				return (await contract?.methods[fn_name](...args).call())
			}
		});

		CLOVER_SEEDS_STAKE.transactionFunctions.forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract("CLOVER_SEEDS_STAKE")
				return (await contract?.methods[fn_name](...args).send({
                    from: await getCoinbase(),
                    gasPrice: config.default_gasprice_gwei*1e9,
                    gas: config.default_gas_amount,
                }))
			}
		});
	}


    async rewardRate() {
		let contract = await getContract("CLOVER_SEEDS_STAKE")
        return (await contract?.methods.rewardRate().call())
	}
}

class CloverSeedsNFTContract {
	constructor() {
		CLOVER_SEEDS_NFT.callFunctions.forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract("CLOVER_SEEDS_NFT")
				return (await contract?.methods[fn_name](...args).call())
			}
		});

		CLOVER_SEEDS_NFT.transactionFunctions.forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract("CLOVER_SEEDS_NFT")
				return (await contract?.methods[fn_name](...args).send({
                    from: await getCoinbase(),
                    gasPrice: config.default_gasprice_gwei*1e9,
                    gas: config.default_gas_amount,
                }))
			}
		});
	}
    async rewardRate() {
		let contract = await getContract("CLOVER_SEEDS_NFT")
        return (await contract?.methods.rewardRate().call())
	}
}

class CloverSeedsControllerContract {
	constructor() {
		CLOVER_SEEDS_CONTROLLER.callFunctions.forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract("CLOVER_SEEDS_CONTROLLER")
				return (await contract?.methods[fn_name](...args).call())
			}
		});

		CLOVER_SEEDS_CONTROLLER.transactionFunctions.forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract("CLOVER_SEEDS_CONTROLLER")
				return (await contract?.methods[fn_name](...args).send({
                    from: await getCoinbase(),
                    gasPrice: config.default_gasprice_gwei*1e9,
                    gas: config.default_gas_amount,
                }))
			}
		});
	}
    async buyYardUsingBNB(value) {
        let contract = await getContract("CLOVER_SEEDS_CONTROLLER")
        return (await contract?.methods.buyYardUsingBNB().send({
            from: await getCoinbase(),
            value: value,
            gasPrice: config.default_gasprice_gwei*1e9,
            gas: config.default_gas_amount,
        }))
    }
    async buyFieldUsingBNB(value) {
        let contract = await getContract("CLOVER_SEEDS_CONTROLLER")
        return (await contract?.methods.buyFieldUsingBNB().send({
            from: await getCoinbase(),
            value: value,
            gasPrice: config.default_gasprice_gwei*1e9,
            gas: config.default_gas_amount,
        }))
    }
    async rewardRate() {
		let contract = await getContract("CLOVER_SEEDS_NFT")
        return (await contract?.methods.rewardRate().call())
	}
}

window.seeds_token = new CloverSeedsTokenContract()
window.seeds_nft = new CloverSeedsNFTContract()
window.seeds_controller = new CloverSeedsControllerContract()
window.seeds_stake = new CloverSeedsStakeContract()