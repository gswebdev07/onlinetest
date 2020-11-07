// FUNCTIONS are efficient way to reduce
// code scale and avoid self repeating.

// Model:
const FAQ = require("../models/FAQ");

exports.get_faqs = (res) => {
  FAQ.find()
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(400).json({ error: err.code }));
};

exports.post_faq = (res, faq) => {
  const new_faq = new FAQ({ ...faq });
  new_faq
    .save()
    .then((result) => res.status(201).json({ data: result }))
    .catch((err) => res.status(500).json({ error: err.code }));
};

exports.delete_faq = (res, id) => {
  FAQ.findByIdAndDelete(id)
    .then((result) =>
      res.status(202).json({ message: `FAQ with ${id} id was deleted.` })
    )
    .catch((err) => res.status(500).json({ error: err.code }));
};
