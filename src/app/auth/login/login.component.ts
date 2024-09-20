import { Component, inject, signal } from '@angular/core';
import { SharedModule } from "@/shared/modules/shared/shared.module";
import { AuthenticationService } from '../services/authentication.service';
import { IUserLogin } from '../../shared/types/interfaces/IUserLogin';
import { lastValueFrom } from 'rxjs';
import { AlertService } from '@/shared/services/alert/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly auhtService = inject(AuthenticationService);
  private readonly router = inject(Router);
  user = signal<IUserLogin>({
    userName: '',
    password: ''
  })


  async login(event: Event){
    event.preventDefault();
    try{
      await lastValueFrom(this.auhtService.authenticate(this.user()));
      this.router.navigateByUrl('/');

    }catch(e){
      console.log(e);
    }
  }

}
