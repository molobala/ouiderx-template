import { Component, OnInit, signal } from '@angular/core';
import { IonApp, IonContent } from '@ionic/angular/standalone';
import { OUIIon, OUIIonPageRender, UIPage } from 'oui-ion';
import * as allIcons from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { MEvento } from 'mevento';

@Component({
  selector: 'app-root',
  imports: [IonContent, IonApp, OUIIonPageRender],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App implements OnInit {
  protected readonly title = signal('testing');
  constructor(private ouiIon: OUIIon) {
    const icons = Object.keys(allIcons).reduce(
      (collector, value) => {
        collector[
          value.replace(/([A-Z])/g, (_m, p1) => '-' + p1.toLowerCase())
        ] = allIcons[value as keyof typeof allIcons];
        return collector;
      },
      <{ [k: string]: any }>{},
    );
    console.log(icons);
    addIcons(icons);
  }
  toPreview = signal<UIPage | undefined>(undefined);
  segment = signal<'ios' | 'md'>('ios');
  errors = signal<string | null>(null);
  runningApp = signal<UIPage | null>(null);
  ngOnInit(): void {
    this.loadErrors();
    this.ouiIon.settup();
    MEvento.register('localAsset', (args) => {
      const url = args[0];
      return `${window.location.protocol}//${window.location.host}/app/${url}`;
    });
    this.ouiIon.pagesResolver = {
      resolve: async (code, localePage: boolean) => {
        if (localePage) {
          let resp = await fetch('/app/' + code, {
            method: 'GET',
          });
          if (resp.status !== 200) {
            console.error(resp.text());
            return null;
          }
          const uiData = await resp.json();
          const app = this.runningApp() ?? this.toPreview();
          console.log('App::::', app);
          let translation = app?.translation ?? {};
          resp = await fetch(`/app/${code}.tr`, { method: 'GET' });
          if (resp.status === 200) {
            const trJson = await resp.json();
            for (const key of Object.keys(trJson)) {
              translation[key] = {
                ...(translation[key] ?? {}),
                ...trJson[key],
              };
            }
          }
          const page = new UIPage({
            code,
            name: code,
            version: app?.version ?? '1.0.0',
            build: 1,
            uiData: JSON.stringify(uiData),
            translation,
          });
          console.log('Page:::' + code, page);
          return page;
        }
        return null;
      },
    };
    this.loadRunningApp().then(async (appJson) => {
      const entry = appJson?.entry?.replace(/\.omc$/, '.json') ?? 'index.json';
      const page = await this.ouiIon.page(`import(${entry})`);
      console.log('appJson::::::', entry, page);
      if (!page) {
        return;
      }
      const translation = page?.translation ?? {};
      // load root translation
      const res = await fetch(
        `/app/${appJson?.['translation'] ?? 'translation.json'}`,
        { method: 'GET' },
      );
      if (res.status === 200) {
        const trJson = await res.json();
        for (const key of Object.keys(trJson)) {
          translation[key] = {
            ...(translation[key] ?? {}),
            ...trJson[key],
          };
        }
        page.translation = translation;
      }
      this.toPreview.set(page ?? undefined);
      console?.log('toPreview::::::', this.toPreview);
    });
  }
  async loadRunningApp() {
    try {
      let res = await fetch('/app/.app.json');
      if (res.status !== 200) {
        return;
      }
      const app = await res.json();
      this.runningApp.set(app);
      this.segment.set(app.mode ?? 'ios');
      this.ouiIon.setLocale(app.language ?? 'en');
      res = await fetch('/app/app.json');
      if (res.status === 200) {
        return await res.json();
      }
    } catch (error) {
      this.errors.set(null);
    }
  }
  async loadErrors() {
    try {
      const res = await fetch('/app/.errors.txt');
      if (res.status === 200) {
        this.errors.set(await res.text());
      }
    } catch (error) {
      this.errors.set(null);
    }
  }
}
