using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Data.SqlClient;

namespace info_invest.Controllers;

public class Gerente {
    public string? nome { get; set; }
    public string? idade { get; set; }
}

[ApiController]
[Route("[controller]")]
public class GerentesController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(Gerente gerente)
    {
        Console.WriteLine("Receiving from Angular front-end: " + string.Format("INSERT INTO gerentes values('{0}','{1}')", gerente.nome, gerente.idade));
        escreveGerente(string.Format("INSERT INTO gerentes values('{0}','{1}')", gerente.nome, gerente.idade));
        return Ok();
    }

    [HttpGet]
    public IEnumerable<Gerente> Get()
    {
        return leGerente(@"SELECT * FROM gerentes;");
    }

    Gerente[] leGerente(string cmd) {
        List<Gerente> result = new List<Gerente>();
        SqlConnectionStringBuilder sqlbuilder = new SqlConnectionStringBuilder();
        sqlbuilder.ConnectionString="Data Source=info-invest-server.database.windows.net,1433;Initial Catalog=info-invest-db;User ID=infoinvestadmin;Password=Inf0inv&sT";
        using (SqlConnection conn = new SqlConnection(sqlbuilder.ConnectionString))
        {
            conn.Open();
            using (var command = conn.CreateCommand()) {
                command.CommandText = cmd;
                using (var reader = command.ExecuteReader()) {
                    while (reader.Read()) {
                        result.Add(new Gerente {
                            nome = reader.GetString(0),
                            idade = reader.GetString(1)
                        });
                    }
                }
            }
            conn.Close();
        }
        return result.ToArray();
    }

    void escreveGerente(String cmd) {

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