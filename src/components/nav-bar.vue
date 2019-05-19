<template>
  <div class="nav-bar">
    <span>Meteorite Explorer</span>
    <span>
      <a href="https://github.com/mrdionjr/chingu-prework">
        View on GitHub
      </a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
.nav-bar {
  font-size: 1.6rem;
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: rgb(69, 31, 206);
  padding: 2rem;
  display: flex;
  justify-content: space-between;

  a {
    color: #fff;
  }
}
</style>
