import dbConnect from "../../../util/mongo";
// import Product from "../../../models/Product";
import Product2 from "../../../models/Product2";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies
  } = req;
  const token = cookies.token

  await dbConnect();

  if (method === "GET") {
    try {
      const product2 = await Product2.findById(id);
      res.status(200).json(product2);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    try {
      const product2 = await Product2.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product2);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    try {
      await Product2.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}