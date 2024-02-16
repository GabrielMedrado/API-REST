import NaoEncontrado from "../erros/naoEnrontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorId = await autores.findById(id);
      const autorEncontrado = autorId;

      if (autorId !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autores.findByIdAndUpdate(id, req.body);

      if (autorEncontrado !== null) {
        res.status(200).json({ message: "autor atualizado" });
      } else {
        next(new NaoEncontrado("Id não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorId = await autores.findByIdAndDelete(id);

      if (autorId !== null) {
        res.status(200).json({ message: "autor excluído com sucesso" });
      } else {
        next(new NaoEncontrado("Id não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;
