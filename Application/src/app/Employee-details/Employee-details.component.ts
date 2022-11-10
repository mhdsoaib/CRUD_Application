import { Component, OnInit } from '@angular/core';
import { EmployeeDetailService } from '../shared/Employee-detail.service';
import { EmployeeDetail } from '../shared/Employee-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Employee-details',
  templateUrl: './Employee-details.component.html',
  styles: [
  ]
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(public service: EmployeeDetailService,
    private toastr: ToastrService) { }
    EmployeeList: EmployeeDetail[];


  ngOnInit(): void {
    this.refEmpList();
  }

  populateForm(selectedRecord: EmployeeDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }


  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteEmployeeDetail(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Deleted successfully", 'Detail Register');
          },
          err => { console.log(err) }
        )
    }
  }
  refEmpList(){
    this.service.refreshList().then(data => {
      this.EmployeeList = data;
      console.log("this is the data",data);
  });
  }
}
