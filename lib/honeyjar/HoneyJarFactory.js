import HoneyJar from '@/lib/honeyjar/HoneyJar'

const metadata = {
  USDT: {
    tokenSymbol: 'USDT',
    tokenName: 'Tether USD',
    tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    hTokenSymbol: 'hUSDT',
    hTokenAddress: '0x2f08119C6f07c006695E079AAFc638b8789FAf18', // TODO
    icon: 'usdt.png',
    themeColor: '#004D40',
    strategyName: 'DForceUSDT',
    decimals: 6,
    strategyAPY: 4.35,
    honeycombUrl: '/honeycomb/3-hUSDT',
  },
  USDC: {
    tokenSymbol: 'USDC',
    tokenName: 'USD Coin',
    tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    hTokenSymbol: 'hUSDC',
    hTokenAddress: '0x597ad1e0c13bfe8025993d9e79c69e1c0233522e', // TODO
    icon: 'usdc.png',
    themeColor: '#0D47A1',
    strategyName: 'DForceUSDC',
    decimals: 6,
    strategyAPY: 5.19,
    honeycombUrl: '/honeycomb/3-hUSDC',
  },
  DAI: {
    tokenSymbol: 'DAI',
    tokenName: 'Dai Stablecoin',
    tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    hTokenSymbol: 'hDAI',
    hTokenAddress: '0xacd43e627e64355f1861cec6d3a6688b31a6f952', // TODO
    themeColor: '#FF6F00',
    icon: 'dai.png',
    strategyName: 'DAICurve',
    decimals: 18,
    strategyAPY: 12.48,
    honeycombUrl: '/honeycomb/3-hDAI',
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
