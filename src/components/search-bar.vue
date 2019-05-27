<template>
  <div :class="$style.searchBar">
    <form @submit.prevent="onSubmit" :class="$style.searchForm">
      <input
        placeholder="Type a name.."
        v-model="searchTerm"
        :class="$style.searchInput"
        list="terms"
      />
      <datalist id="terms" class="datalist">
        <option v-for="(item, key) in searchHistory" :key="key" :value="item" />
      </datalist>
      <button type="submit" :class="$style.submitBtn">
        <i class="material-icons">search</i>
        <span v-if="$mq === 'md' || $mq === 'lg'">Search</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchTerm: '',
      searchHistory: []
    }
  },
  methods: {
    sanitizeInput(value) {
      return value.replace(/[^\w]/g, '')
    },
    onSubmit() {
      // Limits to the last 10 searches
      if (this.searchHistory.indexOf(this.searchTerm) === -1) {
        this.searchHistory = [...this.searchHistory, this.searchTerm].slice(-10)
      }
      this.$emit('search', this.sanitizeInput(this.searchTerm).trim())
    }
  }
}
</script>

<style lang="scss" module>
.searchBar {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: #fff;
  padding: 3rem;
}

.searchForm {
  margin: 0 auto;
  width: 30%;
  display: flex;
  justify-content: space-around;
}

.searchInput {
  font-size: 2rem;
  border: 2px solid #ddd;
  outline: none;
  padding: 1rem;
}

.submitBtn {
  background: #451fce;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border: none;
  display: inline-block;
  cursor: pointer;
  color: #fff;
  font-size: 19px;
  padding: 1rem 2rem;
  text-decoration: none;
  display: flex;
  justify-content: space-between;

  &:focus {
    outline: none;
  }
}
</style>
