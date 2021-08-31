// const dbConnect = require('../../../lib/dbConnect');
import dbConnect from '../../../lib/dbConnect';
const Distro = require('../../../models/Distro');

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const distros = await Distro.find({});
        res.status(200).json({ success: true, data: distros });
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}