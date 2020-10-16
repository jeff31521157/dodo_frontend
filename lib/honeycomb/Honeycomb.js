import colors from 'vuetify/lib/util/colors'
import ERC20ContractWrapper from '@/lib/ERC20ContractWrapper'
import Logger from '@/lib/Logger'
import BigNumber from 'bignumber.js'
import HoneycombContractWrapper from './HoneycombContractWrapper'
import HoneycombV2ContractWrapper from './HoneycombV2ContractWrapper'

export const AddressV1 = '0xd4FA82d2Bd97D954e7c748Dbf533B71A1991E66F' // mainnet
export const AddressV2 = '0xa0d395721F34C4F9EDFd0c192C6b676C1E4B8154' // mainnet
const wethTokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // mainnet
const honeyTokenAddress = '0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16' // mainnet
const honeyLpTokenAddress = '0x7186141Bd5b90576019dE6988B295A2210565618' // mainnet

export default class Honeycomb {
  constructor(params) {
    const {
      tokenName,
      lpTokenName,
      themeColor,
      icon,
      efficiency,
      tokenAddress,
      lpTokenAddress,
      isV1,
      batch,
      pid,
      web3,
    } = params
    this.tokenName = tokenName
    this.lpTokenName = lpTokenName
    this.themeColor = themeColor || colors.brown.base
    this.icon = icon
    this.efficiency = efficiency
    this.tokenAddress = tokenAddress
    this.lpTokenAddress = lpTokenAddress
    this.isV1 = isV1
    this.batch = batch
    this.pid = pid
    this.web3 = web3
    this.userApproved = false
    this.lpTokenBalance = 0
    this.stakedBalance = 0
    this.earnedHoney = 0
    this.pendingHoney = 0
    this.startBlock = 0
    this.endBlock = 0
    this.apy = 'N/A'

    this.honeycombContractAddress = isV1 ? AddressV1 : AddressV2

    this.lpTokenWrapper = new ERC20ContractWrapper(web3, lpTokenAddress)
    this.honeycombWrapper = isV1
      ? new HoneycombContractWrapper(web3)
      : new HoneycombV2ContractWrapper(web3)
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

  async getHoneyPrice() {
    const wethTokenWrapper = new ERC20ContractWrapper(
      this.web3,
      wethTokenAddress
    )
    const wethAmount = await wethTokenWrapper.balanceOf(honeyLpTokenAddress)
    const honeyTokenWrapper = new ERC20ContractWrapper(
      this.web3,
      honeyTokenAddress
    )
    const honeyAmount = await honeyTokenWrapper.balanceOf(honeyLpTokenAddress)
    return new BigNumber(wethAmount).div(new BigNumber(honeyAmount))
  }

  async calculateAPY() {
    try {
      const honeyPrice = await this.getHoneyPrice()
      const honeyPerBlock = await this.honeycombWrapper.getHoneyPerBlock(this)
      const profit = honeyPrice.times(honeyPerBlock).times(365 * 6400)

      const lpTokenHeldByHoneycomb = await this.lpTokenWrapper.balanceOf(
        this.honeycombContractAddress
      )
      const lpTokenSupply = await this.lpTokenWrapper.totalSupply()
      const wethTokenWrapper = new ERC20ContractWrapper(
        this.web3,
        wethTokenAddress
      )
      const wethHeldByLpContract = await wethTokenWrapper.balanceOf(
        this.lpTokenAddress
      )
      const cost = lpTokenHeldByHoneycomb
        .div(lpTokenSupply)
        .times(wethHeldByLpContract)
        .times(2)
      this.apy = profit.times(100).div(cost).toFixed(2) + '%'
    } catch (e) {
      Logger.error(e)
      this.apy = 'N/A'
    }
    return this.apy
  }
}
