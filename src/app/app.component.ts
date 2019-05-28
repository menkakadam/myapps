import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{

  showLoader: boolean;

  constructor(private loader: LoaderService) {}

  ngOnInit() {
    this.loader.status.subscribe((val: boolean) => {
       this.showLoader = val;
    });
  }

}
