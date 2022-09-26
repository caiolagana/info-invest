using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

namespace info_invest.Controllers;

[ApiController]
[Route("[controller]")]
public class ComprarController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(Investimento investimento)
    {
        Console.WriteLine("Receiving from Angular front-end: " + string.Format("{0}", investimento.ativo));
        escreveInvestimento(string.Format("INSERT INTO {0} values('{1}','{2}','{3}','{4}', '{5}')", investimento.grupo, investimento.cliente, investimento.ativo, investimento.grupo, investimento.quantidade, investimento.valor));
        return Ok();
    }

    void escreveInvestimento(String cmd) {

    //Connect to Azure SQL DB
    //SqlConnectionStringBuilder sqlbuilder = new SqlConnectionStringBuilder();
    //sqlbuilder.ConnectionString="Data Source=info-invest-server.database.windows.net,1433;Initial Catalog=info-invest-db;User ID=infoinvestadmin;Password=Inf0inv&sT";
    //using (SqlConnection connection = new SqlConnection(sqlbuilder.ConnectionString)) { ... }

    using (var conn = new SqliteConnection(@"Data Source=sqlite-info-invest.db"))
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