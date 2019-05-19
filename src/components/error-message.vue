<template>
  <span class="error-message">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'ErrorMessage'
}
</script>

<style lang="scss" scoped>
.error-message {
  font-size: 3rem;
  font-family: 'Roboto';
  display: block;
  text-align: center;
}
</style>
