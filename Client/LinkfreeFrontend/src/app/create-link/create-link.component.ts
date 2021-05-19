import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LinkService, Link } from '../link.service';

interface CreateLinkState {
  title: string,
  url: string,
  buttonIsActive: boolean
}

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {

  createLinkContent: CreateLinkState = {
    title: "",
    url: "",
    buttonIsActive: false
  }

  @Output() handleAddLink:EventEmitter<Link> = new EventEmitter<Link>();

  @Input() priorityToAssign: number;

  constructor(private _linkService: LinkService) { }

  ngOnInit(): void {
  }

  shouldCreateButtonBeEnabled(): void {
    this.createLinkContent.buttonIsActive = (this.createLinkContent.url != "" && this.createLinkContent.title != "");
  }

  createLink(): void {

    const linkToCreate: Link = {
      Priority: this.priorityToAssign,
      Title: this.createLinkContent.title,
      URL: this.createLinkContent.url
    }

    this._linkService.createLink(linkToCreate)
                     .subscribe(
                       res => {

                         linkToCreate.LinkId = res.linkId;
                         
                         // Clear slate for new links to be made 
                         this.createLinkContent.title = "";
                         this.createLinkContent.url = "";
                         this.createLinkContent.buttonIsActive = false;

                         this.handleAddLink.emit(linkToCreate);
                         
                       },
                       err => {
                         console.log(err);
                       }
                     )
  }
}
