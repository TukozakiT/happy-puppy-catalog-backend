import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CreateMediaFileDto } from './dto/create-media-file.dto';
import { UpdateMediaFileDto } from './dto/update-media-file.dto';


@Injectable()
export class MediaFileService {
  private bucketFirebase;

  constructor(){
    const firebaseConfig = JSON.parse(process.env.FIREBASE);
      initializeApp(firebaseConfig);
      this.bucketFirebase = getStorage();
  }

  async uploadProductImage(file:Express.Multer.File, createMediaFileDto: CreateMediaFileDto) {
     const metadata = {
      contentType: 'image/jpeg'
    };

    const storageRef = ref(this.bucketFirebase, 'images/' + createMediaFileDto.name);
    const uploadTask = uploadBytesResumable(storageRef, Buffer.from(file.buffer), metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const updateMediaFileDto = { name: createMediaFileDto.name, url: downloadURL}
          
        });
      }
    );

  }

  findAll() {
    return `This action returns all mediaFile`;
  }



  updateImage(id: string, updateMediaFileDto: UpdateMediaFileDto) {
    return `This action updates a #${id} mediaFile`;
  }
}
