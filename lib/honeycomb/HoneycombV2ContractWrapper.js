import honeycombV2Abi from '@/lib/abis/honeycombV2.json'
import Logger from '@/lib/Logger'
import AmountFormat from '@/lib/AmountFormat'
import { AddressV2 } from '@/lib/honeycomb/Honeycomb'
import BigNumber from 'bignumber.js'

export default class HoneycombContractWrapper {
  constructor(web3) {
    this.web3 = web3
    this.contract = this.web3.getContract(AddressV2, honeycombV2Abi)
  }

  async deposit(params) {
    if (!this.web3.currentAccount) {
      return null
    }

    const { batch, pid, amount } = params
    try {
      return await this.contract.methods
        .deposit(batch, pid, AmountFormat.toWei(amount))
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

    const { batch, pid, amount } = params
    try {
      return await this.contract.methods
        .withdraw(batch, pid, AmountFormat.toWei(amount))
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

    const { batch, pid } = params
    try {
      const { amount } = await this.contract.methods
        .userInfo(batch, pid, this.web3.currentAccount)
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

    const { batch, pid } = params
    try {
      const { earned } = await this.contract.methods
        .userInfo(batch, pid, this.web3.currentAccount)
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

    const { batch, pid } = params
    try {
      const amount = await this.contract.methods
        .pendingHoney(batch, pid, this.web3.currentAccount)
        .call()
      return AmountFormat.fromWei(amount)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }

  async getStartBlock(params) {
    const { batch } = params
    try {
      const { startBlock } = await this.contract.methods.batchInfo(batch).call()
      return parseInt(startBlock)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }

  async getEndBlock(params) {
    const { batch } = params
    try {
      const { endBlock } = await this.contract.methods.batchInfo(batch).call()
      return parseInt(endBlock)
    } catch (e) {
      Logger.error(e)
      return 0
    }
  }

  async getHoneyPerBlock(params) {
    const { batch, pid } = params
    try {
      const {
        honeyPerBlock,
        totalAllocPoint,
      } = await this.contract.methods.batchInfo(batch).call()
      const { allocPoint } = await this.contract.methods
        .poolInfo(batch, pid)
        .call()
      return new BigNumber(honeyPerBlock).times(allocPoint).div(totalAllocPoint)
    } catch (e) {
      Logger.error(e)
      return new BigNumber(0)
    }
  }
}