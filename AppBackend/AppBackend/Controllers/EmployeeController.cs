using AppBackend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace appbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class EmployeeDetailsController : ControllerBase
    {
        private EmployeeManagementDBContext _context;

        public EmployeeDetailsController(EmployeeManagementDBContext context)
        {
            _context = context;
        }
        // GET: api/EmployeeDetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDetail>>> GetEmployeeDetails()
        {
            return await _context.EmployeeDetails.ToListAsync();
        }

        // GET: api/EmployeeDetail/id
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDetail>> GetEmployeeDetail(int id)
        {
            var EmployeeDetail = await _context.EmployeeDetails.FindAsync(id);

            if (EmployeeDetail == null)
            {
                return NotFound();
            }

            return EmployeeDetail;
        }

        // PUT: api/EmployeeDetail/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeDetail(int id, EmployeeDetail EmployeeDetail)
        {
            if (id != EmployeeDetail.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(EmployeeDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/EmployeeDetail
        [HttpPost]
        public async Task<ActionResult<EmployeeDetail>> PostEmployeeDetail(EmployeeDetail EmployeeDetail)
        {
            _context.EmployeeDetails.Add(EmployeeDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeDetail", new { id = EmployeeDetail.EmployeeId }, EmployeeDetail);
        }

        // DELETE: api/EmployeeDetail/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeDetail(int id)
        {
            var EmployeeDetail = await _context.EmployeeDetails.FindAsync(id);
            if (EmployeeDetail == null)
            {
                return NotFound();
            }

            _context.EmployeeDetails.Remove(EmployeeDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeDetailExists(int id)
        {
            return _context.EmployeeDetails.Any(e => e.EmployeeId == id);
        }
    }
}