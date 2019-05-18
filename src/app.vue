<template>
  <div id="app">
    <SearchBar @search="handleSearch" />
    <p v-if="loading">loading</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <ul>
      <li v-for="(item, key) in results" :key="key">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import SearchBar from './components/search-bar'

export default {
  name: 'App',
  components: {
    SearchBar
  },
  data: () => ({
    meteorites: [],
    searchValue: '',
    errorMessage: '',
    loading: false
  }),
  async created() {
    this.meteorites = await this.getMeteorites()
  },
  computed: {
    results() {
      const includesSearchTerm = item => {
        return item.name.toLowerCase().includes(this.searchValue)
      }

      const sortByName = (current, next) => {
        if (current.name < next.name) return -1
        if (current.name > next.name) return 1
        return 0
      }

      return this.meteorites.filter(includesSearchTerm).sort(sortByName)
    }
  },
  methods: {
    handleSearch(value) {
      this.searchValue = value.toLowerCase()
    },
    async getMeteorites() {
      const url = `https://data.nasa.gov/api/id/gh4g-9sfh.json?&$limit=10&$offset=1`
      this.loading = true

      try {
        const data = await fetch(url).then(res => res.json())
        this.loading = false
        return data
      } catch (error) {
        this.errorMessage = 'Failed to retrieve the data. Please try again.'
        this.loading = false
      }

      return []
    }
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

html {
  // Define what 1rem is. 1rem => 10px
  font-size: 62.5%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
  box-sizing: border-box;
  background: #eee;
}
</style>
