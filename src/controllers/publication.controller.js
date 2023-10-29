import Publication from "../models/publication.model.js"
import User from "../models/user.model.js";

export const registerPublication = async (req, res) => {

    /*
    Formato de JSON que espera en el body.
    El id del usuario se pasa por medio del params y la fecha se crea automatico.

    {
        "titulo": "Título de la publicación",
        "contenido": "Contenido de la publicación"
    }
    */

    const idUser = req.params.id;

    try {

        const userFound = await User.findById(idUser);

        if (userFound) {

            const { titulo, contenido } = req.body;

            try {

                const newPublication = new Publication({
                    titulo,
                    contenido,
                    fechaCreacion: new Date(),
                    usuario: idUser
                });

                const publicationSaved = await newPublication.save();

                res.json({
                    titulo: publicationSaved.titulo,
                    contenido: publicationSaved.contenido,
                    fechaCreacion: publicationSaved.fechaCreacion,
                    usuario: publicationSaved.idUser,
                })

            } catch (error) {
                console.error(error);
            }

        } else {
            res.status(404).json({ mensaje: "Error al crear la publicación, usuario invalido" });
        }

    } catch (error) {
        console.log("Error al intentar crear la publicación ", error);
        res.status(500).json({ message: "Error al intentar buscar al usuario" });
    }

}

export const updatePublication = async (req, res) => {

    const idPublication = req.params.id;
    const newData = req.body;

    try {
        const publication = await Publication.findByIdAndUpdate(idPublication, newData, { new: true });

        if (publication) {
            console.log("Publicación actualizada: ", publication);
            res.status(200).json({ message: "Publicación actualizada correctamente", publicacion: publication });
        } else {
            res.status(404).json({ message: "Publicación no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar", error);
        res.status(500).json({ message: "Error al actualizar." });
    }
}

export const deletePublication = async (req, res) => {

    const idPublication = req.params.id;

    try {
        const publicationDeleted = await Publication.findByIdAndDelete(idPublication);

        if (publicationDeleted) {
            console.log("Publicación eliminada", publicationDeleted);
            res.status(200).json({ message: "Publicación eliminada correctamente", publicationDeleted });
        } else {
            console.log("No se encontró una publicación con este ID");
            res.status(404).json({ message: "No se encontró una publicación con este ID" });
        }
    } catch (error) {
        console.log("Error al intentar eliminar la publicación ", error);
        res.status(500).json({ message: "Error al intentar eliminar la publicacion" });
    }
};

export const findPublication = async (req, res) => {

    const idPublication = req.params.id;

    try {

        const publicationFound =  await Publication.findById(idPublication);

        if (publicationFound) {
            console.log("Publicación encontrada: ", publicationFound);
            res.status(200).json({mensaje: "Publicación encontrada: ", publicationFound});
        } else {
            console.log("Publicación no encontrada");
            res.status(404).json({mensaje: "Publicación no encontrada"});            
        }
        
    } catch (error) {
        console.log("Error al intentar buscar la publicacion", error);
        res.status(500).json({ message: "Error al intentar buscar la publicacion" });
    }
};
