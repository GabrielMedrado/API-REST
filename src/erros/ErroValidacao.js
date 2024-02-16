import RequisicicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicicaoIncorreta {
  constructor(erro) {
    const mensagensErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados : ${mensagensErro}`);
  }
}

export default ErroValidacao;
