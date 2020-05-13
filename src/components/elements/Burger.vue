<template>
  <div class="container" @click="toggle" :class="{change: clicked }">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
</template>

<script>
export default {
  name: 'Burger',
  data: () => ({
    clicked: false
  }),
  methods: {
    toggle() {
      this.clicked = !this.clicked
    }
  }
}
</script>

<style scoped>
  .container {
    display: inline-block;
    cursor: pointer;
  }

  .bar1, .bar2, .bar3 {
    width: 35px;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.7);
    margin: 6px 0;
    transition: 0.4s;
  }

  .change .bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
  }

  .change .bar2 {opacity: 0;}

  .change .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }
</style>