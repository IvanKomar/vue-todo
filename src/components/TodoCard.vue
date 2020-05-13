<template>
  <div class="card">
    <small @click.prevent="showDeleteModal">&times;</small>
    <div class="card-wrapper" @click.prevent="editTicket">
      <header class="card__header">
        <h3>
          {{ todoData.title }}
        </h3>
      </header>
      <hr />
      <main class="card__content">
        <ol class="card__list" v-if="todoData.todos.length">
          <li v-for="todoItem in todoData.todos" :key="todoItem.id">
            {{ todoItem.text }}
          </li>
        </ol>
        <p v-else>Нет активных задач</p>
      </main>
    </div>
  </div>
</template>

<script>
  import { mapMutations} from 'vuex'
export default {
  props: {
    ticket: {
      required: true,
      type: Object,
    },
  },

  data: () => ({
    todoData: {
      todos: [],
    },
  }),
  mounted() {
    this.todoData = this.ticket;
  },
  methods: {
    ...mapMutations(['deleteTicket', 'openModal']),
    showDeleteModal() {
      this.openModal({
        type: `Удаление ${this.todoData.title}`,
        text: 'Вы уверены, что хотите удалить заметку?',
        agreeBtnText: 'Удалить',
        target: this.todoData
      })

    },
    editTicket() {
      this.$router.push(`/edit/${this.todoData.id}`);
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.75);
  padding: 25px 0px;
  border-radius: 20px;
  width: 350px;
  height: 150px;
  margin: 10px 20px;
  position: relative;
  z-index: 999;
}
.card-wrapper {
  cursor: pointer;
}
.card__header h3 {
  width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  margin-left: 2.2rem;
}
hr {
  width: 80%;
  margin: 5px auto;
}
.card__list {
  /* list-style: none; */
  text-overflow: clip;
  margin-bottom: 10px;
  text-align: start;
}
.card__list li {
  height: 20px;
  width: 280px;
  line-height: 1.3rem;
  margin-left: 2.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

p {
  margin-top: 10px;
  font-weight: 500;
  color: silver;
}
small {
  display: block;
  width: 40px;
  height: 40px;
  font-size: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 1000;
}
</style>
