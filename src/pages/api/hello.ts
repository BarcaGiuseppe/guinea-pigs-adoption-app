// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../utils/db";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(req.method);
  // console.log(`process.env.: ${process.env.DB_HOST}`);
  return new Promise((reject, resolve) => {
    if (req.method === "GET") {
      db.query("SELECT * FROM contatti", (error, results: any) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ name: "Internal server error" });
        }
        return res.status(200).send(results);
      });
    } else {
      return res.status(405).json({ name: "Method Not Allowed" });
    }
  });
}
