// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "@theme/base/base.component";
import { AuthGuard } from "@core/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("@pages/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "",
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "assessment",
        loadChildren: () =>
          import("@pages/my-assessment/my-assessment.module").then(
            (m) => m.MyAssessmentModule
          ),
      },
      {
        path: "experts",
        loadChildren: () =>
          import("@pages/experts/experts.module").then((m) => m.ExpertsModule),
      },
      { path: "", redirectTo: "assessment", pathMatch: "full" },
      { path: "**", redirectTo: "assessment", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "error/403", pathMatch: "full" },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
