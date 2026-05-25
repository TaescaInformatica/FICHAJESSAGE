using Microsoft.Data.SqlClient;

namespace FichajeTAESCA.Data;

public sealed class SqlConnectionFactory : IDbConnectionFactory
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<SqlConnectionFactory> _logger;

    public SqlConnectionFactory(IConfiguration configuration, ILogger<SqlConnectionFactory> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<SqlConnection> CreateOpenConnectionAsync(CancellationToken cancellationToken = default)
    {
        string? connectionString = _configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            _logger.LogError("La cadena de conexion DefaultConnection no esta configurada.");
            throw new DatabaseConfigurationException("La conexion a SQL Server no esta configurada.");
        }

        ValidateConnectionString(connectionString);

        var connection = new SqlConnection(connectionString);

        try
        {
            await connection.OpenAsync(cancellationToken);
            return connection;
        }
        catch (Exception ex) when (ex is SqlException or InvalidOperationException)
        {
            await connection.DisposeAsync();
            _logger.LogError(ex, "No se pudo abrir la conexion SQL configurada en DefaultConnection.");
            throw new DatabaseConnectionException("No se ha podido conectar con SQL Server.", ex);
        }
    }

    private void ValidateConnectionString(string connectionString)
    {
        SqlConnectionStringBuilder builder;

        try
        {
            builder = new SqlConnectionStringBuilder(connectionString);
        }
        catch (ArgumentException ex)
        {
            _logger.LogError(ex, "La cadena de conexion DefaultConnection no tiene un formato valido.");
            throw new DatabaseConfigurationException("La cadena de conexion a SQL Server no es valida.");
        }

        if (HasPlaceholder(builder.DataSource, "SERVIDOR_SQL")
            || HasPlaceholder(builder.InitialCatalog, "NOMBRE_BD")
            || HasPlaceholder(builder.UserID, "USUARIO")
            || HasPlaceholder(builder.Password, "CONTRASENA"))
        {
            _logger.LogError("La cadena de conexion DefaultConnection mantiene valores de plantilla.");
            throw new DatabaseConfigurationException("La conexion a SQL Server mantiene valores de plantilla.");
        }
    }

    private static bool HasPlaceholder(string? value, string placeholder)
    {
        return !string.IsNullOrWhiteSpace(value)
            && value.Contains(placeholder, StringComparison.OrdinalIgnoreCase);
    }
}
