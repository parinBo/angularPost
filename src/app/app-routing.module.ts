import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SingupComponent } from './auth/singup/singup.component';
import { FundComponent } from './post/fund/fund.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostListComponent } from './post/post-list/post-list.component';

const routes: Routes = [{path:'',component:PostListComponent,canActivate:[AuthGuard]},
{path:'create',component:PostCreateComponent,canActivate:[AuthGuard]},
{path:'edit/:id',component:PostCreateComponent,canActivate:[AuthGuard]},
{path:'fund',component:FundComponent,canActivate:[AuthGuard]},
{path:'login',component:LoginComponent},
{path:'singup',component:SingupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
