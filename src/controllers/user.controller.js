
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {

    const { nombre, email } = req.body;

    try {

        const newUser = new User ({
            nombre,
            email
        });

        const userSaved = await newUser.save();

        res.json({
            nombre: userSaved.nombre,
            email: userSaved.email,
        })

    } catch (error) {
        console.error(error);
    }

};

export const updateUser = async (req, res) => {

    const idUser = req.params.id;
    const newData = req.body;

    try {
        const usuario = await User.findByIdAndUpdate(idUser, newData, { new: true });

        if (usuario) {
            console.log("Usuario actualizado: ", usuario);
            res.status(200).json({ message: "Usuario actualizado correctamente", usuario });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar", error);
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
}

export const deleteUser = async (req, res) => {

    const id = req.params.id;

    try {
        const usuarioDeleted = await User.findByIdAndDelete(id);

        if (usuarioDeleted) {
            console.log("Usuario eliminado", usuarioDeleted);
            res.status(200).json({ message: "Usuario eliminado correctamente", usuarioDeleted });
        } else {
            console.log("No se encontró un usuario con este ID");
            res.status(404).json({ message: "No se encontró un usuario con este ID" });
        }
    } catch (error) {
        console.log("Error al intentar eliminar al usuario ", error);
        res.status(500).json({ message: "Error al intentar eliminar al usuario" });
    }
};

export const findUser = async (req, res) => {

    const id = req.params.id;

    try {

        const userFound =  await User.findById(id);

        if (userFound) {
            console.log("Usuario encontrado: ", userFound);
            res.status(200).json({mensaje: "Usuario encontrado: ", userFound});
        } else {
            console.log("Usuario no encontrado");
            res.status(404).json({mensaje: "Usuario no encontrado"});            
        }
        
    } catch (error) {
        console.log("Error al intentar buscar al usuario ", error);
        res.status(500).json({ message: "Error al intentar buscar al usuario" });
    }
};
