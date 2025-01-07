const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE": {
      return state.concat(action.payload);
    }
    case "TOGGLE_IMPORTANCE": {
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, important: !note.important }
          : note
      );
    }
    default: {
      return state;
    }
  }
};

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content: content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id },
  };
};

export default noteReducer;
