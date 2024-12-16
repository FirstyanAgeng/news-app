export const saveArticle = (article) => {
  return {
    type: "SAVE_ARTICLE",
    payload: article,
  };
};
