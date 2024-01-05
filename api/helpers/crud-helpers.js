const getAllFromCollection = (Collection) => async (req, res) => {
  try {
    const items = await Collection.find(req.query);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addToCollection = (Collection) => async (req, res) => {
  try {
    const item = new Collection(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFromCollection = (Collection) => async (req, res) => {
  try {
    const item = await Collection.findById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateFromCollection = (Collection) => async (req, res) => {
  try {
    const item = await Collection.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const removeFromCollection = (Collection) => async (req, res) => {
  try {
    const item = await Collection.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(202).json(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const collectionFunctions = (Collection) => ({
  getAll: getAllFromCollection(Collection),
  add: addToCollection(Collection),
  get: getFromCollection(Collection),
  update: updateFromCollection(Collection),
  remove: removeFromCollection(Collection),
});

module.exports = collectionFunctions;
