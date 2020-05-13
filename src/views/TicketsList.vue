<template>
  <div>
    <h2>Список заметок</h2>
    <div class="tickets-list" v-if="allTickets.length">
      <TodoCard
        v-for="ticket in allTickets"
        :key="ticket.id"
        :ticket="ticket"
      />
    </div>
    <p v-else>Нет заметок</p>
  </div>
</template>

<script>
  import TodoCard from  '@/components/TodoCard.vue'
  import { mapGetters } from 'vuex'
export default {
  name: 'TicketsList',
  components: {
    TodoCard
  },
  computed: {
    ...mapGetters(['allTickets']),
  },
  data: () => ({
    showModal: false
  })
}
</script>

<style scoped>
  h2 {
    text-align: center;
    line-height: 2.5rem;
    margin-top: 1rem;
  }
  .tickets-list {
    display: flex;
    justify-content: flex-start;
    list-style-type: none;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 85%;
  }
</style>