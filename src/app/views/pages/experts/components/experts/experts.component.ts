import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ExpertsService } from "../../../../services/experts/experts.service";
import { StorageManageService } from "src/app/views/services/storageservice/storage.service";
import { AuthService } from "src/app/views/services/auth/auth.service";
import { Experts } from "../../../../models/expert";
@Component({
  selector: "kt-experts",
  templateUrl: "./experts.component.html",
  styleUrls: ["./experts.component.scss"],
})
export class ExpertsComponent implements OnInit {
  experts: Experts[] = [];
  page: number = 1;
  filterOptions: any = [];
  selectedOptions: any = [];
  size: number = 8;
  SearchKey: string = null;
  languageIds: any = [];
  requestObj: any = [];
  loading: boolean = false;
  constructor(
    private expertService: ExpertsService,
    private storageService: StorageManageService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService
  ) {}
  userId: string = JSON.parse(this.storageService.get("userInfo")).id;
  pagingInfo: any;
  ngOnInit(): void {
    this.loading = true;
    this.authService.getLanguages().subscribe((responseBody: any) => {
      if (responseBody?.status) {
        this.filterOptions = responseBody?.result;
        // this.loading = false;
        this.getExperts(true);
        this.cdRef.detectChanges();
      }
    }),
      (err) => {};
  }

  onScroll(): void {
    if (this.pagingInfo?.hasNextPage) {
      this.page = this.page + 1;
      this.getExperts(true);
    }
  }

  filterSelectHandler(filter) {
    const isSelected = this.selectedOptions.some((e) => e.id === filter.id);
    if (!isSelected) {
      this.selectedOptions = [...this.selectedOptions, filter];
    }
    this.languageIds = this.selectedOptions.map(({ id }) => id);
    this.page = 1;
    this.getExperts(false);
    this.cdRef.detectChanges();
  }

  removeFilterHandler(filter) {
    const findIndex = this.selectedOptions.findIndex((a) => a.id === filter.id);
    if (findIndex !== -1) {
      this.selectedOptions.splice(findIndex, 1);
    }
    this.languageIds = this.selectedOptions.map(({ id }) => id);
    this.page = 1;
    this.getExperts(false);
    this.cdRef.detectChanges();
  }

  getExpertsLang(languages) {
    return languages?.map((itm) => itm?.name).join(" & ");
  }

  getExpertsTimeZone(timeZone) {
    return timeZone?.map((itm) => itm?.description).join(" & ");
  }

  searchByName() {
    this.page = 1;
    this.getExperts(false);
  }

  getExperts(scroll) {
    this.loading = true;
    this.cdRef.detectChanges();
    this.requestObj = {
      Page: this.page,
      Size: this.size,
      Name: this.SearchKey,
      LanguageIds: this.languageIds,
    };
    this.expertService
      .getAllExperts(this.requestObj)
      .subscribe((responseBody: any) => {
        if (responseBody?.status) {
          if (responseBody?.result?.items?.length && scroll) {
            this.experts?.push(...responseBody?.result?.items);
          } else if (!scroll) {
            this.experts = responseBody?.result?.items;
          }
          console.log(this.experts);
          this.pagingInfo = responseBody?.result?.pagingInfo;
          this.cdRef.detectChanges();
        }
        this.loading = false;
        this.cdRef.detectChanges();

      }),
      (err) => {
        this.loading = false;
        this.cdRef.detectChanges();
      };
  }
}
