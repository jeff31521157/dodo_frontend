import erc20Abi from '@/assets/abis/erc20.json'
import BigNumber from 'bignumber.js'

const uint256Max = new BigNumber(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935'
)

export const getTokenContract = ({ web3, tokenAddress }) => {
  return new web3.eth.Contract(erc20Abi, tokenAddress)
}

export const getAllowance = async ({
  web3,
  tokenAddress,
  userAddress,
  contractAddress,
}) => {
  const contract = getTokenContract({ web3, tokenAddress })
  return await contract.methods.allowance(userAddress, contractAddress).call()
}

export const approve = async ({
  web3,
  tokenAddress,
  userAddress,
  contractAddress,
}) => {
  const contract = getTokenContract({ web3, tokenAddress })
  try {
    return await contract.methods
      .approve(contractAddress, uint256Max)
      .send({ from: userAddress })
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getBalance = async ({ web3, tokenAddress, userAddress }) => {
  const contract = getTokenContract({ web3, tokenAddress })
  return new BigNumber(await contract.methods.balanceOf(userAddress).call())
}
