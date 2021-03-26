import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidenave',
  templateUrl: './sidenave.component.html',
  styleUrls: ['./sidenave.component.css']
})
export class SidenaveComponent implements OnInit {
opened=true;
id:any;
  currentRoute: any;
  constructor(private activatedroute:ActivatedRoute,private route:Router) { 
    console.log(this.activatedroute)
    console.log(this.route.url)
  }

  ngOnInit(): void {
    this.id = this.activatedroute.url;
    console.log(this.activatedroute)
  }

}
