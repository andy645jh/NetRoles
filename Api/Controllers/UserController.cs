using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetMysql.Models;

namespace NetMysql.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private BdRolesContext _bdRolesContext = new BdRolesContext();
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_bdRolesContext.User.Include(u => u.Role));
        }

        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {            
            
            if(!this.ModelState.IsValid){
                return BadRequest("Error de Model");
            }

            var role = _bdRolesContext.Role.Find( user.RoleId );
            user.Role = role;

            _bdRolesContext.User.Add(user);
            _bdRolesContext.SaveChanges();            
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {            
            if(!this.ModelState.IsValid){
                return BadRequest();
            }

            var user = _bdRolesContext.User.Find(id);            
            _bdRolesContext.Remove(user);               
            _bdRolesContext.SaveChanges();            
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] User user)
        {            
            var up = _bdRolesContext.User.Find(id);
            if(up == null){
                return Ok("Salio vacio el id: "+id);
            }else{
                up.Name = user.Name;  
                var role = _bdRolesContext.Role.Find( user.RoleId );
                up.Role = role;
                up.RoleId = user.RoleId;     

                _bdRolesContext.SaveChanges();
                return Ok(up);
            }
        }
    }    
}