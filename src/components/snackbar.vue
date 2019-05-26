<script>
export default {
  name: 'SnackBar',
  props: {
    visible: Boolean
  }
}
</script>

<template>
  <transition name="fade">
    <div class="snackbar" v-if="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.snackbar {
  font-size: 1.6rem;
  min-width: 18rem;
  background-color: #451fce;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 1.5rem;
  position: absolute;
  z-index: 1;
  left: 3rem;
  top: 8rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
