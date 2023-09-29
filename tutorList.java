package onlineTutoring;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class tutorList {

	public static void main(String[] args) {
		/*
		Connection conn = null;
		try {
			conn = (Connection)DriverManager.getConnection("jdbc:mysql://localhost:3306/Test_Schema", "admin", "NotCardGame1");
			
			if(conn!=null) {
				System.out.println("Connected succesfully to database");
			}
		}catch(Exception e)
		{
			System.out.println("Failed to connect to database");
		}
		

	}
	*/
		String jdbcUrl = "jdbc:mysql://localhost:3306/Test_Schema";
        String username = "admin";
        String password = "NotCardGame1";

        try {
            Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
            System.out.println("Connected successfully to the database");
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
            System.err.println("Error connecting to the database: " + e.getMessage());
        }
        
	}

}
