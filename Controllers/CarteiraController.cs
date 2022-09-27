using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Data.SqlClient;

namespace info_invest.Controllers;

public class Investimento {
    public string? cliente { get; set; }
    public string? ativo { get; set; }
    public string? grupo { get; set; }
    public int quantidade { get; set; }
    public double valor { get; set; }
}

[ApiController]
[Route("[controller]")]
public class CarteiraController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(string[] s)
    {
        List<Investimento> resposta;
        Console.WriteLine("Receiving from Angular front-end: " + s[0] + " " + s[1]);
        resposta = leBanco(string.Format(@"SELECT * FROM {0} WHERE CONVERT(VARCHAR, cliente) = '{1}'", s[0], s[1]));
        Console.WriteLine(string.Format(@"SELECT * FROM {0} WHERE cliente = '{1}'", s[0], s[1]));
        Console.WriteLine("Respondendo: " + resposta.ToArray().Length.ToString());
        return Ok(resposta.ToArray());
    }

    List<Investimento> leBanco(string cmd) {
        List<Investimento> result = new List<Investimento>();
        SqlConnectionStringBuilder sqlbuilder = new SqlConnectionStringBuilder();
        sqlbuilder.ConnectionString="Data Source=info-invest-server.database.windows.net,1433;Initial Catalog=info-invest-db;User ID=infoinvestadmin;Password=Inf0inv&sT";
        using (SqlConnection conn = new SqlConnection(sqlbuilder.ConnectionString))
        {
            conn.Open();
            using (var command = conn.CreateCommand()) {
                command.CommandText = cmd;
                using (var reader = command.ExecuteReader()) {
                    while (reader.Read()) {
                        result.Add(new Investimento {
                            cliente = reader.GetString(0),
                            ativo = reader.GetString(1),
                            grupo = reader.GetString(2),
                            quantidade = reader.GetInt32(3),
                            valor = reader.GetDouble(4)
                        });
                    }
                }
            }
            conn.Close();
        }
        return result;
    }
}