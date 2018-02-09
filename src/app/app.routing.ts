import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { AdminComponent } from './admin/admin.component';
import { HistoryComponent } from './history/history.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'resetpassword', component: ResetpasswordComponent },
    { path: 'resetpassword/:tokenid', component: ResetpasswordComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'register/:tokenid', component: RegisterComponent},
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'usersettings', component: UsersettingsComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);