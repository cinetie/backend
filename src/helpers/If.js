const checker = (success, error) => {
  if (success) {
    return success;
  }
  return error;
};

export default { checker };
