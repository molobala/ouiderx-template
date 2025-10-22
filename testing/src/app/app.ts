import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonIcon, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonButton, IonSelect, IonContent, IonSelectOption, IonTitle, IonHeader } from '@ionic/angular/standalone';
import { OUIIon, OUIIonPageRender, UIPage } from 'oui-ion';
import * as allIcons from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {MEvento} from 'mevento'

@Component({
  selector: 'app-root',
  imports: [IonHeader, IonTitle, IonContent, IonButton, IonButtons, IonLabel, IonSegmentButton, IonSegment, IonToolbar, IonIcon, IonSelect, IonSelectOption, IonApp, OUIIonPageRender],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  
})
export class App implements OnInit{
  protected readonly title = signal('testing');
  constructor(private ouiIon: OUIIon) {
    const icons = Object.keys(allIcons).reduce((collector, value) => {
      collector[value.replace(/([A-Z])/g, (_m, p1) => '-' + p1.toLowerCase())] = allIcons[value as keyof typeof allIcons];
      return collector;
    }, (<{[k: string]: any}>{}));
    console.log(icons);
    addIcons(icons);
  }
  language = 'FR'
  theme = 'LIGHT';
  toPreview = signal<UIPage|undefined>(undefined);
  segment: 'ios' | 'md' = 'ios'
  ngOnInit(): void {
    this.ouiIon.settup()
    MEvento.register('localAsset', (args) => {
      const url = args[0];
      return `${window.location.protocol}/app/${url}`
    })
    this.ouiIon.pagesResolver = {
      resolve: async (code, localePage: boolean) => {
        if(localePage) {
          const resp = await fetch("/app/" + code, {
            method: 'GET'
          })
          if(resp.status !== 200) {
            console.error(resp.text())
            return null
          }
          const page = UIPage.parse({code, name: code, version: '1.0.0', build: 1 ,uiData: JSON.stringify(await resp.json())})
          console.log('Page:::' + code, page)
          return page
        }
        return null
      }
    }
    this.ouiIon.page('import(index.json)').then((page) => {
      this.toPreview.set(page ?? undefined)
      console?.log('toPreview::::::', this.toPreview);
    })
  }

  showThemeChoose() {
    this.theme = this.theme == 'LIGHT' ? 'DARK' : 'LIGHT';
  }
  languageChanged() {
    // const p = this.toPreview;
    // // this.ouiIon.setLocale(this.language);
    // this.toPreview = undefined;
    // setTimeout(() => {
    //   this.toPreview = p;
    // }, 200);
  }
}
