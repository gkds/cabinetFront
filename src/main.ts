import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  enum colors {Green,Red, Blue=10};

  //console.log('>>'+ colors.Green)
 // console.log('>>>'+ colors.Red)
  console.log('>>>>'+ colors.Blue)

  // Union type
  let myColor:string = colors[1];
  console.log(myColor)
