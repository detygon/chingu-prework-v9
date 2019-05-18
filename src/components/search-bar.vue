<template>
  <div :class="$style.searchBar">
    <form @submit.prevent="onSubmit" :class="$style.searchForm">
      <input
        placeholder="Search..."
        v-model="searchTerm"
        :class="$style.searchInput"
      />
      <button type="submit" :class="$style.submitBtn">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('search', this.searchTerm)
    }
  }
}
</script>

<style lang="scss" module>
.searchBar {
  box-shadow: 0 0 1rem 0.5rem rgba(#000, 0.1);
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
  font-size: 2.4rem;
  border: 2px solid #ddd;
  outline: none;
  padding: 1rem;
  transition: all 0.2s;
  transition-delay: 0.1s;
}

.submitBtn {
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.05, #7892c2),
    color-stop(1, #476e9e)
  );
  background-color: #7892c2;
  border: none;
  display: inline-block;
  cursor: pointer;
  color: #fff;
  font-size: 19px;
  padding: 1rem 2rem;
  text-decoration: none;
}
</style>
