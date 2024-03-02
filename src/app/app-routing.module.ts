import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './client/client.component';
import {ClientEditComponent} from './client/client-edit/client-edit.component';
import {ClientDetailComponent} from './client/client-detail/client-detail.component';
import {SerialComponent} from './serial/serial.component';
import {SerialDetailComponent} from './serial/serial-detail/serial-detail.component';
import {SerialEditComponent} from './serial/serial-edit/serial-edit.component';
import {LinkComponent} from './link/link.component';
import {LinkEditComponent} from './link/link-edit/link-edit.component';
import {LinkDetailComponent} from './link/link-detail/link-detail.component';
import {ServerComponent} from './server/server.component';
import {ServerEditComponent} from './server/server-edit/server-edit.component';
import {ServerDetailComponent} from './server/server-detail/server-detail.component';
import {DeviceComponent} from './device/device.component';
import {DeviceEditComponent} from './device/device-edit/device-edit.component';
import {UnknownComponent} from "iot-master-smart";

const routes: Routes = [
    {path: 'device', component: DeviceComponent},
    {path: 'device/edit/:id', component: DeviceEditComponent},
    {path: 'create/device', component: DeviceEditComponent},

    {path: 'server', component: ServerComponent},
    {path: 'server/create', component: ServerEditComponent},
    {path: 'server/:id', component: ServerDetailComponent},
    {path: 'server/:id/edit', component: ServerEditComponent},

    {path: 'link', component: LinkComponent},
    {path: 'link/create', component: LinkEditComponent},
    {path: 'link/:id', component: LinkDetailComponent},
    {path: 'link/:id/edit', component: LinkEditComponent},

    {path: 'serial', component: SerialComponent},
    {path: 'serial/create', component: SerialEditComponent},
    {path: 'serial/:id', component: SerialDetailComponent},
    {path: 'serial/:id/edit', component: SerialEditComponent},

    {path: 'client', component: ClientComponent},
    {path: 'client/create', component: ClientEditComponent},
    {path: 'client/:id/edit', component: ClientEditComponent},
    {path: 'client/:id', component: ClientDetailComponent},

    {path: '**', component: UnknownComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
