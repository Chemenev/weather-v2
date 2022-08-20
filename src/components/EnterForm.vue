<template>
  <form novalidate @submit.prevent.stop="submit">
    <div class="like-select">
      <input
        class="like-select__enter-input"
        type="text"
        placeholder="Enter your city"
        v-model="enterCity"
        @click="
          {
            isActive = true;
          }
        "
      />
      <div
        class="like-select__append"
        v-bind:class="{ active: isActive }"
        @click="
          {
            isActive = true;
          }
        "
      >
        +
      </div>
      <div
        class="like-select__menu"
        v-if="cityList.length > 0 && isActive === true"
        v-click-outside="hide"
      >
        <div
          class="ike-select__menu-item"
          v-for="(city, index) in filteredCity()"
          :key="index"
          @click="currenCity(city)"
        >
          {{ city }}
        </div>
      </div>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      enterCity: '',
      isActive: false,
    };
  },
  created() {
    this.enterCity = this.value;
  },
  computed: {
    ...mapGetters('weather', ['cityList']),
  },
  methods: {
    ...mapActions('weather', ['fetchWeather']),
    submit() {
      if (this.enterCity) {
        this.fetchWeather(this.enterCity);
      }
    },
    currenCity(value) {
      this.enterCity = value;
      this.isActive = false;
    },
    hide() {
      this.isActive = false;
    },
    filteredCity() {
      const filteredCity = this.cityList.filter((item) =>
        item.includes(this.enterCity)
      );
      return filteredCity.slice(0, 4);
    },
  },
};
</script>

<style scoped>
.like-select {
  width: 84%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #000;
  position: relative;
}

.like-select__menu {
  position: absolute;
  left: -2px;
  top: 100%;
  width: calc(100% + 4px);
  text-align: left;
  border: 2px solid #000;
  background: #fff;
}

.like-select__append {
  padding: 15px;
  font-size: 25px;
  font-weight: 600;
  transition: transform 0.4s, color 0.4s;
  cursor: pointer;
}

.like-select__append.active {
  transform: rotate(45deg);
  color: #ec6e4c;
}

.ike-select__menu-item {
  text-transform: capitalize;
  padding: 7px 15px;
}

.ike-select__menu-item:hover {
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  position: relative;
  margin: 2vh 0 0;
}

input[type='text'] {
  flex-basis: 84%;
  font-size: 18px;
  color: #000;
  border: none;
  padding: 20px;
  transition: border-color 0.4s;
}

input[type='text']::placeholder {
  text-transform: uppercase;
  font-size: 18px;
  color: #000;
}

input[type='text']:focus {
  border-color: #ec6e4c;
  outline: none;
}

button {
  flex-basis: 14%;
  cursor: pointer;
  background: #ec6e4c;
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  border: none;
  transition: background 0.4s, color 0.4s;
}

button:hover {
  background: #fafafa;
  color: #000;
}

button:active {
  background: #000;
  color: #fafafa;
}

.currency-list {
  display: flex;
  margin-bottom: 15px;
  width: 100%;
}
.currency-list__item {
  padding: 15px 20px;
  background: #fafafa;
  margin-right: 15px;
  cursor: pointer;
  transition: background 0.4s, color 0.4s;
}

.currency-list__item:hover {
  background: #ec6e4c;
  color: #fff;
}

.currency-list__item:active {
  background: #000;
  color: #fafafa;
}
</style>
