import { createStore } from 'vuex'
import weather from "./modules/weather";
import exchangeRates from './modules/exchange-rates';

export default createStore({
  modules: {
    weather,
    exchangeRates
  }
})