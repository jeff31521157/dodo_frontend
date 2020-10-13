import Honeycomb from '@/lib/honeycomb/Honeycomb'

const data = [
  {
    name: 'COS-ETH UNI-V2 LP',
    themeColor: '#2196f3',
    icon: 'cos.png',
    tokenAddress: '0x589891a198195061cb8ad1a75357a3b7dbadd7bc',
    lpTokenAddress: '0x4c208Ea69cEB57b6E33Cd8C777Ab213A28497F07',
    isV1: true,
    batch: null,
    pid: 0,
  },
  {
    name: 'COS-ETH UNI-V2 LP',
    themeColor: '#2196f3',
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
route.set('COS-ETH-2', data[1])

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
