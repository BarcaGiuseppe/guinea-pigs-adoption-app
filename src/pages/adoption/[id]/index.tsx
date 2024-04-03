import { useState } from "react";
import Form from "@/components/Form";

export default function ContactForm() {
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
      <Form></Form>
    </>
  );
}
