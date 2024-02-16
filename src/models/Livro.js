import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória."],
      enum: {
        values: ["Casa do código", "Classicos", "Famosa"],
        message: "A editora ${VALUE} não é um valor permitido.",
      },
    },
    preco: { type: Number },
    paginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message:
          "O número de páginas de estar entre 10 e 5000. Valor fornecido: {VALUE}",
      },
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O(a) autor(a) é obrigatório."],
      autopopulate: { select: "nome" },
    },
  },
  { versionKey: false }
);

livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;
