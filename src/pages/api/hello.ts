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
    switch (req.method) {
      case "GET": {
        /* get id of the animal in the list of guinea pigs and in the database  to API*/
        if (req.query.id) {
          const productId = req.query.id;
          db.query(
            "SELECT * FROM guinea_list WHERE id = ?",
            [productId], //it's important cycle the animal's array
            (error, results: any) => {
              if (error) {
                console.error(error);
                return res.status(500).json({ name: "Internal server error" });
              }
              return res.status(200).send(results);
            }
          );
        } else {
          /* get the entire list  of guinea-pigs*/
          db.query("SELECT * FROM guinea_list", (error, results: any) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ name: "Internal server error" });
            }
            return res.status(200).send(results);
          });
        }
      }
      case "POST": {
        /* to add  a new dropped guinea pigs*/
        const { name, kilos, age, url_img, breed, description } = req.body;

        db.query(
          "INSERT INTO guinea_list (name,kilos,age,url_img,breed,description) VALUES (?,?,?,?,?,?)",
          [name, kilos, age, url_img, breed, description],

          (error: any, results: any) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ name: "Internal server error" });
            }
            return res.status(200).send(results);
          }
        );
      }
    }
  });
}
