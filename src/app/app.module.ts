import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { NavbarComponent } from './head/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FundComponent } from './post/fund/fund.component';
import { LoginComponent } from './auth/login/login.component';
import { SingupComponent } from './auth/singup/singup.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostListComponent,
    NavbarComponent,
    FundComponent,
    LoginComponent,
    SingupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatMenuModule,MatIconModule,MatButtonModule,MatCardModule,
    MatFormFieldModule,MatInputModule,MatToolbarModule,MatExpansionModule,
    FormsModule,HttpClientModule, BrowserAnimationsModule,MatSelectModule,
    MatTableModule,MatProgressSpinnerModule,MatGridListModule,MatDialogModule,
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
