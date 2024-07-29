import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolumeManagemetComponent } from './volume-managemet/volume-managemet.component';

const routes: Routes = [
  {
    path: 'vm',
    component: VolumeManagemetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
