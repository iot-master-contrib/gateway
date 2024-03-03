import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss'
})
export class DeviceComponent {
    @Input() tunnel!: string;

}
