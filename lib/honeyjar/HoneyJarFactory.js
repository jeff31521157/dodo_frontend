import HoneyJar from '@/lib/honeyjar/HoneyJar'

const metadata = {
  USDT: {
    tokenSymbol: 'USDT',
    tokenName: 'Tether USD',
    tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    hTokenSymbol: 'hUSDT',
    hTokenAddress: '0x16B7F5439D5fa7135BdC6A8C594d1BfcFe284065',
    icon: 'usdt.png',
    themeColor: '#004D40',
    strategyName: 'DForceUSDT',
    decimals: 6,
    honeycombStages: [3, 4, 5, 6, 7, 8, 9],
  },
  USDC: {
    tokenSymbol: 'USDC',
    tokenName: 'USD Coin',
    tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    hTokenSymbol: 'hUSDC',
    hTokenAddress: '0x905cAE2FF898d99DCBbc7dB45c2736D01EAe1445',
    icon: 'usdc.png',
    themeColor: '#0D47A1',
    strategyName: 'DForceUSDC',
    decimals: 6,
    honeycombStages: [3, 4, 5, 6, 7, 8, 9],
  },
  DAI: {
    tokenSymbol: 'DAI',
    tokenName: 'Dai Stablecoin',
    tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    hTokenSymbol: 'hDAI',
    hTokenAddress: '0x37388980Ed4803d58c0C8893Eb9fD806eDE2e57e',
    themeColor: '#FF6F00',
    icon: 'dai.png',
    strategyName: 'DAICurve',
    decimals: 18,
    honeycombStages: [3, 4, 5, 6, 7, 8, 9],
  },
}

export default class HoneyJarFactory {
  static isPathValid(path) {
    return metadata[path] !== undefined
  }

  static create(path, web3, axios) {
    if (!this.isPathValid(path)) {
      return null
    }

    return new HoneyJar({ ...metadata[path], web3, axios })
  }

  static all(web3, axios) {
    const s = {}
    for (const [key, value] of Object.entries(metadata)) {
      s[key] = new HoneyJar({ ...value, web3, axios })
      s[key].calculateAPY()
    }
    return s
  }
}
