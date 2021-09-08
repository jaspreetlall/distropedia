import dbConnect from '../../../lib/dbConnect';
const Distro = require('../../../models/Distro');
const Environment = require('../../../models/Environment');

export default async function handler(req, res) {
  const { method } = req;

  // Connecting to MongoDB
  await dbConnect();

  switch (method) {
    // GET Route
    // Returns success and one random distro
    // Pass selectors in the query.
    // eg. /api/distro/random?select=name%20description for name and description
    case 'GET':
      try {
        const selectors = req.query.select;
        const totalDistros = await Distro.estimatedDocumentCount();
        const randomNumber = Math.floor(Math.random() * totalDistros);
        const randomDistro = await Distro
        .findOne()
        .skip(randomNumber)
        .populate([
          { path: 'environmentList' },
          { path: 'baseList', select: 'name' }
        ])
        .select(selectors);
        res.status(200).json({ success: true, data: randomDistro });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break
  }
}