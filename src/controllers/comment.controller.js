import Comment from "../models/comment.model.js"

export const registerComment = async (req, res) => {
    /*
        Formato de JSON que espera en el body.
        La fecha se genera automatico. 
        {
            "contenido": "Contenido del comentario",
            "publicacion": "ID_de_la_publicacion_asociada",
            "usuario": "ID_del_usuario_asociado"
        }
    */

    const { contenido, publicacion, usuario } = req.body;

    try {

        const newComment = new Comment({
            contenido,
            fechaCreacion: new Date(),
            publicacion,
            usuario
        });

        const commentSaved = await newComment.save();

        res.json({
            contenido: commentSaved.contenido,
            fechaCreacion: commentSaved.fechaCreacion,
            publicacion: commentSaved.publicacion,
            usuario: commentSaved.usuario,
        })

    } catch (error) {
        console.error(error);
    }

}   

export const updateComment = async (req, res) => {

    const idComment = req.params.id;
    const newData = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(idComment, newData, { new: true });

        if (comment) {
            console.log("Comentario actualizado: ", comment);
            res.status(200).json({ message: "Comentario actualizado correctamente", comment: comment });
        } else {
            res.status(404).json({ message: "Comentario no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar", error);
        res.status(500).json({ message: "Error al actualizar." });
    }
}

export const deleteComment = async (req, res) => {

    const idComment = req.params.id;

    try {
        const commentDeleted = await Comment.findByIdAndDelete(idComment);

        if (commentDeleted) {
            console.log("Comentario eliminado", commentDeleted);
            res.status(200).json({ message: "Comentario eliminado correctamente", commentDeleted: commentDeleted });
        } else {
            console.log("No se encontró un comentario con este ID");
            res.status(404).json({ message: "No se encontró un comentario con este ID" });
        }
    } catch (error) {
        console.log("Error al intentar eliminar el comentario", error);
        res.status(500).json({ message: "Error al intentar eliminar el comentario" });
    }
};

export const findComment = async (req, res) => {

    const idComment = req.params.id;

    try {

        const commentFound =  await Comment.findById(idComment);

        if (commentFound) {
            console.log("Comentario encontrado: ", commentFound);
            res.status(200).json({mensaje: "Comentario encontrado: ", commentFound: commentFound});
        } else {
            console.log("Comentario no encontrado");
            res.status(404).json({mensaje: "Comentario no encontrado"});            
        }
        
    } catch (error) {
        console.log("Error al intentar buscar el comentario", error);
        res.status(500).json({ message: "Error al intentar buscar el comentario" });
    }
};
