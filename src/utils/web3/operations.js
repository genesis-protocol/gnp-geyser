import ETHWallet from "./ethWallet";
import MYContract from "./erc20Token"
import geyser from "./geyser"
import Decimal from "decimal.js"

import {onChainCall, offChainCall} from "./common";

let myToken = null
let geyserContract = null
let tokenDecimals = new Decimal(10).pow(MYContract.decimals)

function loadTOKEN() {
  if(myToken === null) {
    let web3Instance = ETHWallet.getWeb3Instance()
    myToken = new web3Instance.eth.Contract(MYContract.abi, MYContract.getAddress())
  }
}

function loadGeyser() {
  if(geyserContract === null) {
    let web3Instance = ETHWallet.getWeb3Instance()
    geyserContract = new web3Instance.eth.Contract(geyser.abi, geyser.address)  }
}

async function commonApprove(amount) {
  return await onChainCall(
    myToken,
    ETHWallet.getAccount(),
    "approve",
    [geyser.address, amount],
  )
}

async function enableStaking() {
  if(!ETHWallet.isConnected()) {
    return
  }

  if(!myToken) {
    loadTOKEN()
  }

  Decimal.set({ toExpPos: 256 })
  let maxApprove = new Decimal("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
  return commonApprove(geyser.address, maxApprove.toString())
}

async function commonERC20Balance(contract, address, outDecimal) {
  let result = await offChainCall(contract, address, "balanceOf", [address])
  if(result !== null) {
    result = new Decimal(result).div(tokenDecimals)
    return outDecimal ? result:result.toDP(6, Decimal.ROUND_DOWN)
  } else {
    return null
  }
}

async function getNextRound() {
  loadGeyser();
  let address = ETHWallet.getAccount()
  return await offChainCall(geyserContract, address, "nextRound", [])
}

async function getGeyserRoundInfo(rIdx = null) {
  loadGeyser();

  if(rIdx === null) {
    rIdx = await getNextRound()
    rIdx = rIdx - 1
  }

  let address = ETHWallet.getAccount()
 return await offChainCall(geyserContract, address, "rounds", [rIdx])
}

async function claim(round) {
  if(!ETHWallet.isConnected()) {
    return null
  }

  return await onChainCall(
    geyserContract,
    ETHWallet.getAccount(),
    "claimRewards",
    [round],
  )
}

async function ethBalance() {
  let address = ETHWallet.getAccount()
  return ETHWallet.getWeb3Instance().eth.getBalance(address)
    .then(r=>{
      return new Decimal(r).div(1e18).toDP(6, Decimal.ROUND_DOWN)
    })
    .catch(_=>{
      return null
    })
}

async function load(tokenAddress) {
  MYContract.setTokenAddress(tokenAddress)
  return ETHWallet.loadWallet()
}

async function isStakingEnabled() {
  if(!myToken) {
    loadTOKEN()
  }

  let spender = ETHWallet.getAccount()
  let result = await offChainCall(myToken, address, "allowance", [spender, MYContract.getAddress()])

  if(result !== null) {
    let amount = new Decimal(result).div(tokenDecimals)
    return amount.gt(0)
  } else {
    return false
  }
}

async function staking(amount) {
  if(!ETHWallet.isConnected()) {
    return null
  }

  return await onChainCall(
    geyserContract,
    ETHWallet.getAccount(),
    "stakeIn",
    [amount],
  )
}

async function stakingInfo(round) {
  loadGeyser()
  let user = ETHWallet.getAccount()
  return await offChainCall(myToken, user, "getStakingData", [user, round])
}

export default {
  load,

  ethBalance,
  commonERC20Balance,

  isStakingEnabled,
  enableStaking,
  staking,
  claim,

  getGeyserRoundInfo,
  getNextRound,
  stakingInfo,
}
