import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kt-info-tile',
  templateUrl: './info-tile.component.html',
  styleUrls: ['./info-tile.component.scss']
})
export class InfoTileComponent implements OnInit {
  blobUrl: string = 'https://stscaleassessment.blob.core.windows.net/preassessments/AMA-Content.xlsx'
  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.cdr.detectChanges();

  }

  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('href', this.blobUrl);
    link.setAttribute('download', decodeURI(this.blobUrl?.split("_").pop()));
    document.body.appendChild(link);
    link.click();
  }

}
