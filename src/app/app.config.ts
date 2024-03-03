import {ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {zh_CN, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

import {provideAnimations} from '@angular/platform-browser/animations';

import {NZ_ICONS} from "ng-zorro-antd/icon";
import {IconDefinition} from '@ant-design/icons-angular';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  PlusOutline,
  BellOutline,
  SettingOutline,
  EditOutline,
  ApartmentOutline,
  BlockOutline,
  AppstoreOutline,
  AppstoreAddOutline,
  DeleteOutline,
  DownloadOutline,
  UploadOutline,
  UserOutline,
  ProfileOutline,
  EyeOutline,
  ReloadOutline,
  BackwardOutline,
  ArrowLeftOutline,
  LockOutline,
  DisconnectOutline,
  LinkOutline,
  DragOutline,
  ExportOutline,
  ImportOutline,
} from '@ant-design/icons-angular/icons';

import {API_BASE} from "iot-master-smart";

const icons: IconDefinition[] = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  PlusOutline,
  BellOutline,
  SettingOutline,
  EditOutline,
  ApartmentOutline,
  BlockOutline,
  AppstoreOutline,
  AppstoreAddOutline,
  DeleteOutline,
  DownloadOutline,
  UploadOutline,
  UserOutline,
  ProfileOutline,
  EyeOutline,
  ReloadOutline,
  BackwardOutline,
  ArrowLeftOutline,
  LockOutline,
  DisconnectOutline,
  LinkOutline,
  DragOutline,
  ExportOutline,
  ImportOutline,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNzI18n(zh_CN),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    {provide: NZ_ICONS, useValue: icons},
    {provide: LOCALE_ID, useValue: "zh_CN"},
    {provide: API_BASE, useValue: "/$gateway/api/"},
  ]
};
