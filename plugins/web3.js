import Web3 from 'web3'
import Logger from '@/lib/Logger'

class Web3Wrapper {
  isSupported
  currentAccount
  #web3
  #blockProducedListeners
  #blockProducedEventSubsciption
  #accountChangedListeners

  constructor() {
    if (Web3.givenProvider == null) {
      this.isSupported = false
      return
    }

    try {
      this.#web3 = new Web3(Web3.givenProvider)
    } catch (e) {
      this.isSupported = false
      Logger.error(e)
      return
    }

    this.isSupported = true
    this.currentAccount = null
    this.#blockProducedListeners = new Map()
    this.#accountChangedListeners = new Map()
    this.#blockProducedEventSubsciption = null

    setInterval(() => {
      this.checkCurrentAccount()
    }, 2000)
  }

  async getCurrentBlockHeight() {
    return await this._web3.eth.getBlockNumber()
  }

  addBlockProducedListener(listener) {
    if (this.#blockProducedListeners.size === 0) {
      this.#blockProducedEventSubsciption = this.#web3.eth
        .subscribe('newBlockHeaders')
        .on('connected', (subscriptionId) => {
          Logger.log('connected')
        })
        .on('data', (blockHeader) => {
          this.#blockProducedListeners.forEach((listener) => {
            listener(blockHeader)
          })
        })
        .on('error', (error) => {
          Logger.error(error)
        })
    }

    this.#blockProducedListeners.set(listener, listener)
  }

  removeBlockProducedListener(listener) {
    this.#blockProducedListeners.delete(listener)
    if (
      this.#blockProducedListeners.size === 0 &&
      this.#blockProducedEventSubsciption != null
    ) {
      this.#blockProducedEventSubsciption.unsubscribe()
      this.#blockProducedEventSubsciption = null
    }
  }

  async connect() {
    await this.#web3.eth.requestAccounts()
    await this.checkCurrentAccount()
    return this.currentAccount
  }

  async checkCurrentAccount() {
    const accounts = await this.#web3.eth.getAccounts()
    const account = accounts.length > 0 ? accounts[0] : null
    const changed = account !== this.currentAccount
    this.currentAccount = account
    if (changed && this.#accountChangedListeners.size > 0) {
      this.#accountChangedListeners.forEach((listener) => {
        listener(account)
      })
    }
  }

  addAccountChangedListener(listener) {
    this.#accountChangedListeners.set(listener, listener)
  }

  removeAccountChangedListener(listener) {
    this.#accountChangedListeners.delete(listener)
  }

  getContract(address, abi) {
    return new this.#web3.eth.Contract(abi, address)
  }
}

export default ({ app }, inject) => {
  inject('web3', new Web3Wrapper())
}
