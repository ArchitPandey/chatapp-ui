import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ChatComponent } from "./component/chat/chat.component";
import { LoginComponent } from "./component/login/login.component";

const routes = [
    {path: 'chat', component: ChatComponent},
    {path: 'login', component: LoginComponent},
    {path: '', component: LoginComponent}
];

@NgModule(
    {
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
    }
)
export class AppRoutingModule {}