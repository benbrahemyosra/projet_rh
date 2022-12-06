import { Component, OnInit } from "@angular/core";
import { PostService } from "../service/post.service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.scss"],
})

export class AddPostComponent implements OnInit {
  constructor(public postService: PostService, private fb: FormBuilder) {
    this.postService.validateForm = this.fb.group({
      name_post: ["", Validators.required],
      salary_post: ["", Validators.required],
    });
  }


  ngOnInit(): void {
    if (this.postService.SELECTED_POST) {
      this.postService.validateForm.controls.name_post.patchValue(
        this.postService.SELECTED_POST.name_post
      );
      
      this.postService.validateForm.controls.salary_post.patchValue(
        this.postService.SELECTED_POST.salary_post
      );
    }
  }

  submitForm(data: any) {}
}
