import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, GuineaPig, TContext } from "./declarations";
import axios from "axios";
import { resolve } from "path";

export const AppContext = createContext<TContext>({
  guineaList: [],
  userAdoptionList: [],
  isAdmin: false,
  loading: false,
  error: "",
  getGuineaPigById: (id: number) => {},
  getUserAdoptionList: () => {},
  loginAdmin: () => {},
  modifyPig: () => {},
  deletePig: () => {},
  sendFormAddPig: () => {},
  sendFormAdoption: () => {},
});

interface Props {
  children: ReactNode;
}

export const useDataByContext = () => useContext(AppContext); // custom hook

export function ContextProvider({ children }: Props) {
  const [guineaList, setGuineaList] = useState<TContext["guineaList"]>([]);
  const [userAdoptionList, setUserAdoptionList] = useState<
    TContext["userAdoptionList"]
  >([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getGuineaPigList();
    getUserAdoptionList();
    loadDataFromLocalStorage;
  }, []);

  const saveDataToLocalStorage = () => {
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  };

  const loadDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("isAdmin");
    if (savedData) {
      setIsAdmin(JSON.parse(savedData));
    }
    setIsAdmin(false);
  };

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

  const getGuineaPigById = async (idG: GuineaPig["id"]) => {
    try {
      const response = await axios.get("/api/hello", { params: { id: idG } });
      if (response.status === 200) {
        const guineaPig = response.data;
        console.log(guineaPig);
        return guineaPig;
      } else {
        console.error("Errore richiesta:", response.statusText);
        return undefined;
      }
    } catch (error) {
      return undefined;
    }
  }; // possiamo anche definire questo metodo nel getStaticProps  //F

  const getUserAdoptionList = async () => {
    //chiameremo questa funzione tramite getServerSideProps o getStaticProp
    try {
      const response = await axios.get("/api/hello", {
        params: { user: 1 },
      });
      if (response.status == 200) {
        const userList: Array<User> = response.data;
        setUserAdoptionList(userList);
      } else {
        console.error("errore richiesta", response.statusText);
      }
    } catch (error) {
      console.error("errore richiesta", error);
    }
  };

  const loginAdmin = () => {
    setIsAdmin(!isAdmin);
    saveDataToLocalStorage();
  };
  //funzione che aggiorna lo stato  del flag isAdmin
  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  const sendFormAddPig = async (
    //F
    nameU: User["name"],
    lastnameU: User["lastname"],
    emailU: User["email"],
    phoneU: User["phone"],
    name: GuineaPig["name"],
    kilos: GuineaPig["kilos"],
    age: GuineaPig["age"],
    url_img: GuineaPig["url_img"],
    breed: GuineaPig["breed"],
    description: GuineaPig["description"]
  ) => {
    try {
      //creo un oggettto con il dati del porcellino
      let newPig = {
        nameU: nameU,
        lastnameU: lastnameU,
        emailU: emailU,
        phoneU: phoneU,
        name: name,
        kilos: kilos,
        age: age,
        url_img: url_img,
        breed: breed,
        description: description,
      }; //invio i dati del porcellino in questione
      const response = await axios.post("/api/hello", {
        newPig,
      });
      //ricarico e aggiorno la lista ri-renderizzando i componentu
      if (response.status === 200) {
        await getGuineaPigList();
      } else {
        console.error("Errore richiesta:", response.statusText);
      }
    } catch (error) {}
  };

  const sendFormAdoption = async (
    //R
    user: User
  ) => {
    try {
      const response = await axios.post("/api/hello", {
        params: {
          adoption: 1,
        },
        data: user,
      });
      if (response.status === 200) {
        const formAdoption = response.data.name;
        console.log(formAdoption);
        const newUserAdoptionList = userAdoptionList
          ? [user, ...userAdoptionList]
          : [user];
        setUserAdoptionList(newUserAdoptionList);
      } else {
        console.error("Errore richiesta:", response.statusText);
      }
    } catch (error) {}
  };

  const deletePig = async (id: GuineaPig["id"]) => {
    try {
      const response = await axios.delete("/api/hello", {
        params: {
          id: id,
        },
      });
      if (response.status === 200) {
        const deleted_pig = response.data;
        console.log(deleted_pig);
        getGuineaPigList();
      } else {
        console.error("Errore richiesta:", response.statusText);
      }
    } catch (error) {}
  }; //R

  const modifyPig = async (guineaPig: GuineaPig) => {
    try {
      const response = await axios.put("/api/hello", {
        data: guineaPig,
      });
      if (response.status === 200) {
        const modified_pig = response.data;
        console.log(modified_pig);
        const newGuineaList = guineaList
          ? guineaList.map((pig: GuineaPig) => {
              if (guineaPig.id == pig.id) return guineaPig;
              return pig;
            })
          : null;
        setGuineaList(newGuineaList);
        // setGuineaList(modified_pig);
      } else {
        console.error("Errore richiesta:", response.statusText);
      }
    } catch (error) {}
  }; //R

  return (
    <AppContext.Provider
      value={{
        guineaList,
        userAdoptionList,
        isAdmin,
        loading,
        error,
        getGuineaPigById,
        getUserAdoptionList,
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
