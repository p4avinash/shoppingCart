import CartItem from "./CartItem"

const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] }
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    }
  }

  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 }
      }
      return item
    })
    return { ...state, cart: tempCart }
  }

  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 }
        }
        return item
      })
      .filter((cartItem) => cartItem.amount !== 0)

    return { ...state, cart: tempCart }
  }

  if (action.type === "GET_TOTAL") {
    let { total, amount } = state.cart.reduce(
      (acc, item) => {
        const { amount, price } = item
        const totalPrice = price * amount

        acc.amount += totalPrice
        acc.total += amount
        return acc
      },
      { total: 0, amount: 0 }
    )

    amount = parseFloat(amount).toFixed(2)

    return { ...state, total, amount }
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true }
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false }
  }

  return state
}

export default reducer
