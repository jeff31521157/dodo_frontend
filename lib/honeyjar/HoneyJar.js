import colors from 'vuetify/lib/util/colors'
import ERC20ContractWrapper from '@/lib/ERC20ContractWrapper'
import HoneyJarContractWrapper from '@/lib/honeyjar/HoneyJarContractWrapper'
import Logger from '@/lib/Logger'
import HoneycombFactory from '../honeycomb/HoneycombFactory'

export default class HoneyJar {
  constructor(params) {
    const {
      tokenSymbol,
      tokenName,
      hTokenSymbol,
      themeColor,
      icon,
      tokenAddress,
      hTokenAddress,
      decimals,
      strategyName,
      strategyAPY,
      honeycombKey,
      web3,
    } = params
    this.tokenSymbol = tokenSymbol
    this.tokenName = tokenName
    this.hTokenSymbol = hTokenSymbol
    this.themeColor = themeColor || colors.brown.base
    this.icon = icon
    this.tokenAddress = tokenAddress
    this.hTokenAddress = hTokenAddress
    this.decimals = decimals
    this.strategyName = strategyName
    this.strategyAPY = strategyAPY
    this.honeycombKey = honeycombKey
    this.honeycombUrl = `/honeycomb/${honeycombKey}`
    this.web3 = web3
    this.userApproved = false
    this.honeycombAPY = 0
    this.tokenBalance = 0
    this.hTokenBalance = 0
    this.hTokenRate = 0
    this.stakedHTokenBalance = 0

    this.tokenWrapper = new ERC20ContractWrapper(web3, tokenAddress)
    this.hTokenWrapper = new ERC20ContractWrapper(web3, hTokenAddress)
    this.honeyJarWrapper = new HoneyJarContractWrapper(
      web3,
      hTokenAddress,
      decimals
    )
    this.honeycomb = HoneycombFactory.create(this.honeycombKey, web3)
  }

  async calculateAPY() {
    await this.honeycomb.calculateAPY()
    this.honeycombAPY = this.honeycomb.apyValue
  }

  async syncAll() {
    await this.syncUserApproved()
    await this.syncTokenBalance()
    await this.syncHTokenBalance()
    await this.syncHTokenRate()
    await this.honeycomb.syncAll()
    this.stakedHTokenBalance = this.honeycomb.stakedBalance
  }

  async syncUserApproved() {
    const allowance = await this.tokenWrapper.getAllowance(this.hTokenAddress)
    this.userApproved = allowance > 0
  }

  async syncTokenBalance() {
    const amount = await this.tokenWrapper.getBalance()
    this.tokenBalance = amount
  }

  async syncHTokenBalance() {
    const amount = await this.hTokenWrapper.getBalance()
    this.hTokenBalance = amount
  }

  async syncHTokenRate() {
    this.hTokenRate = await this.honeyJarWrapper.getHTokenRate()
  }

  async deposit(amount) {
    const tx = await this.honeyJarWrapper.deposit({
      amount,
    })
    Logger.log(tx)

    await this.syncAll()
  }

  async withdraw(amount) {
    const tx = await this.honeyJarWrapper.withdraw({
      amount,
    })
    Logger.log(tx)

    await this.syncAll()
  }

  async getApproval() {
    const tx = await this.tokenWrapper.approve(this.hTokenAddress)
    Logger.log(tx)
    await this.syncAll()
  }
}
