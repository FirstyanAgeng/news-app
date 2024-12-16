import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    savedArticles: [],
  },
  reducers: {
    saveArticle: (state, action) => {
      state.savedArticles.push(action.payload);
    },
  },
});

// Export the action
export const { saveArticle } = articlesSlice.actions;

// Export the reducer
export default articlesSlice.reducer;
