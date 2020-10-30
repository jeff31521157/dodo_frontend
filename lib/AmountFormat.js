import BigNumber from 'bignumber.js'

export default class AmountFormat {
  static toWei(amount) {
    return new BigNumber(amount).times(new BigNumber(10).pow(18)).toFixed()
  }

  static fromWei(amount) {
    return new BigNumber(amount).dividedBy(new BigNumber(10).pow(18))
  }

  static toUint256(amount, decimals) {
    return new BigNumber(amount)
      .times(new BigNumber(10).pow(decimals))
      .toFixed(0)
  }

  static fromUint256(amount, decimals) {
    return new BigNumber(amount).dividedBy(new BigNumber(10).pow(decimals))
  }

  static toDisplay(amount) {
    const amountToDisplay = new BigNumber(amount)
    if (amountToDisplay.lt(1)) {
      return amountToDisplay.toPrecision(4)
    } else {
      return amountToDisplay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
