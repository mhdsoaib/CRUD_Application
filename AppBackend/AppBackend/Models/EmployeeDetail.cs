using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AppBackend.Models
{
    public partial class EmployeeDetail
    {
        [Key]
        public int EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
        public string? Designation { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
    }
}
