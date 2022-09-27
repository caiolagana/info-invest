using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Data.SqlClient;

namespace info_invest.Controllers;

public class Cliente {
    public string? nome { get; set; }
    public int? idade { get; set; }
    public float? saldo {get; set; }
}

[ApiController]
[Route("[controller]")]
public class ClientesController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(Cliente cliente)
    {
        Console.WriteLine("Receiving from Angular front-end: " + string.Format("INSERT INTO clientes values('{0}','{1}', '0')", cliente.nome, cliente.idade));
        escreveCliente(string.Format("INSERT INTO clientes values('{0}','{1}', '0')", cliente.nome, cliente.idade));
        return Ok();
    }

    [HttpGet]
    public IEnumerable<Cliente> Get()
    {
        return leCliente(@"SELECT * FROM [dbo].[Clientes];");
    }

    Cliente[] leCliente(string cmd) {
        List<Cliente> result = new List<Cliente>();
        //using (var conn = new SqliteConnection(@"Data Source=sqlite-info-invest.db")) 
        SqlConnectionStringBuilder sqlbuilder = new SqlConnectionStringBuilder();
        sqlbuilder.ConnectionString="Data Source=info-invest-server.database.windows.net,1433;Initial Catalog=info-invest-db;User ID=infoinvestadmin;Password=Inf0inv&sT";
        using (SqlConnection conn = new SqlConnection(sqlbuilder.ConnectionString))
        {
            conn.Open();
            using (var command = conn.CreateCommand()) {
                command.CommandText = cmd;
                using (var reader = command.ExecuteReader()) {
                    while (reader.Read()) {
                        result.Add(new Cliente {
                            nome = reader.GetString(0),
                            idade = reader.GetInt16(1),
                            saldo = reader.GetFloat(2)
                        });
                    }
                }
            }
            conn.Close();
        }
        return result.ToArray();
    }

    void escreveCliente(String cmd) {

    //using (var conn = new SqliteConnection(@"Data Source=sqlite-info-invest.db"))
    SqlConnectionStringBuilder sqlbuilder = new SqlConnectionStringBuilder();
    sqlbuilder.ConnectionString="Data Source=info-invest-server.database.windows.net,1433;Initial Catalog=info-invest-db;User ID=infoinvestadmin;Password=Inf0inv&sT";
    using (SqlConnection conn = new SqlConnection(sqlbuilder.ConnectionString))
    {
        conn.Open();
        using (var command = conn.CreateCommand()) {
            command.CommandText = @cmd;
            command.ExecuteNonQuery();
        }
        conn.Close();
    }
}
}