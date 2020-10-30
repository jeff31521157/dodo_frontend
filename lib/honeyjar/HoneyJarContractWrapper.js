import honeyJarAbi from '@/lib/abis/honeyjar.json'
import Logger from '@/lib/Logger'
import AmountFormat from '@/lib/AmountFormat'

export default class HoneycombContractWrapper {
  constructor(web3, address, decimals) {
    this.web3 = web3
    this.decimals = decimals
    this.contract = this.web3.getContract(address, honeyJarAbi)
  }

  async deposit(params) {
    if (!this.web3.currentAccount) {
      return null
    }

    const { amount } = params
    try {
      return await this.contract.methods
        .deposit(AmountFormat.toUint256(amount, this.decimals))
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

    const { amount } = params
    try {
      return await this.contract.methods
        .withdraw(AmountFormat.toUint256(amount, this.decimals))
        .send({ from: this.web3.currentAccount })
    } catch (e) {
      Logger.error(e)
      return null
    }
  }

  async getHTokenRate() {
    if (!this.web3.currentAccount) {
      return 0
    }
    const amount = await this.contract.methods
      .getPricePerFullShare()
      .call({ from: this.web3.currentAccount })
    return amount / 1e18
  }
}
