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
        <div className="flex flex-row justify-between items-start">
          {guineapig ? (
            <div className="max-w-3xl bg-white shadow-md overflow-hidden mt-8">
              <div className="flex flex-col md:flex-col justify-center items-center">
                <div className="md:w-3/4">
                  <img
                    className="w-full object-cover"
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
          <Form></Form>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
