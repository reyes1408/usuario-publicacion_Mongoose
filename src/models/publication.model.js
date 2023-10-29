import mongoose from 'mongoose';

const publicacionSchema = new mongoose.Schema({
    
    titulo: String,
    contenido: String,
    fechaCreacion: Date,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

export default mongoose.model('Publicacion', publicacionSchema);