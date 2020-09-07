exports.getBase = async (req, res, next) => {
  res.status(200).render("base", {
    title: "Example page",
  });
};

exports.getTest = async (req, res, next) => {
  res.status(200).render("test", {
    title: "Test page",
  });
};
