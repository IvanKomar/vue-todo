export default {
  state: {
    tickets: [],
    ticketBeforeUpdate: null
  },
  actions: {
    // updatedTicketAction({commit, getters}, id) {
    //   commit()
    // }
  },
  mutations: {
    addNewTicket(state, newTicket) {
      state.tickets.push(newTicket)
    }, 
    updateTicket(state, updatedTicket) {
      const index = state.tickets.findIndex(ticket => ticket.id === updatedTicket.id)
      state.tickets.splice(index, 1, updatedTicket)
    },
    deleteTicket(state, ticket) {
      state.tickets = state.tickets.filter(t => t.id !== ticket.id)
    },
  },
  getters: {
    allTickets: state => {
      return state.tickets.map(ticket => {
        const filteredTodos = ticket.todos.reduce((acc, item) => {
          if (!item.complete && acc.length < 3) {
            acc.push(item)
          }
          return acc
        }, [])
        return {...ticket, todos: filteredTodos}
       })
    },
    ticketById: state => id => {
      return state.tickets.find( ticket => ticket.id  === id)
    }
  }
}