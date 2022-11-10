import { Component, OnInit } from '@angular/core';
import { EmployeeDetailService } from 'src/app/shared/Employee-detail.service';
import { NgForm } from '@angular/forms';
import { EmployeeDetail } from 'src/app/shared/Employee-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Employee-detail-form',
  templateUrl: './Employee-detail-form.component.html',
  styles: [
  ]
})
export class EmployeeDetailFormComponent implements OnInit {

  constructor(public service: EmployeeDetailService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.employeeId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postEmployeeDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully', 'Detail Register')
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putEmployeeDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully', 'Detail Register')
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new EmployeeDetail();
  }

}
