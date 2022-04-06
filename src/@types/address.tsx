export type Address = {
  id: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: {
    id: number;
    name: string;
    cep: string;
    state: {
      id: string;
      uf: string;
    };
  };
};
