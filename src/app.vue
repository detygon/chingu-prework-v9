<template>
  <div id="app">
    <SnackBar :visible="loading">
      Please wait a second..
    </SnackBar>
    <header>
      <NavBar />
      <SearchBar @search="handleSearch" />
    </header>
    <div class="content">
      <div class="loader-wrapper" v-show="loading">
        <TableLoader />
      </div>
      <ErrorMessage v-show="errorMessage">
        {{ errorMessage }}
      </ErrorMessage>
      <MeteoriteList
        :data="meteorites"
        :disableFetch="this.searchValue.length > 0"
        @showMore="handleShowMore"
        v-show="!loading && !errorMessage"
      />
    </div>
  </div>
</template>

<script>
import SearchBar from './components/search-bar.vue'
import NavBar from './components/nav-bar.vue'
import SnackBar from './components/snackbar.vue'
import MeteoriteList from './components/meteorite-list.vue'
import request from './utils/request'
import TableLoader from './components/table-loader.vue'
import ErrorMessage from './components/error-message.vue'

export default {
  name: 'App',
  components: {
    SearchBar,
    MeteoriteList,
    NavBar,
    SnackBar,
    TableLoader,
    ErrorMessage
  },
  data: () => ({
    meteorites: [],
    searchValue: '',
    errorMessage: '',
    loading: false
  }),
  async created() {
    this.meteorites = await this.getMeteorites({ limit: 50 })
  },
  methods: {
    async handleSearch(value) {
      if (!value) {
        this.searchValue = value
        let data = await this.getMeteorites({ limit: 50 })
        this.meteorites = [...data]
        return
      }

      let data = await this.getMeteorites({
        where: { name: value }
      })

      this.searchValue = value
      this.meteorites = [...data]
    },
    async handleShowMore({ limit, offset }) {
      const data = await this.getMeteorites({ limit, offset })
      this.meteorites = [...this.meteorites, ...data]
    },
    async getMeteorites({ limit = 10, offset = 0, where = {} }) {
      let url = `https://data.nasa.gov/api/id/gh4g-9sfh.json?$order=\`name\`+ASC`

      if (Object.keys(where).length === 0) {
        url += `&$limit=${limit}`
        url += `&$offset=${offset}`
      }

      url = where.name ? url + `&$where=name like '%25${where.name}%25'` : url

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
    Ubuntu, Cantarell, 'Roboto', 'Helvetica Neue', sans-serif;
}

body {
  box-sizing: border-box;
  background: #efefef;
}

header {
  margin-bottom: 3rem;
}

#app {
  position: relative;
}

.content {
  margin: 0 auto;
  width: 80%;
}

@media only screen and (max-width: 1200px) {
  .content {
    padding: 1rem;
    width: 100%;
  }
}
</style>

.<style lang="scss" scoped>
.loader-wrapper {
  height: 55rem;
  margin: 0 auto;
}
</style>
