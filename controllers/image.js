const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db.select("*")
    .from("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      if (entries.length < 1) {
        res.status(404).json("Entries were not found for user");
      } else {
        res.send(entries[0].entries);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export default handleImage;
