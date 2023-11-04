import dbConnect from "../../../util/mongo";
// import Product from "../../../models/Product";
import Product1 from "../../../models/Product1";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token

  await dbConnect();

  if (method === "GET") {
    try {
      const products1 = await Product1.find();
      res.status(200).json(products1);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    try {
      const product1 = await Product1.create(req.body);
      res.status(201).json(product1);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}