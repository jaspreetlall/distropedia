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
    // Pass selectors in the query.
    // eg. /api/distro/x6s9erndv868er4kgre?select=name%20description for name and description
    case 'GET':
      try {
        const selectors = req.query.select;
        const { id } = req.query;

        const requestedDistro = await Distro
        .findOneById(id)
        .populate([
          { path: 'environmentList' },
          { path: 'baseList', select: 'name' }
        ])
        .select(selectors);
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