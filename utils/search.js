export const buildSearchFilter = (search, fields) => {
  if (!search) {
    return {};
  }

  return {
    OR: fields.map((field) => ({
      [field]: {
        contains: search,
        mode: "insensitive",
      },
    })),
  };
};
