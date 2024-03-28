import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, GuineaPig, TContext } from "./declarations";
import axios from "axios";

export const AppContext = createContext<TContext>({
  guineaList: [],
  userAdoptionList: [],
  isLogged: false,
  loading: false,
  error: "",
  getGuineaPigById: (id: number) => {},
  loginAdmin: () => {},
  modifyPig: () => {},
  deletePig: () => {},
  sendFormAddPig: () => {},
  sendFormAdoption: () => {},
});

interface Props {
  children: ReactNode;
}

export const useDataByContext = () => useContext(AppContext);

export function ContextProvider({ children }: Props) {
  const [guineaList, setGuineaList] = useState<TContext["guineaList"]>([]);
  const [userAdoptionList, setUserAdoptionList] = useState<
    TContext["userAdoptionList"]
  >([]);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getGuineaPigList();
  }, []);

  const getGuineaPigList = async () => {
    try {
      const response = await axios.get("/api/hello");
      if (response.status === 200) {
        const piglist = response.data;
        console.log(piglist);
        setGuineaList(piglist);
      } else {
        console.error("Errore richiesta:", response.statusText);
      }
    } catch (error) {}
  };

  const getGuineaPigById = (id: GuineaPig["id"]): GuineaPig | undefined => {
    return {} as GuineaPig;
  }; // possiamo anche definire questo metodo nel getStaticProps  //F

  const getUserAdoptionList = () => {};

  const loginAdmin = () => {
    //F
    //setIsLogged(true)
  };

  const sendFormAddPig = (
    //F
    nameU: User["nameU"],
    lastnameU: User["lastnameU"],
    emailU: User["emailU"],
    phoneU: User["phoneU"],
    name: GuineaPig["name"],
    kilos: GuineaPig["kilos"],
    age: GuineaPig["age"],
    url_img: GuineaPig["url_img"],
    breed: GuineaPig["breed"],
    description: GuineaPig["description"]
  ) => {};

  const sendFormAdoption = (
    //R
    id_animal: GuineaPig["id"],
    nameU: User["nameU"],
    lastnameU: User["lastnameU"],
    emailU: User["emailU"],
    phoneU: User["phoneU"]
  ) => {};

  const deletePig = (id: GuineaPig["id"]) => {}; //R

  const modifyPig = (guineaPig: GuineaPig) => {}; //R

  return (
    <AppContext.Provider
      value={{
        guineaList,
        userAdoptionList,
        isLogged,
        loading,
        error,
        getGuineaPigById,
        loginAdmin,
        modifyPig,
        deletePig,
        sendFormAddPig,
        sendFormAdoption,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
