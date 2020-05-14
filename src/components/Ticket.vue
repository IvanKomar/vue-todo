<template>
  <div>
    <form @submit.prevent="ticketHandler">
      <div class="btn-undo-rendo-section" v-show="mode === 'edit'">
        <button v-show="status === 'updated' || status === 'rendoded'" class="btn-ticket undo-redo" @click.prevent="undo">Отменить изменения</button>
        <button v-show="status === 'undoded'" class="btn-ticket undo-redo" @click.prevent="rendo">Вернуть изменения</button>
      </div>
      <label for="ticketTitle">Название заметки</label>
      <input
        v-model="ticketTitle" 
        class="ticket-input" 
        type="text" 
        name="ticketTitle" 
        id="ticketTitle" 
        placeholder="Введите названия заметки"
      />
      <div class="todos-container">
        <h2 v-if="!editTodo">Добавить задачу</h2>
        <h2 v-else>Редактировать задачу</h2>
        <div class="todo-view-container">
          <input 
            v-model="todoInputText" 
            class="todo-input" 
            placeholder="Введите название задачи" 
            type="text"
          > 
          <button 
            v-if="!editTodo" 
            :disabled="!todoInputText.trim()" 
            class="btn add-todo-btn" 
            @click.prevent="addTodoHandler"
          >
            +
          </button> 
          <div v-else class="btn-container">
            <button 
              :disabled="!todoInputText.trim()" 
              class="btn add-todo-btn" 
              @click.prevent="updateTodoHandler"
            >
              &#10004;
            </button>  
            <button 
              :disabled="!todoInputText.trim()" 
              class="btn edit-cancel-btn" 
              @click.prevent="editCancelHandler"
            >
              &#10006;
            </button>  
          </div>
        </div>
        <h2>Список задач:</h2>
        <ul class="todos-list">
          <li 
            class="todo-item-container" 
            v-for="(todo, index) in todos " 
            :key="todo.id"
          >
            <input 
              type="checkbox"  
              :checked="todo.complete"
            >
            <label 
              @click.prevent="onCheckHandler(todo, index)" 
              :for="todo.id" 
              class="todo-item"
            >
              {{todo.text}} 
            </label>
            <div>
              <button 
                class="btn btn-edit" 
                @click.prevent="onEditHandler(index)"
              >
                &#9998;
              </button>
              <button 
                class="btn btn-delete" 
                @click.prevent="deleteHandler(index)"
              >
                &#10006;
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn-container btn-ticket-section">
        <button 
          :disabled="!ticketTitle.trim()"
          type="submit"
          class="btn-ticket to-create" 
        >
          {{mode === 'create' ? 'Создать' : 'Сохранить'}}
        </button>
        <button class="btn-ticket" @click.prevent="goBack">На главную</button>
        <button v-show="mode === 'edit'" class="btn-ticket btn-ticket-delete" @click.prevent="showDeleteModal">Удалить</button>
      </div>

    </form>
  </div>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'CreateTicketComponent',
  data: () => ({
    mode: 'create',
    status: 'created',
    beforeUpdateTicket: null,
    ticketTitle: '',
    todoInputText: '',
    todos: [],
    editTodo: null,
    editTodoIndex: null
  }),
  computed: {
    ...mapGetters(['ticketById', 'undoTicketById', 'rendoTicketById'])
  },
  methods: {
    ...mapMutations(['addNewTicket', 'updateTicket', 'deleteTicket', 'openModal', 'closeModal', 'undoTicket']),
    undo() {
      if (this.status === 'updated' || this.status === 'rendoded') {
        const id = +this.$route.params.id
        const oldTicket = this.undoTicketById(id)
        this.undoTicket(oldTicket)
        this.status = 'undoded'
        this.ticketTitle = oldTicket.title
        this.todos = oldTicket.todos
      }
    },
    rendo() {
      if (this.status === 'undoded') {
        const id = +this.$route.params.id
        const prevTicket = this.rendoTicketById(id)
        this.status = 'rendoded'
        this.ticketTitle = prevTicket.title
        this.todos = prevTicket.todos
      }
    },
    ticketHandler() {
        if (this.mode === 'create') {
          this.addNewTicket({
            id: Date.now(), 
            title: this.ticketTitle, 
            todos: this.todos,
            status: 'created'
          })
        } else if (this.mode === 'edit') {
          this.updateTicket({
            id: +this.$route.params.id,
            title: this.ticketTitle,
            todos: this.todos,
            status: 'updated'
          })
        }
        this.$router.push('/')
        this.ticketTitle = ''
        this.todos = []
    },
    showDeleteModal() {
      const id = +this.$route.params.id
      const ticket = this.ticketById(id)
      this.openModal({
          type: `Удаление ${ticket.title}`,
          text: 'Вы уверены, что хотите удалить заметку?',
          redirectToMain: true ,
          agreeBtnText: 'Удалить',
          target: ticket
      })
    },
    goBack() {
      if (this.mode === 'edit') {
        this.openModal({
          type: `Отмена внесенных изменений в ${this.beforeUpdateTicket.title}`,
          text: 'Вы уверены, что хотите отменить редактирование?',
          agreeBtnText: 'Да',
          target: this.beforeUpdateTicket  
        })
      } 
      else {
        this.editTodo = null
        this.editTodoIndex = ''
        this.$router.push('/')
      }
    },
    addTodoHandler() {
      this.todos.push({
        id: Date.now(),
        text: this.todoInputText,
        complete: false,
      })
      this.todoInputText = ''
    },
    onCheckHandler(todo, idx) { 
      const todoCopy = Object.assign({}, todo)    
      todoCopy.complete = !todoCopy.complete
      this.todos.splice(idx, 1, todoCopy)
    },
    onEditHandler(idx) {
      this.editTodo = {...this.todos.find( (todo, index) => index === idx)}
      this.todoInputText = this.editTodo.text
      this.editTodoIndex = idx
    },
    editCancelHandler() {
      this.editTodo = null
      this.todoInputText = ''
    },
    updateTodoHandler() {
      this.editTodo = {...this.editTodo, text: this.todoInputText}
      this.todoInputText = ''
      this.todos.splice(this.editTodoIndex, 1, this.editTodo)
      this.editTodo = null
      this.editTodoIndex = null
    },
    deleteHandler(idx) {
      this.todos.splice(idx, 1)
    }
  },
  mounted() {
    if (this.$route.path.includes('edit')) {
      this.mode = 'edit'
      const id = +this.$route.params.id
      const ticket = this.ticketById(id)
      this.ticketTitle = ticket.title
      this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [...ticket.todos]
      this.beforeUpdateTicket = {...ticket}
      this.status = this.beforeUpdateTicket.status
    }
  },
  updated() {

    if (this.$route.path.includes('edit')) {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  },
  beforeDestroy() {
    localStorage.removeItem('todos')
  },
}
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
  }
  .btn-undo-rendo-section {
    align-self: flex-end;
    margin-left: 40px;
    margin-bottom: 30px;
  }
  .btn-ticket {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-weight: 600;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 30px;
  font-size: 1em;
}
  .undo-redo {
    width: auto;
    padding-left: 5px;
    padding-right: 5px;
  }
  label {
    align-self: flex-start;
    margin-left: 45px;
  }
  h2 {
    margin-top: 30px;
  }
  input {
    border: none;
    outline-style: none;
  }
  .ticket-input {
    max-width: 600px;
    margin-left: 45px;
    
    border-bottom: 2px solid blueviolet; 
    height: 40px;
  }
  .todos-container {
    margin-left: 45px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .todo-view-container {
    display: flex;
  }
  .todo-input {
    border-bottom: 2px solid rgb(83, 83, 216);
    width: 500px;
    margin: 0;
    line-height: 40px;
  }
  .btn-container {
    display: flex;
  }
  .btn {
    border: none;
    outline: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: 10px;
  }
  .add-todo-btn {
    height: 40px;
    width: 40px;
    font-size: 28px;
    line-height: 40px;
    font-weight: 300;
    background-color: rgb(83, 83, 216);
    color: white;
  }
  .edit-cancel-btn {
    height: 40px;
    width: 40px;
    line-height: 40px;
    font-size: 28px;
    background-color: gray;
    color: black;
  }
  .todos-list {
    margin-top: 30px;
    list-style: none;
  }
  .todo-item-container {
    margin-top: 15px;
    display: flex;
  }
  .todo-item {
    width: 500px;
    margin-bottom: 15px;
    margin-left: 15px;
    border-bottom: 2px solid rgb(14, 184, 42);
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  input[type=checkbox] + label {
  display: block;
  margin: 0.2em;
  cursor: pointer;
  padding: 0.2em;
}

input[type=checkbox] {
  display: none;
}

input[type=checkbox] + label:before {
  content: "\2714";
  border: 0.1em solid #000;
  border-radius: 0.2em;
  display: inline-block;
  width: 1em;
  height: 1em;
  padding-left: 0.2em;
  padding-bottom: 0.3em;
  margin-right: 0.5em;
  vertical-align: middle;
  color: transparent;
  transition: .2s;
}

input[type=checkbox] + label:active:before {
  transform: scale(0);
}

input[type=checkbox]:checked + label:before {
  background-color: MediumSeaGreen;
  border-color: MediumSeaGreen;
  color: #fff;
}

input[type=checkbox]:disabled + label:before {
  transform: scale(1);
  border-color: #aaa;
}

input[type=checkbox]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #bfb;
  border-color: #bfb;
}

.btn-edit {
  background-color:rgb(14, 184, 42)
}  
.btn-delete {
  background-color: rgb(255, 30, 30);
  color: white;
}

.btn-ticket-section {
  justify-content: flex-start;
  margin-left: 50px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.to-create {
  color: white;
  background-color: rgb(31, 209, 46);
}
.btn-ticket-delete {
  color: white;
  background-color: rgb(238, 29, 29);
}
</style>