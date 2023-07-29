import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule, RouterModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {

  @Output() toggleSidebar = new EventEmitter<void>();
  public showSearch = false;
  public fullname?: string;
  public imageUrl?: string;

  constructor(private userService: UserService, private tokenService: TokenStorageService) {
    let user = this.tokenService.getUser();
    this.fullname = user?.fullname;
    this.imageUrl = `${environment.apiUrl}file/find/${user?.picture}`;
  }

  logout(): void {
    this.userService.logout();
  }

  ngAfterViewInit() { }
}
