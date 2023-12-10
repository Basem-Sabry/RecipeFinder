import { Component } from '@angular/core';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private service : MainService) {

  }
  searchValues(viewEvent: any) {
 this.service.searchPipe.next(viewEvent.target.value)
}
}
