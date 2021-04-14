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
  url: string,
  isExpanded: boolean,
  dropdownIsActive: boolean,
  saveButtonIsActive: boolean
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

}
