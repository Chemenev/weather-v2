//import axios from "axios";
import { HTTP_WEATHER } from '@/axios/';
//import Vue from 'vue'

const API_KEY = 'b35878a2c5ab36e25486221e2dcd1cc3';
//const URL = 'http://api.openweathermap.org/data/2.5/forecast?';

const filterdWeatherByDay = (data) => {
	const groupDays = [];
	data.list.forEach(dateItem => {
		const targetDay = new Date(dateItem.dt_txt).getDay();
		groupDays[targetDay] ? groupDays[targetDay].push(dateItem) : groupDays[targetDay] = [dateItem]
	});
	const days = groupDays.filter(Boolean).flatMap(item => {
		return item[Math.floor(item.length / 2)]
	}).sort((a, b) => a.dt - b.dt);
	days.shift();
	return days;
}

export default {
	namespaced: true,
	state: {
		arrlistDays: [],
		cityName: '',
		firtsDay: {},
		enterCity: 'Moscow',
		isError: false,
		loaded: false
	},
	mutations: {
		set(state, udatedState) {
			for (const key in udatedState) {
				state[key] = udatedState[key]
			}
		}
	},
	getters: {
		listDays(state) {
			return state.arrlistDays
		},
		cityName(state) {
			return state.cityName
		},
		firstDay(state) {
			return state.firstDay
		},
		enterCity(state) {
			console.log('entCity ' + state.enterCity)
			return state.enterCity
		},
		isError(state) {
			return state.isError
		},
		loaded(state) {
			return state.loaded
		}

	},
	actions: {
		async fetchWeather({ commit, state }, city = state.enterCity) {
			try {
				let data;
				await HTTP_WEATHER.get(`forecast?q=${city}&appid=${API_KEY}&units=metric`)
					.then(response => {
						data = response.data;
					});
				commit('set', { enterCity: city, firstDay: data?.list?.[0] || '', cityName: data.city.name, loaded: true },);

				const days = filterdWeatherByDay(data);
				commit('set', { arrlistDays: days });
				if (state.isError) {
					commit('set', { isError: false });
				}
			} catch (error) {
				commit('set', { isError: true });
			}
		}
	},
}