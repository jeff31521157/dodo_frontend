import BigNumber from 'bignumber.js'

export const formatBalance = (balance, decimals = 18, comma = true) => {
  const balanceBN = new BigNumber(balance)
  const displayBalance = balanceBN.dividedBy(new BigNumber(10).pow(decimals))
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4)
  } else {
    return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
