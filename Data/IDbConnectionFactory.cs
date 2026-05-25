using Microsoft.Data.SqlClient;

namespace FichajeTAESCA.Data;

public interface IDbConnectionFactory
{
    Task<SqlConnection> CreateOpenConnectionAsync(CancellationToken cancellationToken = default);
}
