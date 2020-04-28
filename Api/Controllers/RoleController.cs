using Microsoft.AspNetCore.Mvc;
using NetMysql.Models;

namespace NetMysql.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RoleController : ControllerBase
    {
        private BdRolesContext _bdRolesContext = new BdRolesContext();
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_bdRolesContext.Role);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Role role)
        {            
            if(!this.ModelState.IsValid){
                return BadRequest();
            }

            _bdRolesContext.Role.Add(role);
            _bdRolesContext.SaveChanges();            
            return Ok(role);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {            
            if(!this.ModelState.IsValid){
                return BadRequest();
            }

            var role = _bdRolesContext.Role.Find(id);            
            _bdRolesContext.Remove(role);               
            _bdRolesContext.SaveChanges();            
            return Ok(role);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Role role)
        {            
            var up = _bdRolesContext.Role.Find(id);
            if(up == null){
                return new NoContentResult();
            }else{
                up.Name = role.Name;                
                _bdRolesContext.SaveChanges();
                return Ok(up);
            }
        }
    }    
}