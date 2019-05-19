<template>
  <div id="app">
    <header>
      <SearchBar @search="handleSearch" />
    </header>
    <div class="content">
      <div v-if="loading">
        We are fetching the data
      </div>
      <MeteoriteList
        :data="results"
        :disableFetch="!!this.searchValue.length"
        @showMore="handleShowMore"
      />
    </div>
  </div>
</template>

<script>
import SearchBar from './components/search-bar.vue'
import MeteoriteList from './components/meteorite-list.vue'
import request from './utils/request'

export default {
  name: 'App',
  components: {
    SearchBar,
    MeteoriteList
  },
  data: () => ({
    meteorites: [],
    searchValue: '',
    errorMessage: '',
    loading: false
  }),
  async created() {
    this.meteorites = await this.getMeteorites({ limit: 10 })
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
    async handleShowMore({ limit, offset }) {
      const data = await this.getMeteorites({ limit, offset })
      this.meteorites = [...this.meteorites, ...data]
    },
    async getMeteorites({ limit, offset = 0 }) {
      let url = `https://data.nasa.gov/api/id/gh4g-9sfh.json?`
      url += `&$limit=${limit}`
      url += `&$offset=${offset}`

      try {
        this.loading = true
        const data = await request(url)
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

header {
  margin-bottom: 3rem;
}
</style>

.<style lang="scss" scoped>
.content {
  margin: 0 auto;
  width: 80%;
}

@media (max-width: 900px) {
  .content {
    width: 100%;
  }
}
</style>
