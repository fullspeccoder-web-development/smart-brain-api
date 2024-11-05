const handleProfileGet = (db) => (req, res) => {
  const { userId } = req.params;
  db.select("*")
    .from("users")
    .where({
      id: userId,
    })
    .then((user) => {
      if (user.length < 1) {
        res.status(400).json("User not found");
      } else {
        res.json(user[0]);
      }
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleProfileGet,
};
