export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      // If state is not present return undefined and let reducers initialize the state
      return undefined
    }
    // Try to parse JSON from state string
    return JSON.parse(serializedState);
  } catch (err) {
    // Play it safe and return undefined, to let reducers initialize the state
    return undefined
  }
}

export const saveState = (state) => {
  try {
    // Stringify state, general rule: state should be serializable
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // Ignore
  }
}
