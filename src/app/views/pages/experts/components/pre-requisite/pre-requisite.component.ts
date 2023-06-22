import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kt-pre-requisite',
  templateUrl: './pre-requisite.component.html',
  styleUrls: ['./pre-requisite.component.scss']
})
export class PreRequisiteComponent implements OnInit {

  @Input() preRequisiteMap = [];
  answer = [];
  constructor() { }

  ngOnInit(): void {
  }

}
