import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIconButton} from '@angular/material/button'; // Import MatListModule

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, RouterLink, MatIconButton, RouterOutlet], // Add MatListModule to imports
  templateUrl: './app.component.html', // Correct the templateUrl
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cupcake';
  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }
}
