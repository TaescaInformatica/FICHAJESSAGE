namespace FichajeTAESCA.Data;

public class DatabaseConfigurationException : Exception
{
    public DatabaseConfigurationException(string message)
        : base(message)
    {
    }
}

public class DatabaseConnectionException : Exception
{
    public DatabaseConnectionException(string message, Exception? innerException = null)
        : base(message, innerException)
    {
    }
}
