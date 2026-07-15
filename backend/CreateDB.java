import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class CreateDB {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/postgres";
        String user = "postgres";
        String pass = "0006";

        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {
            
            System.out.println("Connected to PostgreSQL server.");
            stmt.executeUpdate("CREATE DATABASE accessaudit");
            System.out.println("Database 'accessaudit' created successfully.");
            
        } catch (Exception e) {
            System.err.println("Error creating database: " + e.getMessage());
        }
    }
}
