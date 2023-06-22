// Angular
import { Component, Input, OnInit } from "@angular/core";
import { StorageManageService } from "src/app/views/services/storageservice/storage.service";
import { UserService } from "../../../../services/user/user.service";
@Component({
  selector: "kt-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  // Public properties

  @Input() userDropdownStyle = "light";
  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;
  userProfileName: string = "User";
  firstLterofName:string;
  constructor(
    private userService: UserService,
    private storageService: StorageManageService
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    this.userProfileName = this.storageService.get("profileName");
    this.firstLterofName = this.userProfileName.charAt(0);
  }

  /**
   * Log out
   */
  logout() {
    this.userService.logout();
  }
}
