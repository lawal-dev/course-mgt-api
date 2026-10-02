export const getPagination = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
  };
};

export const getPaginationMeta = (page, limit, total) => {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};