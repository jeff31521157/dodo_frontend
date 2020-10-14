import honeycombAbi from '@/lib/abis/honeycomb.json'
import Logger from '@/lib/Logger'
import AmountFormat from '@/lib/AmountFormat'
import { AddressV1 } from '@/lib/honeycomb/Honeycomb'
import BigNumber from 'bignumber.js'

export default class HoneycombContractWrapper {
  constructor(web3) {
    this.web3 = web3
    this.contract = this.web3.getContract(AddressV1, honeycombAbi)
  }

  async deposit(params) {
    if (!this.web3.currentAccount) {
      return null
    }

    const { pid, amount } = params
    try {
      return await this.contract.methods
        .deposit(pid, AmountFormat.toWei(amount))
        .send({ from: this.web3.currentAccount })
    } catch (e) {
      Logger.error(e)
      return null
    }
  }

  async withdraw(params) {
    if (!this.web3.currentAccount) {
      return null
    }

    const { pid, amount } = params
    try {
      return await this.contract.methods
        .withdraw(pid, AmountFormat.toWei(amount))
        .send({ from: this.web3.currentAccount })
    } catch (e) {
      Logger.error(e)
      return null
    }
  }

  async getStakedAmount(params) {
    if (!this.web3.currentAccount) {
      return 0
    }

    const { pid } = params
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

  async getEarnedHoney(params) {
    if (!this.web3.currentAccount) {
      return 0
    }

    const { pid } = params
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

  async getPendingHoney(params) {
    if (!this.web3.currentAccount) {
      return 0
    }

    const { pid } = params
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

  async getStartBlock(params) {
    try {
      const amount = await this.contract.methods.startBlock().call()
      return parseInt(amount)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }

  async getEndBlock(params) {
    try {
      const amount = await this.contract.methods.endBlock().call()
      return parseInt(amount)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }

  async getHoneyPerBlock(params) {
    try {
      const amount = await this.contract.methods.honeyPerBlock().call()
      return new BigNumber(amount)
    } catch (e) {
      Logger.error(e)
      return new BigNumber(0)
    }
  }
}
