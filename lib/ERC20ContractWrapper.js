import erc20Abi from '@/lib/abis/erc20.json'
import BigNumber from 'bignumber.js'
import Logger from './Logger'
import AmountFormat from './AmountFormat'

const uint256Max =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935'

export default class ERC20ContractWrapper {
  constructor(web3, tokenAddress) {
    this.web3 = web3 // .getContract(address, erc20Abi)
    this.tokenAddress = tokenAddress
    this.contract = this.web3.getContract(this.tokenAddress, erc20Abi)
  }

  async getBalance() {
    if (!this.web3.currentAccount) {
      return 0
    }
    const amount = await this.contract.methods
      .balanceOf(this.web3.currentAccount)
      .call()
    return AmountFormat.fromWei(amount)
  }

  async balanceOf(address) {
    return new BigNumber(await this.contract.methods.balanceOf(address).call())
  }

  async totalSupply() {
    return new BigNumber(await this.contract.methods.totalSupply().call())
  }

  async getAllowance(contractAddress) {
    if (!this.web3.currentAccount) {
      return 0
    }
    const amount = await this.contract.methods
      .allowance(this.web3.currentAccount, contractAddress)
      .call()
    return AmountFormat.fromWei(amount)
  }

  async approve(contractAddress) {
    try {
      return await this.contract.methods
        .approve(contractAddress, uint256Max)
        .send({ from: this.web3.currentAccount })
    } catch (e) {
      Logger.error(e)
      return null
    }
  }
}
