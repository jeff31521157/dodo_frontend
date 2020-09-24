import honeycombAbi from '@/assets/abis/honeycomb.json'
import { contractAddress } from '@/assets/constants/honeycomb'
import BigNumber from 'bignumber.js'

export const getContract = (web3) => {
  const contract = new web3.eth.Contract(honeycombAbi, contractAddress)
  return contract
}

export const deposit = async ({ web3, pid, amount, userAddress }) => {
  const contract = getContract(web3)
  try {
    return await contract.methods
      .deposit(
        pid,
        new BigNumber(amount).times(new BigNumber(10).pow(18)).toFixed()
      )
      .send({ from: userAddress })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const withdraw = async ({ web3, pid, amount, userAddress }) => {
  const contract = getContract(web3)
  try {
    return await contract.methods
      .withdraw(
        pid,
        new BigNumber(amount).times(new BigNumber(10).pow(18)).toFixed()
      )
      .send({ from: userAddress })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getStakedBalance = async ({ web3, pid, userAddress }) => {
  const contract = getContract(web3)
  try {
    const { amount } = await contract.methods.userInfo(pid, userAddress).call()
    return new BigNumber(amount)
  } catch (e) {
    console.log(e)
    return new BigNumber(0)
  }
}

export const getEarnedHoney = async ({ web3, pid, userAddress }) => {
  const contract = getContract(web3)
  try {
    const { rewardDebt } = await contract.methods
      .userInfo(pid, userAddress)
      .call()
    return new BigNumber(rewardDebt)
  } catch (e) {
    console.log(e)
    return new BigNumber(0)
  }
}

export const getPendingHoney = async ({ web3, pid, userAddress }) => {
  const contract = getContract(web3)
  try {
    const amount = await contract.methods.pendingHoney(pid, userAddress).call()
    return new BigNumber(amount)
  } catch (e) {
    console.log(e)
    return new BigNumber(0)
  }
}
