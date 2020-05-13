<template>
  <div>
    <h2 class="page-title">{{route === '/create' ? 'Создать заматеку' : 'Редактирование заметки'}}</h2>
   <Ticket/>
  </div>
</template>

<script>
  import Ticket from '@/components/Ticket.vue'
export default {
  name: 'ViewTicket',
  components: {
    Ticket
  },
  data: () => ({
    route: '/create'
  }),
  mounted() {
    this.route = this.$route.path
  }
}
</script>

<style scoped>
  .page-title {
    margin-top: 30px;
  }
</style>
