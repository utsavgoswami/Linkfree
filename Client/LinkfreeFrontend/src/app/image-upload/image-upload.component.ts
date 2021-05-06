import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { faUpload, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  faUpload: IconDefinition = faUpload;

  constructor(private _uploadService: UploadService) { }

  ngOnInit(): void {
  }

  changeProfilePicture(picture: any) {
    this._uploadService.upload(picture)
        .subscribe(
          res => console.log(res),
          err => console.log(err)          
        )
  }

}
