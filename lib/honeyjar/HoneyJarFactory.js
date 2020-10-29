import HoneyJar from '@/lib/honeyjar/HoneyJar'

const metadata = {
  USDT: {
    tokenSymbol: 'USDT',
    tokenName: 'Tether USD',
    tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    hTokenSymbol: 'hUSDT',
    hTokenAddress: '0x2f08119C6f07c006695E079AAFc638b8789FAf18', // TODO
    icon: 'usdt.png',
    strategyName: 'DForceUSDT',
    decimals: 6,
  },
  USDC: {
    tokenSymbol: 'USDC',
    tokenName: 'USD Coin',
    tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    hTokenSymbol: 'hUSDC',
    hTokenAddress: '', // TODO
    icon: 'usdc.png',
    strategyName: 'DForceUSDC',
    decimals: 6,
  },
  DAI: {
    tokenSymbol: 'DAI',
    tokenName: 'Dai Stablecoin',
    tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    hTokenSymbol: 'hDAI',
    hTokenAddress: '',
    icon: 'dai.png',
    strategyName: 'DAICurve',
    decimals: 18,
  },
}

export default class HoneyJarFactory {
  static isPathValid(path) {
    return metadata[path] !== undefined
  }

  static create(path, web3) {
    if (!this.isPathValid(path)) {
      return null
    }

    return new HoneyJar({ ...metadata[path], web3 })
  }

  static all(web3) {
    const s = {}
    for (const [key, value] of Object.entries(metadata)) {
      s[key] = new HoneyJar({ ...value, web3 })
    }
    return s
  }
}
