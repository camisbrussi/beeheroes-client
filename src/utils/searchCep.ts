import axios from "axios";

export type Address = {
  street?: string;
  district?: string;
  city?: string;
};

export async function searchCep(value) {
  const address: Address = {};

  var cep = value.replace(/\D/g, "");
  if (cep !== "") {
    var validacep = /^[0-9]{8}$/;
    if (validacep.test(cep)) {
      const response = await axios.get(
        "https://viacep.com.br/ws/" + cep + "/json/"
      );

      if (response) {
        address.street = response.data.logradouro;
        address.district = response.data.bairro;
        address.city = response.data.localidade;
      } else {
        return {};
      }
    } else {
      alert("Formato de CEP inválido.");
    }
  }
  return address;
}
