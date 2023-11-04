import dbConnect from "../../../util/mongo";
// import Product from "../../../models/Product";
import Product2 from "../../../models/Product2";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token

  await dbConnect();

  if (method === "GET") {
    try {
      const products2 = await Product2.find();
      res.status(200).json(products2);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    try {
      const product2 = await Product2.create(req.body);
      res.status(201).json(product2);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}