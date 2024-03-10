const helloToUsers = async (_, res) => {
  return res.json({
    message: "Hello to users!",
  });
};

module.exports = {
  helloToUsers,
};
