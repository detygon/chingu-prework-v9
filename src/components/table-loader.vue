<template>
  <div class="loader"></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.loader {
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #c5c1c1;
  height: 100%;
  min-height: 50rem;
  width: 100%;
  overflow: hidden;

  &::after {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(241, 235, 235, 0.2),
      transparent
    );
    animation: loading 1.5s infinite;
  }
}

@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
</style>
