export interface GuineaPig {
  id: number;
  name: string;
  kilos: string;
  age: number;
  url_img: string;
  breed: string;
  description: string;
}

export interface User {
  id?: number;
  id_animal?: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface TContext {
  guineaList: Array<GuineaPig> | null;
  userAdoptionList: Array<User> | null;
  isAdmin: boolean;
  loading: boolean;
  error: string;
  getGuineaPigById: (id: GuineaPig["id"]) => GuineaPig | void;
  getUserAdoptionList: () => void;
  loginAdmin: () => void;
  modifyPig: (guineaPig: GuineaPig) => void;
  deletePig: (id: GuineaPig["id"]) => void;
  sendFormAdoption: (user: User) => void;
  sendFormAddPig: (
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
  ) => void;
}
