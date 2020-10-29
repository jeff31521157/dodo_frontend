import Honeycomb from '@/lib/honeycomb/Honeycomb'

const metadata = {
  'COS-ETH': {
    tokenName: 'COS-ETH UNI-V2 LP',
    themeColor: '#2196f3',
    efficiency: 1,
    icon: 'cos.png',
    tokenAddress: '0x7C0Df3b6B8498f4634c8B1b687E512971DF74aAe',
    ver: 1,
    batch: null,
    pid: 0,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/ETH/0x589891a198195061cb8ad1a75357a3b7dbadd7bc',
  },
  'HONEY-ETH-2': {
    tokenName: 'HONEY-ETH UNI-V2 LP',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 3,
    icon: 'honey.png',
    tokenAddress: '0x7186141Bd5b90576019dE6988B295A2210565618',
    ver: 2,
    batch: 0,
    pid: 3,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/ETH/0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16',
  },
  'COS-ETH-2': {
    tokenName: 'COS-ETH UNI-V2 LP',
    themeColor: '#2196f3',
    efficiency: 1,
    icon: 'cos.png',
    tokenAddress: '0x7C0Df3b6B8498f4634c8B1b687E512971DF74aAe',
    ver: 2,
    batch: 0,
    pid: 2,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/ETH/0x589891a198195061cb8ad1a75357a3b7dbadd7bc',
  },
  'UNI-ETH-2': {
    tokenName: 'UNI-ETH UNI-V2 LP',
    themeColor: 'rgb(255, 0, 122)',
    efficiency: 1,
    icon: 'uni.png',
    tokenAddress: '0xd3d2E2692501A5c9Ca623199D38826e513033a17',
    ver: 2,
    batch: 0,
    pid: 0,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/ETH/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  },
  'YFI-ETH-2': {
    tokenName: 'YFI-ETH UNI-V2 LP',
    themeColor: 'rgba(25, 101, 233, 0.5)',
    efficiency: 1,
    icon: 'yfi.png',
    tokenAddress: '0x2fDbAdf3C4D5A8666Bc06645B8358ab803996E28',
    ver: 2,
    batch: 0,
    pid: 1,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/ETH/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  },
}

export default class HoneycombFactory {
  static isPathValid(path) {
    return metadata[path] !== undefined
  }

  static create(path, web3) {
    if (!this.isPathValid(path)) {
      return null
    }

    return new Honeycomb({ ...metadata[path], web3 })
  }

  static stage1(web3) {
    const s = {}
    for (const [key, value] of Object.entries(metadata)) {
      if (value.ver === 1) {
        s[key] = new Honeycomb({ ...value, web3 })
        s[key].calculateAPY()
      }
    }
    return s
  }

  static stage2(web3) {
    const s = {}
    for (const [key, value] of Object.entries(metadata)) {
      if (value.ver === 2) {
        s[key] = new Honeycomb({ ...value, web3 })
        s[key].calculateAPY()
      }
    }
    return s
  }
}
