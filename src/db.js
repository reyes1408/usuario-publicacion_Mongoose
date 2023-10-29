import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/usuario-publicacion');
        console.log('>>> DB esta conectada.');    
    
    } catch (error) {
       console.log(error);
    }
}
