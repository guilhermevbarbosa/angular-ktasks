import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ktasks';

  theme: boolean;

  ngOnInit() {
    if (localStorage.getItem('theme') === 'true') {
      this.theme = true;
    } else {
      this.theme = false;
    }

    this.setRemoveTheme(this.theme);
  }

  test() {
    localStorage.setItem('theme', String(this.theme));

    this.setRemoveTheme(this.theme);
  }

  setRemoveTheme(bool: boolean) {
    if (bool) {
      document.getElementById('content-theme').classList.add('dark-theme');
    } else {
      document.getElementById('content-theme').classList.remove('dark-theme');
    }
  }
}
