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
    console.log("req.method" + req.method);
    switch (req.method) {
      case "GET": {
        /* get id of the animal in the list of guinea pigs and in the database  to API*/
        if (req.query.id) {
          const id_pig = req.query.id;
          db.query(
            "SELECT * FROM guinea_list WHERE id = ?",
            [id_pig], //it's important cycle the animal's array
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
        break;
      }
      case "POST": {
        /* to add  a new dropped guinea pigs*/
        /* this is  DESTRACTURING */
        console.log("req.body" + req.body);
        const { id_animal, name, kilos, age, url_img, breed, description } =
          req.body;
        console.log(id_animal);
        const { nameU, lastnameU, emailU, phoneU } = req.body;
        /* get to the API the data of the guineas pigs dropped */
        db.query(
          "INSERT INTO guinea_list (name,kilos,age,url_img,breed,description) VALUES (?,?,?,?,?,?)",
          [name, kilos, age, url_img, breed, description],
          (error: any, results: any) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ name: "Internal server error" });
            }
            //return res.status(200).send({ name: "pig correctly added" }); // qua toglie il return
          }
        );
        /* information of the user who drop a guinea pig */
        db.query(
          "INSERT INTO user_list (id_animal, nameU,lastnameU,emailU,phoneU) VALUES (?,?,?,?,?)",
          [id_animal, nameU, lastnameU, emailU, phoneU],
          (error: any, results: any) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ name: "Internal server error" });
            }
          }
        );
        return res.status(200).send({ name: "pig and user added" });
        break;
      }
      case "DELETE": {
        const id_pig = req.query.id;
        console.log(id_pig);
        if (id_pig) {
          db.query(
            "DELETE FROM user_list WHERE id_animal = ?",
            [id_pig],
            (error: any, results: any) => {
              if (error) {
                console.error(error);
                return res.status(500).json({ name: "Internal server error" });
              }
            }
          );
          db.query(
            "DELETE FROM guinea_list WHERE id = ?",
            [id_pig],
            (error: any, results: any) => {
              if (error) {
                console.error(error);
                return res.status(500).json({ name: "Internal server error" });
              }
            }
          );
          return res.status(200).send({ name: "pig and user deleted" });
        }
        break;
      }
      case "PUT": {
      }
    }
  });
}
