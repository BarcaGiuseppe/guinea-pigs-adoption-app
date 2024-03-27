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
  nameU: string;
  lastnameU: string;
  emailU: string;
  phoneU: string;
}

export interface TContext {
  guineaList: Array<GuineaPig> | null;
  userAdoptionList: Array<User> | null;
  isLogged: boolean;
  loading: boolean;
  error: string;
  getGuineaPigById: (id: GuineaPig["id"]) => GuineaPig | void;
  loginAdmin: () => void;
  modifyPig: (guineaPig: GuineaPig) => void;
  deletePig: (id: GuineaPig["id"]) => void;
  sendFormAdoption: (
    id_animal: GuineaPig["id"],
    nameU: User["nameU"],
    lastnameU: User["lastnameU"],
    emailU: User["emailU"],
    phoneU: User["phoneU"]
  ) => void;
  sendFormAddPig: (
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
  ) => void;
}
