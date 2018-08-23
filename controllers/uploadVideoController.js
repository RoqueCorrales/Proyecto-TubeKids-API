
/**
 * Sube un archivo en formato video.
 * @method uploadFile
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return codigo mas mensaje 
 */
function uploadFile(req, res){
	var videoId = req.params.id;
	var file_name = 'No subido';

	if (req.files) {
		
        var file_path = req.files.file.path; //fichero el cual va a subir
        var file_split = file_path.split('\/'); //recortar para obtener el nombre de la imagen
        var file_name = file_split[2]; //se recoje el campo 3 del arreglo, porque ahi se encuentra el nombre de la imagen

        var ext_split = file_name.split('\.'); //se recorta para obtner la extencion del archivo
        var file_ext = ext_split[1]; //se recoje el campo 2. porque ahi esta la extencion despues del split

		if (file_ext == 'mp4' || file_ext == 'avi' || file_ext == 'm4v') {

            
        Video.findByIdAndUpdate(videoId, {file: file_name}, (err, videoUpdated)=>{
   			if (!videoUpdated) {
				res.status(404).send({message: 'No se ha podido actualizar el video'});
    		}else{
				res.status(200).send({video: videoUpdated});
			}
				
			});

		}else{
           res.status(200).send({message: 'Extension del archivo no valida'});
           
		}

	}else{
		res.status(200).send({message: 'No has subido ningun video '});
	}

}