import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkService, Link } from '../link.service';
import { faAngleDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';

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

interface CreateLinkState {
  title: string,
  url: string,
  buttonIsActive: boolean
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userLinks: Card[] = [];
  faAngleDown: IconDefinition = faAngleDown;
  createLinkContent: CreateLinkState = {
    title: "",
    url: "",
    buttonIsActive: false
  }

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
    modifiedSelectedPriority = Number(modifiedSelectedPriority);
    this.userLinks = this.userLinks.map(link => {
      if (link.priority === index) {
        link.selectedPriority = modifiedSelectedPriority;
      }
      return link;
    })
    this.shouldSaveButtonBeEnabled(index);
  }

  toggleModal(index: number): void {
    this.userLinks[index].deleteModalIsActive = !this.userLinks[index].deleteModalIsActive;
  }

  shouldSaveButtonBeEnabled(index: number): void {
    const selectedCard: Card = this.userLinks[index];

    const fieldsAreNotEmpty: boolean = selectedCard.title !== "" && selectedCard.url !== "";
    const atLeastOneFieldChanged: boolean = selectedCard.title !== selectedCard.originalTitle || selectedCard.url !== selectedCard.originalUrl || selectedCard.priority !== selectedCard.selectedPriority;

    if (fieldsAreNotEmpty && atLeastOneFieldChanged) {
      this.userLinks[index].saveButtonIsActive = true;
    } else {
      this.userLinks[index].saveButtonIsActive = false;
    }

  }

  shouldCreateButtonBeEnabled(): void {
    if (this.createLinkContent.url != "" && this.createLinkContent.title != "") {
      this.createLinkContent.buttonIsActive = true;
    } else {
      this.createLinkContent.buttonIsActive = false;
    }
  }

  deleteLink(linkId: string): void {
    this._linkService.deleteLink(linkId)
                     .subscribe(
                       res => {
                        console.log(res);

                        let newPriority: number = 0;
                        this.userLinks = this.userLinks
                                             .filter(link => link.linkId != linkId)
                                             .map(link => {
                                                  link.selectedPriority = newPriority;
                                                  link.priority = newPriority;
                                                  ++newPriority;
                                                  return link;
                                              });
                        
                        console.log(this.userLinks);                                  
                       },
                       err => {
                         console.log(err);
                       }
                     );
  }

  updateLink(index: number): void {
    const updatedCard: Card = this.userLinks[index];
    const updatedLink: Link = {
      LinkId: updatedCard.linkId,
      Priority: updatedCard.selectedPriority,
      Title: updatedCard.title,
      URL: updatedCard.url
    }

    this._linkService.updateLink(updatedLink)
                     .subscribe(
                       res => {
                         console.log(res);
                         const updatedCards: Card[] = _.cloneDeep(this.userLinks);

                         const originalPosition: number = updatedCard.priority;
                         const updatedPosition: number = updatedLink.Priority;
                         
                         // Update display position
                         [updatedCards[originalPosition], updatedCards[updatedPosition]] = [updatedCards[updatedPosition], updatedCards[originalPosition]];
                          updatedCards[originalPosition].priority = originalPosition;
                          updatedCards[originalPosition].selectedPriority = originalPosition;
                          updatedCards[updatedPosition].priority = updatedPosition;
                          updatedCards[updatedPosition].selectedPriority = updatedPosition;

                         // Update state of Link-specific attributes
                         updatedCards[updatedPosition].originalTitle = updatedLink.Title;
                         updatedCards[updatedPosition].originalUrl = updatedLink.URL;

                         this.userLinks = updatedCards;
                         this.shouldSaveButtonBeEnabled(originalPosition);
                         this.shouldSaveButtonBeEnabled(updatedPosition);
                       },
                       err => {
                         console.log(err);
                       }
                     )
  }

  createLink() {
    const linkToCreate: Link = {
      Priority: this.userLinks.length,
      Title: this.createLinkContent.title,
      URL: this.createLinkContent.url
    }

    this._linkService.createLink(linkToCreate)
                     .subscribe(
                       res => {
                         const CardToAdd: Card = {
                          linkId: res.linkId,
                          priority: res.priority,
                          selectedPriority: res.priority,
                          title: res.title,
                          originalTitle: res.title,
                          url: res.url,
                          originalUrl: res.url,
                          isExpanded: false,
                          dropdownIsActive: false,
                          saveButtonIsActive: false,
                          deleteModalIsActive: false,
                         }

                         this.userLinks = this.userLinks.concat(CardToAdd);
                       },
                       err => {
                         console.log(err);
                       }
                     );
  }

}
