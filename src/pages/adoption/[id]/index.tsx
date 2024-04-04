import { useEffect, useState } from "react";
import Form from "@/components/Form";
import axios from "axios";
import { useDataByContext } from "@/ContextProvider";
import { useRouter } from "next/router";
import { GuineaPig } from "@/declarations";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    cellulare: "",
    opzione: "",
  });
  const [guineapig, setGuineapig] = useState<GuineaPig>();
  const { getGuineaPigById } = useDataByContext();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const callApi = async () => {
      console.log(id);
      const res = await getGuineaPigById(Number(id));
      console.log(res);
      if (res) {
        console.log("ciao");
        setGuineapig(res[0]);
        console.log(guineapig);
      }
      console.log(guineapig);
    };
    callApi();
  }, [id]);

  console.log(guineapig);

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
      {guineapig ? (
        <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={guineapig.url_img}
                alt={guineapig.name}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {guineapig.breed}
              </div>
              <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                {guineapig.name}
              </h2>
              <p className="mt-2 text-gray-500">{guineapig.description}</p>
              <div className="mt-4">
                <p className="text-gray-600">Age: {guineapig.age}</p>
                <p className="text-gray-600">Kilos: {guineapig.kilos}</p>
                <p className="text-gray-600">Breed: {guineapig.breed}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
      <Form></Form>
    </>
  );
}
