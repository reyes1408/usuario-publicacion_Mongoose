import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    
    nombre: String,
    email: String

});

export default mongoose.model('Usuario', usuarioSchema);
