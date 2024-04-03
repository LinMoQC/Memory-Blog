import http from "./axios.tsx";

function getImageList(){
    return http({
        url: '/api/protect/images',
        method: 'GET'
    })
}

function delImages(keysToDelete: string[]){
    return http({
        url: '/api/protect/delImg',
        method: 'DELETE',
        data: keysToDelete
    })
}

function uploadImages(formData: FormData){
    return http({
        url: "/api/protect/upload",
        data: formData,
        method: 'POST',
    })
}

export {getImageList,delImages,uploadImages}