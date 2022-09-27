using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Data.SqlClient;

namespace info_invest.Controllers;

[ApiController]
[Route("[controller]")]
public class dbController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(string[] cmd)
    {
        List<string> r = new List<string>();
        Console.WriteLine(string.Format("cmd from front-end: {0}", cmd[0]));
        if (cmd[1] == "w") {
            wDB(cmd[0]);
            r.Append("OK");
        } else if (cmd[1] == "r") {
            r = rDB(cmd[0]);
        }
        Console.WriteLine("returning...:");
        //Console.WriteLine(r.ToString());
        return Ok(r.ToArray());
    }

    void wDB(String cmd) {

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

    List<string> rDB(string cmd) {
        List<string> result = new List<string>();
        SqlConnectionStringBuilder sqlbuilder = new SqlConnectionStringBuilder();
        sqlbuilder.ConnectionString="Data Source=info-invest-server.database.windows.net,1433;Initial Catalog=info-invest-db;User ID=infoinvestadmin;Password=Inf0inv&sT";
        using (SqlConnection conn = new SqlConnection(sqlbuilder.ConnectionString))
        {
            conn.Open();
            using (var command = conn.CreateCommand()) {
                command.CommandText = cmd;
                using (var reader = command.ExecuteReader()) {
                    Console.WriteLine(string.Format("reader FieldCount: {0}", reader.FieldCount));
                    while (reader.Read()) {
                        for (int i = 0; i < reader.FieldCount; i++) {
                            //Console.WriteLine(string.Format("reader GetString: {0}", reader.GetString(i)));
                            Console.WriteLine(string.Format("format>>>>   {0}", reader.GetDataTypeName(i)));
                            if (reader.GetDataTypeName(i) == "float") result.Add(reader.GetDouble(i).ToString());
                            else result.Add(reader.GetString(i));
                        }
                    }
                }
            }
            conn.Close();
        }
        return result;
    }
}