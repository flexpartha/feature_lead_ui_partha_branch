import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kt-servertype-info',
  templateUrl: './servertype-info.component.html',
  styleUrls: ['./servertype-info.component.scss']
})
export class ServertypeInfoComponent implements OnInit {

  @Input() serviceType:any;

  constructor() { }

  ngOnInit(): void {
  }

}
