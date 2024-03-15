import {Routes} from '@angular/router';
import {ClientComponent} from './client/client.component';
import {ClientEditComponent} from './client-edit/client-edit.component';
import {ClientDetailComponent} from './client-detail/client-detail.component';
import {SerialComponent} from './serial/serial.component';
import {SerialDetailComponent} from './serial-detail/serial-detail.component';
import {SerialEditComponent} from './serial-edit/serial-edit.component';
import {LinkComponent} from './link/link.component';
import {LinkEditComponent} from './link-edit/link-edit.component';
import {LinkDetailComponent} from './link-detail/link-detail.component';
import {ServerComponent} from './server/server.component';
import {ServerEditComponent} from './server-edit/server-edit.component';
import {ServerDetailComponent} from './server-detail/server-detail.component';
import {UnknownComponent} from "iot-master-smart";
import {IndexComponent} from "./index/index.component";
import {ModbusStationComponent} from "./modbus-station/modbus-station.component";
import {ModbusMapperComponent} from "./modbus-mapper/modbus-mapper.component";
import {ModbusOptionsComponent} from "./modbus-options/modbus-options.component";
import {ModbusStationEditComponent} from "./modbus-station-edit/modbus-station-edit.component";
import {ModbusMapperEditComponent} from "./modbus-mapper-edit/modbus-mapper-edit.component";
import {ModbusOptionsEditComponent} from "./modbus-options-edit/modbus-options-edit.component";

export const routes: Routes = [
    {path: '', pathMatch: "full", component: IndexComponent},

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
    {path: 'client/:id', component: ClientDetailComponent},
    {path: 'client/:id/edit', component: ClientEditComponent},

    {path: 'modbus/station', component: ModbusStationComponent},
    {path: 'modbus/station/edit', component: ModbusStationEditComponent},
    {path: 'modbus/mapper', component: ModbusMapperComponent},
    {path: 'modbus/mapper/edit', component: ModbusMapperEditComponent},
    {path: 'modbus/options', component: ModbusOptionsComponent},
    {path: 'modbus/options/edit', component: ModbusOptionsEditComponent},

    {path: '**', component: UnknownComponent},
];
