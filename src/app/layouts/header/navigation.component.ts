import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule, RouterModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {

  @Output() toggleSidebar = new EventEmitter<void>();
  public showSearch = false;
  username?: string;

  constructor(private userService: UserService, private tokenService: TokenStorageService) {
    this.username = this.tokenService.getUser()?.username;
  }

  logout(): void {
    this.userService.logout();
  }

  ngAfterViewInit() { }
}
