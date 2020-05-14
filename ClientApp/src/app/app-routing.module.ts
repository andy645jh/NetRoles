import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { GuessComponent } from './guess/guess.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent 
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRole: 'Administrador'
    }  
  },
  { 
    path: 'guess', 
    component: GuessComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRole: 'Invitado'
    }  
  },
  { 
    path: '',
    component: HomeComponent 
  }, 
  { 
    path: 'error',
    component: ErrorComponent 
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
