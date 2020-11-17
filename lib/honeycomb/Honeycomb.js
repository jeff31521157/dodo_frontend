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
const usdcTokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // mainnet

export default class Honeycomb {
  constructor(params) {
    const {
      tokenName,
      themeColor,
      icon,
      subicon,
      efficiency,
      tokenAddress,
      decimals,
      ver,
      batch,
      pid,
      web3,
      gtag,
      isLPToken,
      isHToken,
      uniswapUrl,
      honeyJarUrl,
      highlight,
    } = params
    this.tokenName = tokenName
    this.themeColor = themeColor || colors.brown.base
    this.icon = icon
    this.subicon = subicon
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
    this.gtag = gtag
    this.userApproved = false
    this.tokenBalance = 0
    this.stakedBalance = 0
    this.earnedHoney = 0
    this.pendingHoney = 0
    this.startBlock = 0
    this.endBlock = 0
    this.apy = 'N/A'
    this.apyValue = 0
    this.minedHoney = 0
    this.unlockingHoney = 0
    this.unlockedHoney = 0
    this.collectedHoney = 0
    this.nearestCollectableTime = 0

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

  async syncNearestCollectableTime() {
    const time = await this.honeycombWrapper.getNearestCollectableTime({
      pid: this.pid,
      batch: this.batch,
    })
    this.nearestCollectableTime = time
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
      await this.syncNearestCollectableTime()
    } else {
      await this.syncEarnedHoney()
      await this.syncPendingHoney()
    }
  }

  async getApproval() {
    this.report('approve')
    const tx = await this.tokenWrapper.approve(this.honeycombContractAddress)
    Logger.log(tx)
    if (tx) {
      this.report('approve/success')
    }
    await this.syncAll()
  }

  async deposit(amount) {
    this.report('stake', amount)
    const tx = await this.honeycombWrapper.deposit({
      pid: this.pid,
      batch: this.batch,
      amount,
    })
    Logger.log(tx)
    if (tx) {
      this.report('stake/success', amount)
    }
    await this.syncAll()
  }

  async withdraw(amount) {
    this.report('unstake', amount)
    const tx = await this.honeycombWrapper.withdraw({
      pid: this.pid,
      batch: this.batch,
      amount,
    })
    Logger.log(tx)
    if (tx) {
      this.report('unstake/success', amount)
    }
    await this.syncAll()
  }

  async unlock() {
    if (this.ver !== 3) {
      return
    }

    this.report('unlock')
    const tx = await this.honeycombWrapper.startCollecting({
      pid: this.pid,
      batch: this.batch,
    })
    Logger.log(tx)
    if (tx) {
      this.report('unlock/success')
    }
    await this.syncAll()
  }

  async instantUnlock() {
    if (this.ver !== 3) {
      return
    }

    this.report('instant-unlock')
    const tx = await this.honeycombWrapper.instantCollect({
      pid: this.pid,
      batch: this.batch,
    })
    Logger.log(tx)
    if (tx) {
      this.report('instant-unlock/success')
    }
    await this.syncAll()
  }

  async collect() {
    if (this.ver !== 3) {
      return
    }

    this.report('collect')
    const tx = await this.honeycombWrapper.collect({
      pid: this.pid,
      batch: this.batch,
    })
    Logger.log(tx)
    if (tx) {
      this.report('collect/success')
    }
    await this.syncAll()
  }

  report(action, value) {
    this.gtag('event', action, {
      event_category: 'honeycomb',
      event_label: `Stage: ${this.ver + this.batch} / Pool: ${this.pid} / ${
        this.tokenName
      }`,
      value,
    })
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

  async getTokenPrice(tokenAddress) {
    let tokenPairAddress
    let tokenWrapper
    let multiplier = 1

    switch (tokenAddress) {
      case '0x2f08119C6f07c006695E079AAFc638b8789FAf18':
      case '0x16B7F5439D5fa7135BdC6A8C594d1BfcFe284065':
        // yUSDT & hUSDT, use USDT:EtH pair
        tokenPairAddress = '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852'
        tokenWrapper = new ERC20ContractWrapper(
          this.web3,
          '0xdac17f958d2ee523a2206206994597c13d831ec7'
        )
        multiplier = 10 ** 12
        break
      case usdcTokenAddress:
      case '0x905cAE2FF898d99DCBbc7dB45c2736D01EAe1445':
        // hUSDC, use USDC:ETH pair
        tokenPairAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc'
        tokenWrapper = new ERC20ContractWrapper(this.web3, usdcTokenAddress)
        multiplier = 10 ** 12
        break
      case '0x37388980Ed4803d58c0C8893Eb9fD806eDE2e57e':
        // hDAI, use DAI:ETH pair
        tokenPairAddress = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11'
        tokenWrapper = new ERC20ContractWrapper(
          this.web3,
          '0x6b175474e89094c44da98b954eedeac495271d0f'
        )
        break
      case '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599':
        // WBTC
        tokenPairAddress = '0xbb2b8038a1640196fbe3e38816f3e67cba72d940'
        tokenWrapper = this.tokenWrapper
        multiplier = 10 ** 10
        break
      case '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2':
        // WETH
        return new BigNumber(1)
      case '0x1165F761a16C3d07270775b793d202075e5BE14d':
        // WMBL
        return new BigNumber(0.00000312)
      default:
        return new BigNumber(0)
    }

    const wethTokenWrapper = new ERC20ContractWrapper(
      this.web3,
      wethTokenAddress
    )
    const wethAmount = await wethTokenWrapper.balanceOf(tokenPairAddress)
    const tokenAmount = await tokenWrapper.balanceOf(tokenPairAddress)
    const price = new BigNumber(wethAmount)
      .div(new BigNumber(tokenAmount))
      .div(multiplier)
    return price
  }

  async calculateAPY() {
    try {
      const honeyPrice = await this.getHoneyPrice()
      const honeyPerBlock = await this.honeycombWrapper.getHoneyPerBlock(this)
      const profit = honeyPrice.times(honeyPerBlock).times(365 * 6400)

      let cost = 0
      const tokenHeldByHoneycomb = await this.honeycombWrapper.getTotalShares({
        pid: this.pid,
        batch: this.batch,
      })
      if (this.tokenAddress === '0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16') {
        // HONEY
        cost = tokenHeldByHoneycomb.times(honeyPrice)
      } else if (
        this.tokenAddress === '0xa8f7Ea0229dD1429a0fa8C62962216682921569E' ||
        this.tokenAddress === '0x648E5Fba721A949f0027E7111381489Ae832b216'
      ) {
        // COS-USDC
        // HONEY-USDC
        const usdcWrapper = new ERC20ContractWrapper(
          this.web3,
          usdcTokenAddress
        )
        const tokenSupply = await this.tokenWrapper.totalSupply()
        const usdcHeldByLpContract = await usdcWrapper.balanceOf(
          this.tokenAddress
        )
        const price = await this.getTokenPrice(usdcTokenAddress)
        cost = tokenHeldByHoneycomb
          .div(tokenSupply.div(10 ** this.decimals))
          .times(usdcHeldByLpContract.div(10 ** 6))
          .times(2)
          .times(price)
      } else if (this.isLPToken) {
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
      } else {
        const price = await this.getTokenPrice(this.tokenAddress)
        cost = tokenHeldByHoneycomb.times(price)
      }
      this.apyValue = profit.times(100).div(cost).toNumber()
      if (this.apyValue < 10000) {
        this.apy = this.apyValue.toFixed(2) + '%'
      } else {
        this.apy = '10000%+'
      }
    } catch (e) {
      Logger.error(e)
      this.apy = 'N/A'
      this.apyValue = 0
    }
    return this.apy
  }
}
