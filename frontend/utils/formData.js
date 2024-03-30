import mime from "mime";


export const setImageUpload = async (images) => {
    const formattedImages = images.map(image => {
        const newImageUri = "file:///" + image.split("file:/").join("");
        return {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        };
    });
    console.log(formattedImages)
    return formattedImages
}

export const setFormData = async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            for (let i in value) {
                formData.append(key, value[i]);
            }
        } else {
            formData.append(key, value);
        }
    })
    return formData
}