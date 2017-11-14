import { Component } from '@angular/core';
import { AppService } from './app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/materialize-css/dist/css/materialize.css']
})
export class AppComponent {
  title = 'app';
  data :any={};

  constructor(private appService: AppService)
  {

  }

  ngOnInit(): void {
    this.appService.getUserNames().then(users =>this.data = users);
    console.log(this.data);
  }

  
}
