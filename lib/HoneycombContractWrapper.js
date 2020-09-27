import honeycombAbi from '@/lib/abis/honeycomb.json'
import Addresses from '@/lib/constants/Addresses'
import BigNumber from 'bignumber.js'
import Logger from './Logger'

export default class HoneycombContractWrapper {
  constructor(web3) {
    this.web3 = web3
    this.contract = this.web3.getContract(Addresses.honeycomb, honeycombAbi)
  }

  async deposit(pid, amount) {
    try {
      return await this.contract.methods
        .deposit(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toFixed()
        )
        .send({ from: this.web3.currentAccount })
    } catch (e) {
      Logger.error(e)
      return null
    }
  }

  async withdraw(pid, amount) {
    try {
      return await this.contract.methods
        .withdraw(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toFixed()
        )
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
      return new BigNumber(amount)
    } catch (e) {
      Logger.error(e)
      return new BigNumber(0)
    }
  }

  async getEarnedHoney(pid) {
    try {
      const { earned } = await this.contract.methods
        .userInfo(pid, this.web3.currentAccount)
        .call()
      return new BigNumber(earned)
    } catch (e) {
      Logger.error(e)
      return new BigNumber(0)
    }
  }

  async getPendingHoney(pid) {
    try {
      const amount = await this.contract.methods
        .pendingHoney(pid, this.web3.currentAccount)
        .call()
      return new BigNumber(amount)
    } catch (e) {
      Logger.error(e)
      return new BigNumber(0)
    }
  }
}
