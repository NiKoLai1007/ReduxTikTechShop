const path = 'public/uploads/'

const uploadSingle = async ({ imageFile, request }) => {

    const basePath = `${request.protocol}://${request.get('host')}/${path}`;
    return `${basePath}${image.filename}`

}

const uploadMultiple = async ({ imageFiles, request }) => {
    const basePath = `${request.protocol}://${request.get('host')}/${path}`;

    const images = imageFiles.map(image => {
        return `${basePath}${image.filename}`
    })

    return images   
}

module.exports = {
    uploadMultiple,
    uploadSingle
}