using FichajeTAESCA.Data;
using Microsoft.Data.SqlClient;

namespace FichajeTAESCA.Services;

public sealed class FichajeService : IFichajeService
{
    private readonly IDbConnectionFactory _connectionFactory;
    private readonly ILogger<FichajeService> _logger;

    public FichajeService(IDbConnectionFactory connectionFactory, ILogger<FichajeService> logger)
    {
        _connectionFactory = connectionFactory;
        _logger = logger;
    }

    public async Task<FichajeResult> RegistrarFichajeAsync(
        string codigoOperario,
        bool teletrabajo,
        CancellationToken cancellationToken = default)
    {
        try
        {
            await using SqlConnection connection = await _connectionFactory.CreateOpenConnectionAsync(cancellationToken);

            string? siguienteMovimiento = await ObtenerSiguienteMovimientoDelDiaAsync(
                connection,
                codigoOperario,
                cancellationToken);

            if (siguienteMovimiento is null)
            {
                return FichajeResult.Error($"Ya existen los fichajes completos de hoy para el operario {codigoOperario}.");
            }

            string nombreOperario = await ObtenerNombreOperarioAsync(connection, codigoOperario, cancellationToken)
                ?? $"operario {codigoOperario}";

            DateTime fechaHoraFichaje = await GuardarMovimientoAsync(
                connection,
                codigoOperario,
                siguienteMovimiento,
                teletrabajo,
                cancellationToken);

            string mensaje = CrearMensajeFichaje(siguienteMovimiento, nombreOperario, fechaHoraFichaje);

            return FichajeResult.Ok(mensaje);
        }
        catch (DatabaseConfigurationException ex)
        {
            _logger.LogError(ex, "Configuracion de base de datos incompleta.");
            return FichajeResult.Error("La conexion a la base de datos no esta configurada. Revise appsettings.json o la configuracion del servidor.");
        }
        catch (DatabaseConnectionException ex)
        {
            _logger.LogError(ex, "Fallo al conectar con la base de datos.");
            return FichajeResult.Error("No se ha podido conectar con la base de datos. Revise servidor, base de datos y credenciales.");
        }
        catch (SqlException ex)
        {
            _logger.LogError(ex, "Error SQL al registrar el fichaje del operario {CodigoOperario}.", codigoOperario);
            return FichajeResult.Error("No se ha podido registrar el fichaje por un error en la base de datos. Avise al administrador.");
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Error ejecutando la consulta de fichaje para el operario {CodigoOperario}.", codigoOperario);
            return FichajeResult.Error("No se ha podido registrar el fichaje por un error en la base de datos. Avise al administrador.");
        }
    }

    private static async Task<string?> ObtenerSiguienteMovimientoDelDiaAsync(
        SqlConnection connection,
        string codigoOperario,
        CancellationToken cancellationToken)
    {
        const string sql = """
            SELECT TOP 2 TipoMovimiento
            FROM GF_FichajesEmpleados
            WHERE CodigoOperario = @CodigoOperario
              AND CAST(FechaHora AS date) = CAST(GETDATE() AS date)
            ORDER BY FechaHora ASC
            """;

        await using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@CodigoOperario", codigoOperario);

        await using SqlDataReader reader = await command.ExecuteReaderAsync(cancellationToken);

        List<string> movimientosHoy = [];

        while (await reader.ReadAsync(cancellationToken))
        {
            movimientosHoy.Add(reader["TipoMovimiento"].ToString() ?? string.Empty);
        }

        if (movimientosHoy.Count == 0)
        {
            return "FICHAR";
        }

        if (movimientosHoy.Count == 1 && movimientosHoy[0] == "FICHAR")
        {
            return "DESFICHAR";
        }

        return null;
    }

    private static async Task<string?> ObtenerNombreOperarioAsync(
        SqlConnection connection,
        string codigoOperario,
        CancellationToken cancellationToken)
    {
        const string sql = """
            SELECT TOP 1 NombreOperario
            FROM Operarios
            WHERE Operario = TRY_CONVERT(int, @CodigoOperario)
              AND (FechaBaja IS NULL OR FechaBaja > GETDATE())
            ORDER BY CodigoEmpresa ASC
            """;

        await using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@CodigoOperario", codigoOperario);

        object? result = await command.ExecuteScalarAsync(cancellationToken);
        string? nombreOperario = result?.ToString();

        return string.IsNullOrWhiteSpace(nombreOperario)
            ? null
            : nombreOperario.Trim();
    }

    private static async Task<DateTime> GuardarMovimientoAsync(
        SqlConnection connection,
        string codigoOperario,
        string tipoMovimiento,
        bool teletrabajo,
        CancellationToken cancellationToken)
    {
        const string sql = """
            INSERT INTO GF_FichajesEmpleados (CodigoOperario, TipoMovimiento, FechaHora, GF_TipoFichaje)
            OUTPUT INSERTED.FechaHora
            VALUES (@CodigoOperario, @TipoMovimiento, GETDATE(), @GF_TipoFichaje)
            """;

        int gfTipoFichaje = teletrabajo ? -1 : 0;

        await using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@CodigoOperario", codigoOperario);
        command.Parameters.AddWithValue("@TipoMovimiento", tipoMovimiento);
        command.Parameters.AddWithValue("@GF_TipoFichaje", gfTipoFichaje);

        object? result = await command.ExecuteScalarAsync(cancellationToken);

        return result is DateTime fechaHora
            ? fechaHora
            : DateTime.Now;
    }

    private static string CrearMensajeFichaje(string tipoMovimiento, string nombreOperario, DateTime fechaHoraFichaje)
    {
        if (tipoMovimiento == "FICHAR")
        {
            return $"Hola {nombreOperario}.";
        }

        if (fechaHoraFichaje.DayOfWeek == DayOfWeek.Friday)
        {
            return $"Adi\u00f3s {nombreOperario}. Buen fin de semana.";
        }

        return $"Adi\u00f3s {nombreOperario}, ten un buen d\u00eda.";
    }
}
