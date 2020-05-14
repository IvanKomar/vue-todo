export default {
  state: {
    tickets: [],
    undoTickets: [],
    rendoTickets: []
  },
  actions: {},
  mutations: {
    addNewTicket(state, newTicket) {
      state.tickets.push(newTicket)
    }, 
    updateTicket(state, updatedTicket) {
      state.undoTickets = state.undoTickets.filter(t => t.id !== updatedTicket.id)
      state.rendoTickets = state.rendoTickets.filter(t => t.id !== updatedTicket.id)
      const index = state.tickets.findIndex(ticket => ticket.id === updatedTicket.id)
      state.undoTickets.push({...state.tickets[index]})
      state.tickets.splice(index, 1, updatedTicket)
    },
    undoTicket(state, undodedTicket) {
      const index = state.tickets.findIndex(ticket => ticket.id === undodedTicket.id)
      if (state.rendoTickets.findIndex(t => t.id === undodedTicket.id) < 0) {
        state.rendoTickets.push({...state.tickets[index]})
      }
    },
    deleteTicket(state, ticket) {
      state.tickets = state.tickets.filter(t => t.id !== ticket.id)
      state.undoTickets = state.undoTickets.filter(t => t.id !== ticket.id)
      state.rendoTickets = state.rendoTickets.filter(t => t.id !== ticket.id)
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
    },
    undoTicketById: state => id => {
      return state.undoTickets.find( ticket => ticket.id === id)
    },
    rendoTicketById: state => id => {
      return state.rendoTickets.find(ticket => ticket.id === id) 
    }
  }
}