import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/views/services/auth/auth.service';
import { StorageManageService } from 'src/app/views/services/storageservice/storage.service';
import jwt_decode from "jwt-decode";
import { utils } from 'src/app/views/utils/utils';
import { UserInfo } from 'src/app/views/models/user-info';
import { SplashScreenService } from 'src/app/core/_base/layout/services/splash-screen.service';

@Component({
  selector: 'kt-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  loading = false;
  countryList: any = [];
  selectedCountry: number = 1;
  languages: any = [];
  registerForm: FormGroup;
  submitted = false;
  isAcceptTerms : boolean = false;
  selectedCompany: any = undefined;
  organizationList: any = [];
  otherOrganization: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageManageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private splashScreenService: SplashScreenService

  ) {}
  /**
   * On init
   */
  ngOnInit() {
    this.splashScreenService.hide();
    this.authService.getCountries().subscribe((responseBody: any) => {
      this.countryList = responseBody?.result;
      this.registerForm.controls["country"].setValue(this.countryList[0]?.id);
      this.cdRef.detectChanges(); // <== added
    }),
      (err) => {};

    this.authService.getLanguages().subscribe((responseBody: any) => {
      this.languages = responseBody?.result;
      this.registerForm.controls["language"].setValue(this.languages[0]?.id);
      this.cdRef.detectChanges(); // <== added
    }),
      (err) => {};
    let decoded: any = jwt_decode(this.storageService.get("msal.idtoken"));
    const { first, last } = utils.splitFirstOccurrence(decoded?.name, " ");

    if (decoded) {
      this.registerForm = this.formBuilder.group(
        {
          firstName: [first, Validators.required],
          lastName: [last, Validators.required],
          email: [decoded?.email, [Validators.required, Validators.email]],
          organization: ["", [Validators.required]],
          country: [this.countryList[0]?.id, Validators.required],
          language: [this.languages[0]?.id, Validators.requiredTrue],
        },
        {}
      );
    }
  }

  onSubmit() {
    let userDetails: any = {
      firstName: this.registerForm?.get("firstName")?.value,
      lastName: this.registerForm?.get("lastName")?.value,
      organizationName: this.registerForm?.get("organization")?.value,
      email: this.registerForm?.get("email")?.value,
      countryId: this.registerForm?.get("country")?.value,
      languageId: this.registerForm?.get("language")?.value,
      roleId: 6,
    };
    this.authService
      .userRegistration(userDetails)
      .subscribe((responseBody: any) => {
        if (responseBody.status) {
          var data = responseBody.result;
          let userInfo: UserInfo = new UserInfo();
          (userInfo.id = data.id),
            (userInfo.email = data.email),
            (userInfo.countryId = data.countryId),
            (userInfo.languageId = data.languageId);
          this.storageService.set("userInfo", JSON.stringify(userInfo));
          this.router.navigate(["assessment"]);
        }
      }),
      (err) => {};
  }

  handleCheckBox(event) {
    this.isAcceptTerms = event;
    this.cdRef.detectChanges();
  }

  onChangeSearch(val: string) {
    if (val.trim().length) {
      const index = this.countryList?.findIndex((country) => country?.id == this.registerForm?.get("country")?.value );
      let selectedCountry: string = ""
      if (index !== -1) {
        selectedCountry = this.countryList[index].name
      }
      this.registerForm.controls["organization"].setValue(val);
      let _obj = {
        Country: selectedCountry,
        Organization: val,
      };
      this.authService.getOrganization(_obj).subscribe((responseBody: any) => {
        this.organizationList = [];
        responseBody.forEach((item) => {
          let keyword = item.toLowerCase() == 'other' ? val : item;
          let id = item.toLowerCase() == 'other' ? 'other' : item;
          this.organizationList.push({
            id: id,
            itemName: item,
            keyword: keyword,
          });
        });
        this.cdRef.detectChanges();
      }),
        (err) => {};
    }
  }
  
  get selectedCompanyName() {
    if (this.selectedCompany === 'Other') {
      return 'other'
    }
  }

  searchCleared() {
    this.organizationList = [];
    this.cdRef.detectChanges();
  }
}
