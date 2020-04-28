using System;
using System.Collections.Generic;

namespace NetMysql.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RoleId { get; set; }

        public virtual Role Role { get; set; }
    }
}
