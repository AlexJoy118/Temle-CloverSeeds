import { combineReducers } from 'redux';
import { isWalletConnect, coinbaseAddress, isCorrectNet, NFT_ID, TIMER, REWARD_RATES } from './reducers';

const rootReducer = combineReducers({
	isWalletConnect,
    isCorrectNet,
    coinbaseAddress,
    NFT_ID,
    TIMER,
    REWARD_RATES
})

export default rootReducer;