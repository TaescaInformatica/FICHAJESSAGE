namespace FichajeTAESCA.Services;

public interface IFichajeService
{
    Task<FichajeResult> RegistrarFichajeAsync(
        string codigoOperario,
        bool teletrabajo,
        CancellationToken cancellationToken = default);
}
