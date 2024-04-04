// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../utils/db";
import { error } from "console";

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
    //console.log("req.method" + req.method);
    switch (req.method) {
      case "GET": {
        /* get id of the animal in the list of guinea pigs and in the database  to API*/
        if (req.query.id) {
          const id_pig = req.query.id;
          console.log("id_pig" + id_pig);
          db.query(
            "SELECT * FROM guinea_list WHERE id = ?",
            [id_pig], //it's important cycle the animal's array
            (error, results: any) => {
              if (error) {
                console.error(error);
                return res.status(500).json({ name: "Internal server error" });
              }
              console.log("results:" + results);
              return res.status(200).send(results);
            }
          );
        } else if (req.query.user) {
          db.query(
            "SELECT * FROM user_adoption_list",
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
        // to add a new user who sent a new adoption
        if (req.query.adoption) {
          const { id_animal, name, lastname, email, phone } = req.body;
          db.query(
            "INSERT INTO user_adoption_list (id_animal, name, lastname, email, phone) VALUES (?,?,?,?,?)",
            [id_animal, name, lastname, email, phone],
            (error: any, results: any) => {
              if (error) {
                console.error(error);
                return res.status(500).json({ name: "Internal server error" });
              }
              return res.status(200).send({ name: results });
            }
          );
        }
        /* to add  a new dropped guinea pigs*/
        /* this is  DESTRACTURING */
        console.log("req.body" + req.body);
        const { id_animal, name, kilos, age, url_img, breed, description } =
          req.body;
        console.log(id_animal);
        const { nameU, lastnameU, emailU, phoneU } = req.body;
        /* get to the API the data o the guineas pigs dropped */
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
        //modify pig data by id
        const { id, name, kilos, age, url_img, breed, description } = req.body;
        console.log("id" + id);
        db.query(
          "UPDATE guinea_list SET name = ?, kilos = ?, age = ?, url_img = ?, breed = ?, description = ? WHERE id = ?",
          [name, kilos, age, url_img, breed, description, id],
          (error: any, results: any) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ name: "Internal server error" });
            }
            return res.status(200).send({ name: results });
          }
        );
      }
    }
  });
}
