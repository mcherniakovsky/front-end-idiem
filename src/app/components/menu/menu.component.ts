import { Router } from '@angular/router';
import { Component, Input, OnInit, SimpleChanges, } from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private router: Router){}
  @Input() currentSize: string = '';
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.currentSize)
  }
  goHome(){
    this.router.navigate(['/home']);
  }
}
