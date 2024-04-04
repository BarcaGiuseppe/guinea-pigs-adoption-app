// pages/index.tsx

import Head from "next/head";
import { Inter } from "next/font/google";
import { useDataByContext } from "@/ContextProvider";
import { useEffect, useState } from "react";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { User } from "@/declarations";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    cellulare: "",
    opzione: "",
  });

  const { userAdoptionList, isAdmin } = useDataByContext();

  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) router.push("/");
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickDelButton = (personId: User["id"]) => {
    //OCCORRE IMPLEMENTARE METODO BUSINESS LOGIC DELETE USER FROM USER LIST ADOPTION
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <>
        <div className="flex items-center justify-center h-screen">
          <div className="w-3/4 h-80vh border rounded flex flex-col justify-center">
            <ul role="list" className="divide-y divide-gray-100 p-5">
              {userAdoptionList?.map((person) => (
                <li key={person.id} className="py-5">
                  <div className="bg-gray-100 rounded-md p-4 flex justify-between items-center">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={
                        "https://www.svgrepo.com/show/170633/profile-user.svg"
                      }
                      alt=""
                    />
                    <div className="ml-4">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        NOME: {person.name} {person.lastname}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        EMAIL: {person.email}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        PHONE: {person.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        ID PIGS: {person.id_animal}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <button
                        className="mr-2"
                        onClick={() => handleClickDelButton(person.id)}
                      >
                        Del
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    </>
  );
}
