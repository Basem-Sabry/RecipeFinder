import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public searchPipe = new Subject<string>();

  constructor() { }
}
