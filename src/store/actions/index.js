import { SET_WALLET_CONNECTION_STATUS, SET_COINBASE_ADDRESS, SET_NET_STATUS, SET_NFT_ID, SET_TIMER, SET_REWARD } from "../types";

export const setWalletConnectStatusAction = (status = false) => {
    return {
        type: SET_WALLET_CONNECTION_STATUS,
        payload: status
    }
}

export const setCoinbaseAddressAction = (address = "") => {
    return {
        type: SET_COINBASE_ADDRESS,
        payload: address
    }
}

export const setNetStatus = (status = false) => {
    return {
        type: SET_NET_STATUS,
        payload: status
    }
}

export const setNftID = (ids = []) => {
    return {
        type: SET_NFT_ID,
        payload: ids
    }
}

export const setTimer = (timer = {}) => {
    return {
        type: SET_TIMER,
        payload: timer
    }
}

export const setRewardRates = (rewards = []) => {
    return {
        type: SET_REWARD,
        payload: rewards
    }
}