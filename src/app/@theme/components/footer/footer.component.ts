import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    </span>
    <div class="socials">
      <a href="https://github.com/juny524/KENSUNFAKARI_WEB" target="_blank" class="ion ion-social-github"></a>
      <a href="https://twitter.com/Juny524" target="_blank" class="ion ion-social-twitter"></a>
    </div>
  `,
})
export class FooterComponent {
}
