import dbConnect from '../../../lib/dbConnect';
const Environment = require('../../../models/Environment');

export default async function handler(req, res) {
  const { method } = req;

  // Connecting to MongoDB
  await dbConnect();

  switch (method) {
    // GET Route
    // Returns success and the list of all the environments
    case 'GET':
      try {
        const environmentList = await Environment
        .find({})
        .sort({'nameLowerCase': 1})
        res.status(200).json({ success: true, data: environmentList });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    
    // POST Route
    // Returns success and the newly added environment object
    case 'POST':
      try {
        const { name } = req.body;
        const newEnvironment = await new Environment({ name })
        newEnvironment.save();
        res.status(201).json({ success: true, data: newEnvironment });
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