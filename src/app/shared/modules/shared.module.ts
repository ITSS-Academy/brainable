import { NgModule } from '@angular/core';
import { CommonModule, AsyncPipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    NgClass,
  ],
  exports: [RouterModule, ReactiveFormsModule, FormsModule, AsyncPipe, NgClass],
})
export class SharedModule {}
