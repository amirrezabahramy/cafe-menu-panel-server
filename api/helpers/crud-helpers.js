const { StatusCodes } = require("http-status-codes");

const getAllFromCollection = (Collection) => async (req, res) => {
  try {
    const items = await Collection.find(req.query);
    res.status(StatusCodes.OK).json(items);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const addToCollection = (Collection) => async (req, res) => {
  try {
    const item = new Collection(req.body);
    await item.save();
    res.status(StatusCodes.CREATED).json(item);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getFromCollection = (Collection) => async (req, res) => {
  try {
    const item = await Collection.findById(req.params.id);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const updateFromCollection = (Collection) => async (req, res) => {
  try {
    const item = await Collection.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const removeFromCollection = (Collection) => async (req, res) => {
  try {
    const item = await Collection.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(StatusCodes.ACCEPTED).json(item);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
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
