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
  '3-HONEY': {
    tokenName: 'HONEY',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 5,
    icon: 'honey.png',
    tokenAddress: '0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16',
    ver: 3,
    batch: 0,
    pid: 0,
    isLPToken: false,
    isHToken: false,
  },
  '3-WETH': {
    tokenName: 'WETH',
    themeColor: '#880E4F',
    efficiency: 1,
    icon: 'weth.png',
    tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    ver: 3,
    batch: 0,
    pid: 1,
    isLPToken: false,
    isHToken: false,
  },
  '3-WBTC': {
    tokenName: 'WBTC',
    themeColor: '#FF6F00',
    efficiency: 1,
    icon: 'wbtc.png',
    tokenAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    ver: 3,
    batch: 0,
    pid: 2,
    decimals: 8,
    isLPToken: false,
    isHToken: false,
  },
  '3-hUSDT': {
    tokenName: 'hUSDT',
    themeColor: '#004D40',
    efficiency: 3,
    icon: 'usdt.png',
    subicon: 'honey.png',
    tokenAddress: '0x16B7F5439D5fa7135BdC6A8C594d1BfcFe284065',
    ver: 3,
    batch: 0,
    pid: 3,
    decimals: 6,
    isLPToken: false,
    isHToken: true,
    honeyJarUrl: '/honeyjar/USDT',
  },
  '3-hUSDC': {
    tokenName: 'hUSDC',
    themeColor: '#0D47A1',
    efficiency: 3,
    icon: 'usdc.png',
    subicon: 'honey.png',
    tokenAddress: '0x905cAE2FF898d99DCBbc7dB45c2736D01EAe1445',
    ver: 3,
    batch: 0,
    pid: 4,
    decimals: 6,
    isLPToken: false,
    isHToken: true,
    honeyJarUrl: '/honeyjar/USDC',
  },
  '3-hDAI': {
    tokenName: 'hDAI',
    themeColor: '#FF6F00',
    efficiency: 2,
    icon: 'dai.png',
    subicon: 'honey.png',
    tokenAddress: '0x37388980Ed4803d58c0C8893Eb9fD806eDE2e57e',
    ver: 3,
    batch: 0,
    pid: 5,
    isLPToken: false,
    isHToken: true,
    honeyJarUrl: '/honeyjar/DAI',
  },
  '3-HONEY-ETH': {
    tokenName: 'HONEY-ETH UNI-V2 LP',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 2,
    icon: 'honey.png',
    tokenAddress: '0x7186141Bd5b90576019dE6988B295A2210565618',
    ver: 3,
    batch: 0,
    pid: 6,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/ETH/0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16',
  },
  '3-HONEY-USDC': {
    tokenName: 'HONEY-USDC UNI-V2 LP',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 2,
    icon: 'honey.png',
    tokenAddress: '0x648E5Fba721A949f0027E7111381489Ae832b216',
    ver: 3,
    batch: 0,
    pid: 7,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/0x37c9eb4cef7571f27136145c82c37a01f2a8aa16/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  '3-COS-USDC': {
    tokenName: 'COS-USDC UNI-V2 LP',
    themeColor: '#2196f3',
    efficiency: 1,
    icon: 'cos.png',
    tokenAddress: '0xa8f7Ea0229dD1429a0fa8C62962216682921569E',
    ver: 3,
    batch: 0,
    pid: 8,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/0x589891a198195061cb8ad1a75357a3b7dbadd7bc/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  '4-HONEY-ETH': {
    tokenName: 'HONEY-ETH UNI-V2 LP',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 4,
    icon: 'honey.png',
    tokenAddress: '0x7186141Bd5b90576019dE6988B295A2210565618',
    ver: 3,
    batch: 1,
    pid: 0,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/ETH/0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16',
    highlight: true,
  },
  '4-HONEY-USDC': {
    tokenName: 'HONEY-USDC UNI-V2 LP',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 2,
    icon: 'honey.png',
    tokenAddress: '0x648E5Fba721A949f0027E7111381489Ae832b216',
    ver: 3,
    batch: 1,
    pid: 1,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/0x37c9eb4cef7571f27136145c82c37a01f2a8aa16/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  '4-COS-USDC': {
    tokenName: 'COS-USDC UNI-V2 LP',
    themeColor: '#2196f3',
    efficiency: 1,
    icon: 'cos.png',
    tokenAddress: '0xa8f7Ea0229dD1429a0fa8C62962216682921569E',
    ver: 3,
    batch: 1,
    pid: 2,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/0x589891a198195061cb8ad1a75357a3b7dbadd7bc/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  '4-HONEY': {
    tokenName: 'HONEY',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 3,
    icon: 'honey.png',
    tokenAddress: '0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16',
    ver: 3,
    batch: 1,
    pid: 3,
    isLPToken: false,
    isHToken: false,
  },
  '4-yUSDT': {
    tokenName: 'yUSDT',
    themeColor: '#004D40',
    efficiency: 3,
    icon: 'usdt.png',
    subicon: 'yfi.png',
    tokenAddress: '0x2f08119C6f07c006695E079AAFc638b8789FAf18',
    ver: 3,
    batch: 1,
    pid: 4,
    decimals: 6,
    isLPToken: false,
    isHToken: false,
    highlight: true,
  },
  '4-WMBL': {
    tokenName: 'WMBL',
    themeColor: 'rgb(72, 47, 137)',
    efficiency: 1,
    icon: 'wmbl.png',
    tokenAddress: '0x1165F761a16C3d07270775b793d202075e5BE14d',
    ver: 3,
    batch: 1,
    pid: 5,
    isLPToken: false,
    isHToken: false,
    highlight: true,
  },
  '4-hUSDT': {
    tokenName: 'hUSDT',
    themeColor: '#004D40',
    efficiency: 2,
    icon: 'usdt.png',
    subicon: 'honey.png',
    tokenAddress: '0x16B7F5439D5fa7135BdC6A8C594d1BfcFe284065',
    ver: 3,
    batch: 1,
    pid: 6,
    decimals: 6,
    isLPToken: false,
    isHToken: true,
    honeyJarUrl: '/honeyjar/USDT',
  },
  '4-hUSDC': {
    tokenName: 'hUSDC',
    themeColor: '#0D47A1',
    efficiency: 2,
    icon: 'usdc.png',
    subicon: 'honey.png',
    tokenAddress: '0x905cAE2FF898d99DCBbc7dB45c2736D01EAe1445',
    ver: 3,
    batch: 1,
    pid: 7,
    decimals: 6,
    isLPToken: false,
    isHToken: true,
    honeyJarUrl: '/honeyjar/USDC',
  },
  '4-hDAI': {
    tokenName: 'hDAI',
    themeColor: '#FF6F00',
    efficiency: 2,
    icon: 'dai.png',
    subicon: 'honey.png',
    tokenAddress: '0x37388980Ed4803d58c0C8893Eb9fD806eDE2e57e',
    ver: 3,
    batch: 1,
    pid: 8,
    isLPToken: false,
    isHToken: true,
    honeyJarUrl: '/honeyjar/DAI',
  },
  '5-HONEY-ETH': {
    tokenName: 'HONEY-ETH UNI-V2 LP',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 4,
    icon: 'honey.png',
    tokenAddress: '0x7186141Bd5b90576019dE6988B295A2210565618',
    ver: 3,
    batch: 2,
    pid: 0,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/ETH/0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16',
    highlight: true,
  },
  '5-HONEY-USDC': {
    tokenName: 'HONEY-USDC UNI-V2 LP',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 2,
    icon: 'honey.png',
    tokenAddress: '0x648E5Fba721A949f0027E7111381489Ae832b216',
    ver: 3,
    batch: 2,
    pid: 1,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/0x37c9eb4cef7571f27136145c82c37a01f2a8aa16/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  '5-COS-USDC': {
    tokenName: 'COS-USDC UNI-V2 LP',
    themeColor: '#2196f3',
    efficiency: 1,
    icon: 'cos.png',
    tokenAddress: '0xa8f7Ea0229dD1429a0fa8C62962216682921569E',
    ver: 3,
    batch: 2,
    pid: 2,
    isLPToken: true,
    uniswapUrl:
      'https://app.uniswap.org/#/add/0x589891a198195061cb8ad1a75357a3b7dbadd7bc/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  '5-HONEY': {
    tokenName: 'HONEY',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 3,
    icon: 'honey.png',
    tokenAddress: '0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16',
    ver: 3,
    batch: 2,
    pid: 3,
    isLPToken: false,
    isHToken: false,
  },
  '5-yUSDT': {
    tokenName: 'yUSDT',
    themeColor: '#004D40',
    efficiency: 2,
    icon: 'usdt.png',
    subicon: 'yfi.png',
    tokenAddress: '0x2f08119C6f07c006695E079AAFc638b8789FAf18',
    ver: 3,
    batch: 2,
    pid: 4,
    decimals: 6,
    isLPToken: false,
    isHToken: false,
  },
  '5-WBTC': {
    tokenName: 'WBTC',
    themeColor: '#FF6F00',
    efficiency: 2,
    icon: 'wbtc.png',
    tokenAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    ver: 3,
    batch: 2,
    pid: 5,
    decimals: 8,
    isLPToken: false,
    isHToken: false,
  },
  '5-hUSDT': {
    tokenName: 'hUSDT',
    themeColor: '#004D40',
    efficiency: 2,
    icon: 'usdt.png',
    subicon: 'honey.png',
    tokenAddress: '0x16B7F5439D5fa7135BdC6A8C594d1BfcFe284065',
    ver: 3,
    batch: 2,
    pid: 6,
    decimals: 6,
    isLPToken: false,
    isHToken: true,
    honeyJarUrl: '/honeyjar/USDT',
  },
  '5-hUSDC': {
    tokenName: 'hUSDC',
    themeColor: '#0D47A1',
    efficiency: 2,
    icon: 'usdc.png',
    subicon: 'honey.png',
    tokenAddress: '0x905cAE2FF898d99DCBbc7dB45c2736D01EAe1445',
    ver: 3,
    batch: 2,
    pid: 7,
    decimals: 6,
    isLPToken: false,
    isHToken: true,
    honeyJarUrl: '/honeyjar/USDC',
  },
  '5-hDAI': {
    tokenName: 'hDAI',
    themeColor: '#FF6F00',
    efficiency: 2,
    icon: 'dai.png',
    subicon: 'honey.png',
    tokenAddress: '0x37388980Ed4803d58c0C8893Eb9fD806eDE2e57e',
    ver: 3,
    batch: 2,
    pid: 8,
    isLPToken: false,
    isHToken: true,
    honeyJarUrl: '/honeyjar/DAI',
  },
}

export default class HoneycombFactory {
  static isPathValid(path) {
    return metadata[path] !== undefined
  }

  static create(path, web3, gtag) {
    if (!this.isPathValid(path)) {
      return null
    }

    return new Honeycomb({ ...metadata[path], web3, gtag })
  }

  static stage1(web3) {
    const s = {}
    for (const [key, value] of Object.entries(metadata)) {
      if (value.ver === 1) {
        s[key] = new Honeycomb({ ...value, web3 })
      }
    }
    return s
  }

  static stage2(web3) {
    const s = {}
    for (const [key, value] of Object.entries(metadata)) {
      if (value.ver === 2) {
        s[key] = new Honeycomb({ ...value, web3 })
      }
    }
    return s
  }

  static stage3(web3) {
    const s = {}
    for (const [key, value] of Object.entries(metadata)) {
      if (value.ver === 3 && value.batch === 0) {
        s[key] = new Honeycomb({ ...value, web3 })
      }
    }
    return s
  }

  static stage4(web3) {
    const s = {}
    for (const [key, value] of Object.entries(metadata)) {
      if (value.ver === 3 && value.batch === 1) {
        s[key] = new Honeycomb({ ...value, web3 })
        s[key].calculateAPY()
      }
    }
    return s
  }

  static stage5(web3) {
    const s = {}
    for (const [key, value] of Object.entries(metadata)) {
      if (value.ver === 3 && value.batch === 2) {
        s[key] = new Honeycomb({ ...value, web3 })
        s[key].calculateAPY()
      }
    }
    return s
  }
}
