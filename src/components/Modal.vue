<template>
  <div class="modal-wrapper" v-show="showModal" @click.self="closeModal">
    <div class="modal">
      <div class="container">
        <h3 class="modal__title">{{ modalData.type }}</h3>
        <p>{{ modalData.text }}</p>
        <div class="btn-container">
          <button @click.prevent="agree(modalData.target)" class="btn">
            {{ modalData.agreeBtnText }}
          </button>
          <button @click.prevent="closeModal" class="btn btn-cansel">
            Отменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters(["showModal", "modalData"]),
  },
  methods: {
    ...mapMutations(["openModal", "closeModal", "deleteTicket"]),
    agree() {
      if (this.modalData.agreeBtnText === "Удалить") {
        this.$route.path !== '/' && this.$router.push('/')
        this.deleteTicket(this.modalData.target)
        this.closeModal()
      } else if (this.modalData.agreeBtnText === "Да") {
        this.closeModal()
        this.$router.push('/')
      }
    },
  },
};
</script>

<style scoped>
.modal-wrapper {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10001;
}
.modal {
  margin: auto;
  z-index: 10002;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  color: black;
  border-radius: 15px;
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 200px;
}
.container {
  padding: 20px;
}
.modal__title {
  margin: 10px 0;
}
.btn-container {
  margin-top: 30px;
}
.btn {
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
.btn-cansel {
  background-color: rgb(33, 197, 18);
  color: white;
}
</style>
