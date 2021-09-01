import dbConnect from '../../../lib/dbConnect';
const Distro = require('../../../models/Distro');
const Environment = require('../../../models/Environment');

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const distros = await Distro
        .find({})
        .populate(
          [
            { path: 'environment' },
            { path: 'baseList', select: 'name' }
          ]
        )
        res.status(200).json({ success: true, data: distros });
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      try {
        res.status(201).json({ success: true, data: "hello world" });
      }
      catch (error) {
        res.status(400).json({ success: false })
      }
    default:
      res.status(400).json({ success: false })
      break
  }
}