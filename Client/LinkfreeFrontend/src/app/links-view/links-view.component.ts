import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';
import { ActivatedRoute } from '@angular/router';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-links-view',
  templateUrl: './links-view.component.html',
  styleUrls: ['./links-view.component.css']
})
export class LinksViewComponent implements OnInit {

  links: any[];
  userName: string;
  serverResponded: boolean = false;
  userExists: boolean = true;
  profilePicture: string = "https://i.imgur.com/IFvzNHp.png";

  constructor(private _linkService: LinkService, private route: ActivatedRoute, 
              private _pictureService: PictureService) { }

  ngOnInit(): void {
    this._pictureService.getProfilePicture()
                        .subscribe(res => {
                          this.profilePicture = res;
                        });

    this.route.params.subscribe(params => this.userName = params['user-name']);
    this._linkService.getUserLinks(this.userName)
        .subscribe(
          (data: any[]) => {
            this.serverResponded = true;
            console.log(data);
            this.links = data;

            for (let link of this.links) {
              link.owner = this.userName;
            }
            console.log(this.links);
          },
          err => {
            this.serverResponded = true;
            this.userExists = false;
            console.log(err);
          }
    );
  }

}
