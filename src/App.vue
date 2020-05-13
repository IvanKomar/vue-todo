<template>
  <div id="app">
    <Modal />
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import Modal from '@/components/Modal.vue'

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  },
  components: {
    MainLayout,
    Modal
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
