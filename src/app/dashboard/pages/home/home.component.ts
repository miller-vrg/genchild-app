import { Component } from '@angular/core';
import { SharedModule } from "@/shared/modules/shared/shared.module";
import { CommonModule } from '@angular/common';


@Component({
    selector: 'page-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [SharedModule, CommonModule]
})
export class HomeComponent {
  
}
