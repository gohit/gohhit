import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home.component";
import { AboutComponent } from "./pages/about.component";
import { ChatComponent } from "./pages/chat.component";
import { QuizComponent } from "./pages/quiz.component";
import { ContactComponent } from "./pages/contact.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "projects/mathbuddy/chat", component: ChatComponent },
  { path: "projects/mathbuddy/quiz", component: QuizComponent },
  { path: "**", redirectTo: "" },
];
