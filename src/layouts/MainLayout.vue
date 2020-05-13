<template>
  <div>
    <Navbar/>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'main-layout',
  components: {
    Navbar
  }
}
</script>
<style >
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    font-family: Roboto, Helvetica, Arial, sans-serif;
  }

</style>