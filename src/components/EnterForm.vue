<template>
	<form novalidate @submit.prevent.stop="submit">
		<input type="text" placeholder="Enter your city" v-model="enterCity">
		<button type="submit">Submit</button>
	</form>
</template>
<script>
import { mapActions } from "vuex";
export default {
	data(){
		return{
			enterCity: ''
		}
	}, 
	methods:{
		...mapActions('weather',['fetchWeather']),
		submit(){
			if(this.enterCity){
				this.fetchWeather(this.enterCity);
				this.enterCity = "";
			}

		}
	}
}
</script>
<style scoped>
form{
	display: flex;
   gap: 15px;
	/* padding: 10vh; */
   margin: 2vh 0;
   background: #fafafa;

	
}

input[type="text"] {
   flex-basis: 85%;
	font-size: 18px;
   color: #000;
	border: 2px solid #000;
   padding: 20px;
	transition: border-color .4s;
}

input[type="text"]::placeholder {
   text-transform: uppercase;
   font-size: 18px;
   color: #000;
}

input[type="text"]:focus{
	border-color: #EC6E4C;
	outline: none;
}

button {
   flex-basis: 15%;
	cursor: pointer;
	background: #EC6E4C;
	color: #fff;
	font-size: 18px;
   text-transform: uppercase;
	border: none;
	transition: background .4s, color .4s;
}

button:hover{
	background: #fafafa;
	color: #000;
}

button:active{
	background: #000;
	color: #fafafa;
}
</style>