import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { faUpload, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PictureService, Picture } from '../picture.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  faUpload: IconDefinition = faUpload;

  constructor(private _uploadService: UploadService,
              private _pictureService: PictureService) { }

  ngOnInit(): void {
  }

  changeProfilePicture(picture: any) {
    this._uploadService.upload(picture)
        .subscribe(
          (res: any) => {
            if (res.success) {
              const linkURL: string = res.data.link;
              const pictureToSave: Picture = {
                URL: linkURL
              };

              this._pictureService.updateProfilePicture(pictureToSave)
                                  .subscribe(
                                    res => console.log(res),
                                    err => console.log(err)
                                  )
              
            }
          },
          err => console.log(err)          
        )
  }

}
