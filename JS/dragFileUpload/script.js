const dropArea = document.querySelector('.drag-area'),
dragText = document.querySelector('header'),
browseBtn = document.querySelector('button'),
browseinput = document.querySelector('input');
let file;

browseBtn.onclick = () => {
    browseinput.click();
}

browseinput.addEventListener('change', function(){
    file = this.files[0];
    showFile(file);
});

dropArea.addEventListener('dragover', dragOver);

dropArea.addEventListener('dragleave', dragLeave);

dropArea.addEventListener('drop', dragDrop);
function dragOver(e){
    e.preventDefault();
    dropArea.classList.add('active');
    dragText.textContent = 'Release to upload file';
}
function dragLeave(){
    dropArea.classList.remove('active');
    dragText.textContent = 'Drag & Drop file to upload';
}
function dragDrop(e){
    e.preventDefault();
    file = e.dataTransfer.files[0];
    showFile(file);
    //console.log(file);
}

function showFile(file){
    let fileType = file.type;
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if(validExtensions.includes(fileType)){
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileUrl = fileReader.result;
            let imgTag = `<img src="${fileUrl}" alt="">`;
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    }
    else{
        alert('Please select .jpeg, .jpg or .png image file !')
        dropArea.classList.remove('active');
        dragText.textContent = 'Drag & Drop file to upload';
    }
}