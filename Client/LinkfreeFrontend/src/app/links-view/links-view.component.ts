import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-links-view',
  templateUrl: './links-view.component.html',
  styleUrls: ['./links-view.component.css']
})
export class LinksViewComponent implements OnInit {

  links: any[];
  userName: string;

  constructor(private linkService: LinkService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.userName = params['user-name']);
    this.linkService.getUserLinks(this.userName).subscribe((data: any[]) => {
      console.log(data);
      this.links = data;

      for (let link of this.links) {
        link.owner = this.userName;
      }
      console.log(this.links);
    });
  }

}
