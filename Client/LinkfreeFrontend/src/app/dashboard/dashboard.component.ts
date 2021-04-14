import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkService } from '../link.service';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

interface Card {
  linkId: string,
  priority: number,
  selectedPriority: number,
  title: string,
  originalTitle: string,
  url: string,
  originalUrl: string,
  isExpanded: boolean,
  dropdownIsActive: boolean,
  saveButtonIsActive: boolean,
  deleteModalIsActive: boolean
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userLinks: Card[] = [];
  faAngleDown = faAngleDown;
  constructor(private _linkService: LinkService,
              private _router: Router) { }

  ngOnInit(): void {
    this._linkService.getUserLinksWithValidityCheck()
                     .subscribe(
                       res => {
                         this.userLinks = res;
                         this.userLinks.forEach(link => {
                           link.isExpanded = false;
                           link.selectedPriority = link.priority;
                           link.dropdownIsActive = false;
                           link.saveButtonIsActive = false;
                           link.deleteModalIsActive = false;
                           link.originalTitle = link.title;
                           link.originalUrl = link.url;
                         });
                         console.log(this.userLinks);
                       },
                       err => {
                         if (err instanceof HttpErrorResponse) {
                           if (err.status === 401) {
                             this._router.navigate(['/login']);
                           }
                         }
                       }
                     )
  }

  toggleExpand(index: number): void {
    this.userLinks = this.userLinks.map(link => {
      if (link.priority === index) {
        link.isExpanded = !link.isExpanded;
      }
      return link;
    });
  }

  changeSelectedPriority(index: number, modifiedSelectedPriority: number): void {
    this.userLinks = this.userLinks.map(link => {
      if (link.priority === index) {
        link.selectedPriority = modifiedSelectedPriority;
      }
      return link;
    })
  }

  toggleModal(index: number): void {
    this.userLinks[index].deleteModalIsActive = !this.userLinks[index].deleteModalIsActive;
  }

  modelChange(index: number): void {
    const selectedCard: Card = this.userLinks[index];

    const fieldsAreNotEmpty: boolean = selectedCard.title != "" && selectedCard.url != "";
    const atLeastOneFieldChanged: boolean = selectedCard.title != selectedCard.originalTitle || selectedCard.url != selectedCard.originalUrl;

    if (fieldsAreNotEmpty && atLeastOneFieldChanged) {
      this.userLinks[index].saveButtonIsActive = true;
    } else {
      this.userLinks[index].saveButtonIsActive = false;
    }
  }

}
