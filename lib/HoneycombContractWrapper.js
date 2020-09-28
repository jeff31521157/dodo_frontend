import honeycombAbi from '@/lib/abis/honeycomb.json'
import Addresses from '@/lib/constants/Addresses'
import Logger from './Logger'
import AmountFormat from './AmountFormat'

export default class HoneycombContractWrapper {
  constructor(web3) {
    this.web3 = web3
    this.contract = this.web3.getContract(Addresses.honeycomb, honeycombAbi)
  }

  async deposit(pid, amount) {
    try {
      return await this.contract.methods
        .deposit(pid, AmountFormat.toWei(amount))
        .send({ from: this.web3.currentAccount })
    } catch (e) {
      Logger.error(e)
      return null
    }
  }

  async withdraw(pid, amount) {
    try {
      return await this.contract.methods
        .withdraw(pid, AmountFormat.toWei(amount))
        .send({ from: this.web3.currentAccount })
    } catch (e) {
      Logger.error(e)
      return null
    }
  }

  async getStakedAmount(pid) {
    try {
      const { amount } = await this.contract.methods
        .userInfo(pid, this.web3.currentAccount)
        .call()
      return AmountFormat.fromWei(amount)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }

  async getEarnedHoney(pid) {
    try {
      const { earned } = await this.contract.methods
        .userInfo(pid, this.web3.currentAccount)
        .call()
      return AmountFormat.fromWei(earned)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }

  async getPendingHoney(pid) {
    try {
      const amount = await this.contract.methods
        .pendingHoney(pid, this.web3.currentAccount)
        .call()
      return AmountFormat.fromWei(amount)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }

  async getStartBlock(pid) {
    try {
      const amount = await this.contract.methods.startBlock().call()
      return parseInt(amount)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }

  async getEndBlock(pid) {
    try {
      const amount = await this.contract.methods.endBlock().call()
      return parseInt(amount)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }

  async getHoneyPerBlock(pid) {
    try {
      const amount = await this.contract.methods.honeyPerBlock().call()
      return AmountFormat.fromWei(amount)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }
}
