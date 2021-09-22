import dbConnect from '../../../lib/dbConnect';
const Distro = require('../../../models/Distro');
const Environment = require('../../../models/Environment');

export default async function handler(req, res) {
  const { method } = req;

  // Connecting to MongoDB
  await dbConnect();

  switch (method) {
    // GET Route
    // Returns success and one distro based on ID provided
    // or random distro if ID is 'random'
    // Pass selectors in the query.
    // eg. /api/distro/x6s9erndv868er4kgre?select=name%20description for name and description
    case 'GET':
      try {
        const selectors = req.query.select;
        const { id } = req.query;
        let requestedDistro;
        // Random Distro
        if (id == "random") {
          // Number of estimated number of distros
          const totalDistros = await Distro.estimatedDocumentCount();
          // Random number
          const randomNumber = Math.floor(Math.random() * totalDistros);
          requestedDistro = await Distro
          .findOne()
          .skip(randomNumber) // Skipping random number of documents
          .populate([
            { path: 'environmentList' },
            { path: 'baseList', select: 'name' }
          ])
          .select(selectors);
        } 
        // Distro based on ID
        else {
          requestedDistro = await Distro
          .findById(id)
          .populate([
            { path: 'environmentList' },
            { path: 'baseList', select: 'name' }
          ])
          .select(selectors);
        }
        res.status(200).json({ success: true, data: requestedDistro });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break
  }
}