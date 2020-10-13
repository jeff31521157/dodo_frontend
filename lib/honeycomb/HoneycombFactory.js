import Honeycomb from '@/lib/honeycomb/Honeycomb'

const data = [
  {
    tokenName: 'COS',
    lpTokenName: 'COS-ETH UNI-V2 LP',
    themeColor: '#2196f3',
    efficiency: 1,
    icon: 'cos.png',
    tokenAddress: '0x589891a198195061cb8ad1a75357a3b7dbadd7bc',
    lpTokenAddress: '0x4c208Ea69cEB57b6E33Cd8C777Ab213A28497F07',
    isV1: true,
    batch: null,
    pid: 0,
  },
  {
    tokenName: 'HONEY',
    lpTokenName: 'HONEY-ETH UNI-V2 LP',
    themeColor: 'rgb(121, 85, 72)',
    efficiency: 3,
    icon: 'honey.png',
    tokenAddress: '0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16',
    lpTokenAddress: '0x0A729e68Dc6fCC85aD47363Bf00d781dab1F2309',
    isV1: false,
    batch: 0,
    pid: 3,
  },
  {
    tokenName: 'UNI',
    lpTokenName: 'UNI-ETH UNI-V2 LP',
    themeColor: 'rgb(255, 0, 122)',
    efficiency: 1,
    icon: 'uni.png',
    tokenAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    lpTokenAddress: '0x87578FDFAA098a95Bd2a5110970C62F3AF49EA43',
    isV1: false,
    batch: 0,
    pid: 2,
  },
  {
    tokenName: 'YFI',
    lpTokenName: 'YFI-ETH UNI-V2 LP',
    themeColor: 'rgba(25, 101, 233, 0.5)',
    efficiency: 1,
    icon: 'yfi.png',
    tokenAddress: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    lpTokenAddress: '0x49b03768D2AaE8e77D337f0dD5F113F3Dc48B683',
    isV1: false,
    batch: 0,
    pid: 1,
  },
  {
    tokenName: 'COS',
    lpTokenName: 'COS-ETH UNI-V2 LP',
    themeColor: '#2196f3',
    efficiency: 1,
    icon: 'cos.png',
    tokenAddress: '0x589891a198195061cb8ad1a75357a3b7dbadd7bc',
    lpTokenAddress: '0x4c208Ea69cEB57b6E33Cd8C777Ab213A28497F07',
    isV1: false,
    batch: 0,
    pid: 0,
  },
]
const route = new Map()
route.set('COS-ETH', data[0])
route.set('HONEY-ETH-2', data[1])
route.set('UNI-ETH-2', data[2])
route.set('YFI-ETH-2', data[3])
route.set('COS-ETH-2', data[4])

export default class HoneycombFactory {
  static isPathValid(path) {
    return route.get(path) !== undefined
  }

  static create(path, web3) {
    if (!this.isPathValid(path)) {
      return null
    }

    return new Honeycomb({ ...route.get(path), web3 })
  }
}
