import colors from 'vuetify/lib/util/colors'
import ERC20ContractWrapper from '@/lib/ERC20ContractWrapper'
import Logger from '@/lib/Logger'
import BigNumber from 'bignumber.js'
import HoneycombContractWrapper from './HoneycombContractWrapper'
import HoneycombV2ContractWrapper from './HoneycombV2ContractWrapper'
import HoneycombV3ContractWrapper from './HoneycombV3ContractWrapper'

export const AddressV1 = '0xd4FA82d2Bd97D954e7c748Dbf533B71A1991E66F' // mainnet
export const AddressV2 = '0xa0d395721F34C4F9EDFd0c192C6b676C1E4B8154' // mainnet
export const AddressV3 = '0xc959b17cB940d739E641E78f0F9A961550CC6ed0' // mainnet
const wethTokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // mainnet
const honeyTokenAddress = '0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16' // mainnet
const honeyEthLpTokenAddress = '0x7186141Bd5b90576019dE6988B295A2210565618' // mainnet

export default class Honeycomb {
  constructor(params) {
    const {
      tokenName,
      themeColor,
      icon,
      efficiency,
      tokenAddress,
      decimals,
      ver,
      batch,
      pid,
      web3,
      isLPToken,
      isHToken,
      uniswapUrl,
      honeyJarUrl,
      highlight,
    } = params
    this.tokenName = tokenName
    this.themeColor = themeColor || colors.brown.base
    this.icon = icon
    this.efficiency = efficiency
    this.tokenAddress = tokenAddress
    this.decimals = decimals || 18
    this.ver = ver
    this.batch = batch
    this.pid = pid
    this.isLPToken = isLPToken
    this.isHToken = isHToken
    this.uniswapUrl = uniswapUrl
    this.honeyJarUrl = honeyJarUrl
    this.highlight = highlight
    this.web3 = web3
    this.userApproved = false
    this.tokenBalance = 0
    this.stakedBalance = 0
    this.earnedHoney = 0
    this.pendingHoney = 0
    this.startBlock = 0
    this.endBlock = 0
    this.apy = 'N/A'
    this.minedHoney = 0
    this.unlockingHoney = 0
    this.unlockedHoney = 0
    this.collectedHoney = 0

    this.honeycombContractAddress =
      ver === 1 ? AddressV1 : ver === 2 ? AddressV2 : AddressV3

    this.tokenWrapper = new ERC20ContractWrapper(web3, tokenAddress)
    this.honeycombWrapper =
      ver === 1
        ? new HoneycombContractWrapper(web3)
        : ver === 2
        ? new HoneycombV2ContractWrapper(web3)
        : new HoneycombV3ContractWrapper(web3, this.decimals)
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
    const allowance = await this.tokenWrapper.getAllowance(
      this.honeycombContractAddress
    )
    this.userApproved = allowance > 0
  }

  async syncTokenBalance() {
    const amount = await this.tokenWrapper.getBalance()
    this.tokenBalance = amount
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

  async syncMinedHoney() {
    const amount = await this.honeycombWrapper.getMinedHoney({
      pid: this.pid,
      batch: this.batch,
    })
    this.minedHoney = amount
  }

  async syncCollectableHoney() {
    const amount = await this.honeycombWrapper.getCollectableHoney({
      pid: this.pid,
      batch: this.batch,
    })
    this.unlockedHoney = amount
  }

  async syncCollectingHoney() {
    const amount = await this.honeycombWrapper.getCollectingHoney({
      pid: this.pid,
      batch: this.batch,
    })
    this.unlockingHoney = amount
  }

  async syncCollectedHoney() {
    const amount = await this.honeycombWrapper.getCollectedHoney({
      pid: this.pid,
      batch: this.batch,
    })
    this.collectedHoney = amount
  }

  async syncAll() {
    await this.syncUserApproved()
    await this.syncTokenBalance()
    await this.syncStakedAmmount()
    if (this.ver === 3) {
      await this.syncMinedHoney()
      await this.syncCollectingHoney()
      await this.syncCollectableHoney()
      await this.syncCollectedHoney()
    } else {
      await this.syncEarnedHoney()
      await this.syncPendingHoney()
    }
  }

  async getApproval() {
    const tx = await this.tokenWrapper.approve(this.honeycombContractAddress)
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

  async unlock() {
    if (this.ver !== 3) {
      return
    }

    const tx = await this.honeycombWrapper.startCollecting({
      pid: this.pid,
      batch: this.batch,
    })
    Logger.log(tx)

    await this.syncAll()
  }

  async instantUnlock() {
    if (this.ver !== 3) {
      return
    }

    const tx = await this.honeycombWrapper.instantCollect({
      pid: this.pid,
      batch: this.batch,
    })
    Logger.log(tx)

    await this.syncAll()
  }

  async collect() {
    if (this.ver !== 3) {
      return
    }

    const tx = await this.honeycombWrapper.collect({
      pid: this.pid,
      batch: this.batch,
    })
    Logger.log(tx)

    await this.syncAll()
  }

  async getHoneyPrice() {
    const wethTokenWrapper = new ERC20ContractWrapper(
      this.web3,
      wethTokenAddress
    )
    const wethAmount = await wethTokenWrapper.balanceOf(honeyEthLpTokenAddress)
    const honeyTokenWrapper = new ERC20ContractWrapper(
      this.web3,
      honeyTokenAddress
    )
    const honeyAmount = await honeyTokenWrapper.balanceOf(
      honeyEthLpTokenAddress
    )
    return new BigNumber(wethAmount).div(new BigNumber(honeyAmount))
  }

  async getWBTCPrice() {
    const wethTokenWrapper = new ERC20ContractWrapper(
      this.web3,
      wethTokenAddress
    )
    const wbtcEthPairAddress = '0xbb2b8038a1640196fbe3e38816f3e67cba72d940'
    const wbtcTokenAddress = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
    const wethAmount = await wethTokenWrapper.balanceOf(wbtcEthPairAddress)
    const wbtcTokenWrapper = new ERC20ContractWrapper(
      this.web3,
      wbtcTokenAddress
    )
    const wbtcAmount = await wbtcTokenWrapper.balanceOf(wbtcEthPairAddress)
    return new BigNumber(wethAmount).div(new BigNumber(wbtcAmount))
  }

  async calculateAPY() {
    try {
      const honeyPrice = await this.getHoneyPrice()
      const honeyPerBlock = await this.honeycombWrapper.getHoneyPerBlock(this)
      const profit = honeyPrice.times(honeyPerBlock).times(365 * 6400)

      let cost = 0
      if (this.isLPToken) {
        const tokenHeldByHoneycomb = await this.tokenWrapper.balanceOf(
          this.honeycombContractAddress
        )
        const tokenSupply = await this.tokenWrapper.totalSupply()
        const wethTokenWrapper = new ERC20ContractWrapper(
          this.web3,
          wethTokenAddress
        )
        const wethHeldByLpContract = await wethTokenWrapper.balanceOf(
          this.tokenAddress
        )
        cost = tokenHeldByHoneycomb
          .div(tokenSupply)
          .times(wethHeldByLpContract)
          .times(2)
      } else if (this.isHToken) {
        // TODO
        this.apy = 'N/A'
        return this.apy
      } else {
        switch (this.tokenAddress) {
          case '0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16':
            // HONEY
            {
              const tokenHeldByHoneycomb = await this.tokenWrapper.balanceOf(
                this.honeycombContractAddress
              )
              // workaround
              cost = tokenHeldByHoneycomb
                .minus(new BigNumber(3230).times('1e18'))
                .times(honeyPrice)
              if (cost.eq < 0) {
                cost = 1
              }
            }
            break
          case '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2':
            // WETH
            cost = await this.tokenWrapper.balanceOf(
              this.honeycombContractAddress
            )
            break
          case '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': {
            // WBTC
            const tokenHeldByHoneycomb = await this.tokenWrapper.balanceOf(
              this.honeycombContractAddress
            )
            const price = await this.getWBTCPrice()
            cost = tokenHeldByHoneycomb.times(price)
          }
        }
      }
      this.apy = profit.times(100).div(cost).toFixed(2) + '%'
    } catch (e) {
      Logger.error(e)
      this.apy = 'N/A'
    }
    return this.apy
  }
}
