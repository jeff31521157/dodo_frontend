import colors from 'vuetify/lib/util/colors'
import ERC20ContractWrapper from '@/lib/ERC20ContractWrapper'
import Logger from '@/lib/Logger'
import HoneycombContractWrapper from './HoneycombContractWrapper'

export const AddressV1 = '0xd4FA82d2Bd97D954e7c748Dbf533B71A1991E66F'
export const AddressV2 = '0xd4FA82d2Bd97D954e7c748Dbf533B71A1991E66F'

export default class Honeycomb {
  constructor(params) {
    const {
      name,
      themeColor,
      icon,
      tokenAddress,
      lpTokenAddress,
      isV1,
      batch,
      pid,
      web3,
    } = params
    this.name = name
    this.themeColor = themeColor || colors.brown.base
    this.icon = icon
    this.tokenAddress = tokenAddress
    this.lpTokenAddress = lpTokenAddress
    this.isV1 = isV1
    this.batch = batch
    this.pid = pid
    this.userApproved = false
    this.lpTokenBalance = 0
    this.stakedBalance = 0
    this.earnedHoney = 0
    this.pendingHoney = 0
    this.startBlock = 0
    this.endBlock = 0

    this.honeycombContractAddress = isV1 ? AddressV1 : AddressV2

    this.lpTokenWrapper = new ERC20ContractWrapper(web3, lpTokenAddress)
    this.honeycombWrapper = isV1
      ? new HoneycombContractWrapper(web3)
      : new HoneycombContractWrapper(web3) // TODO: V2
  }

  async syncBatchInfo() {
    this.startBlock = await this.honeycombWrapper.getStartBlock({
      batch: this.batch,
    })
    this.endBlock = await this.honeycombWrapper.getEndBlock({
      batch: this.batch,
    })
  }

  async syncUserApproved() {
    const allowance = await this.lpTokenWrapper.getAllowance(
      this.honeycombContractAddress
    )
    this.userApproved = allowance > 0
  }

  async syncLpTokenBalance() {
    const amount = await this.lpTokenWrapper.getBalance()
    this.lpTokenBalance = amount
  }

  async syncStakedAmmount() {
    const amount = await this.honeycombWrapper.getStakedAmount({
      pid: this.pid,
      batch: this.batch,
    })
    this.stakedBalance = amount
  }

  async syncEarnedHoney() {
    const amount = await this.honeycombWrapper.getEarnedHoney({
      pid: this.pid,
      batch: this.batch,
    })
    this.earnedHoney = amount
  }

  async syncPendingHoney() {
    const amount = await this.honeycombWrapper.getPendingHoney({
      pid: this.pid,
      batch: this.batch,
    })
    this.pendingHoney = amount
  }

  async syncAll() {
    await this.syncUserApproved()
    await this.syncLpTokenBalance()
    await this.syncStakedAmmount()
    await this.syncEarnedHoney()
    await this.syncPendingHoney()
  }

  async getApproval() {
    const tx = await this.lpTokenWrapper.approve(this.honeycombContractAddress)
    Logger.log(tx)
    await this.syncAll()
  }

  async deposit(amount) {
    const tx = await this.honeycombWrapper.deposit({
      pid: this.pid,
      batch: this.batch,
      amount,
    })
    Logger.log(tx)

    await this.syncAll()
  }

  async withdraw(amount) {
    const tx = await this.honeycombWrapper.withdraw({
      pid: this.pid,
      batch: this.batch,
      amount,
    })
    Logger.log(tx)

    await this.syncAll()
  }
}
