namespace FichajeTAESCA.Services;

public sealed record FichajeResult(bool EsError, string Mensaje)
{
    public static FichajeResult Error(string mensaje) => new(true, mensaje);

    public static FichajeResult Ok(string mensaje) => new(false, mensaje);
}
