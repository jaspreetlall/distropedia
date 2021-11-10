import dbConnect from '../../../lib/dbConnect';
const mongoose = require('mongoose');
const Distro = require('../../../models/Distro');
const Environment = require('../../../models/Environment');

export default async function handler(req, res) {
  const { method } = req;

  // Connecting to MongoDB
  await dbConnect();

  switch (method) {
    // GET Route
    // Returns success and the list of all the distros
    // Pass selectors in the query.
    // eg. /api/distro?select=name%20description for name and description
    case 'GET':
      try {
        const selectors = req.query.select;
        const distroList = await Distro
        .find({})
        .sort({'nameLowerCase': 1})
        .populate([
          { path: 'environmentList' },
          { path: 'baseList', select: 'name' }
        ])
        .select(selectors)
        res.status(200).json({ success: true, data: distroList });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    
    // POST Route
    // Returns success and the newly added distro object
    // Pass valid environment & base IDs
    // homepage, download, logo urls to be sent as
    // url: { homepage: "www.somewebsite.com", download: "www.somewebsite.com/download" ... }
    case 'POST':
      try {
        const {
          name, 
          description,
          baseList,
          origin,
          architectureList,
          environmentList,
          status,
          url
        } = req.body;
        // Function to convert an object ID string to mongoose object ID
        const convertToObjectId = (objString) => mongoose.Types.ObjectId(objString);
        let baseListAsObjectIds = Array.from(baseList, (element) => convertToObjectId(element));
        let environmentListAsObjectIds = Array.from(environmentList, (element) => convertToObjectId(element));

        const newDistro = await new Distro({
          name,
          description,
          baseList: baseListAsObjectIds,
          environmentList: environmentListAsObjectIds,
          origin,
          architectureList,
          status,
          url
        })

        newDistro.save();
        res.status(201).json({ success: true, data: newDistro });
      }
      catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break
  }
}