using Microsoft.EntityFrameworkCore;
using NetMysql.Models;

public static class ModelBuilderExtension
{
    public static void Seed(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>().HasData(
            new Role{
                Id = 1,
                Name = "Administrador"                                
            },
            new Role{
                Id = 2,
                Name = "Invitado"                                
            },
            new Role{
                Id = 3,
                Name = "Supervisor"                                
            }
        );

        modelBuilder.Entity<User>().HasData(
            new User{
                Id = 1,
                Name = "Elkin",
                Password = "123456",
                RoleId = 1
            }
        );
    }
}