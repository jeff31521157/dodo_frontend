import Web3 from 'web3'

export default ({ app }, inject) => {
  inject('web3', new Web3(Web3.givenProvider || 'ws://localhost:8545'))
}
