import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O campo TÍTULO é obrigatório."]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'autores', 
      required: [true, "O campo AUTOR é obrigatório."],
      autopopulate: { select: "nome" }
    },
    editora: {
      type: String, 
      required: [true, "O campo EDITORA é obrigatório."],
      enum: {
        values: ["Saraiva", "Moderna", "Ática", "Scipione", "FTD", "Outra", "Intrinseca"],
        message: "Editora {VALUE} inválida para o campo EDITORA."
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O campo NÚMERO DE PÁGINAS deve ser maior ou igual a 10 e menor ou igual a 5000. Valor fornecido: {VALUE}"
    }
    }
  }
);
livroSchema.plugin(autopopulate);
const livros= mongoose.model('livros', livroSchema);

export default livros;