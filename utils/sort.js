export const buildOrderBy = (sortBy, sortOrder) => {
  return {
    [sortBy]: sortOrder,
  };
};
