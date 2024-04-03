import Head from "next/head";
import { Inter } from "next/font/google";
import { useDataByContext } from "@/ContextProvider";
import { useState } from "react";
import Form from "@/components/Form";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { guineaList } = useDataByContext(); //custom hook per estrarre i value passati tramite il provider del context
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    cellulare: "",
    opzione: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Head>
        <title>Guinea Pigs Adoption</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <ul>
          {guineaList?.map((elem) => (
            <li>{elem.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cognome">Cognome:</label>
            <input
              type="text"
              id="cognome"
              name="cognome"
              value={formData.cognome}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cellulare">Cellulare:</label>
            <input
              type="tel"
              id="cellulare"
              name="cellulare"
              value={formData.cellulare}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="opzione">Opzione:</label>
            <select
              id="opzione"
              name="opzione"
              value={formData.opzione}
              onChange={handleChange}
            >
              <option value="">
                Hai mai avuto un porcellino d'india come amico?
              </option>
              <option value="opzione1">Si</option>
              <option value="opzione2">No</option>
            </select>
          </div>
          <button type="submit">Invia richiesta</button>
        </form>
        <style jsx>{`
          header {
            background-color: #f0f0f0;
            padding: 10px;
          }

          nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
          }

          nav ul li {
            display: inline;
            margin-right: 10px;
          }

          footer {
            background-color: #333;
            color: white;
            padding: 10px;
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
          }

          .richiedi-button {
            display: block;
            margin: 0 auto;
            margin-bottom: 20px; /* Aggiunto margine inferiore per spaziare il pulsante dal footer */
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        `}</style>
      </div>
      <Form></Form>
    </>
  );
}
