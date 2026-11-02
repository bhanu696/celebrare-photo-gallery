export default function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      const isFavorite = state.includes(action.payload);

      if (isFavorite) {
        return state.filter((id) => id !== action.payload);
      }

      return [...state, action.payload];
    }

    default:
      return state;
  }
}