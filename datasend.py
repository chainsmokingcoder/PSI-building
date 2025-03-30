import psycopg2
import random
import time

# Define connection parameters
host = "localhost"
database = "testingground"
user = "postgres"
password = "antari10"

# Create a connection object
conn = psycopg2.connect(host=host, dbname=database, user=user, password=password)

# Create a cursor object
cur = conn.cursor()

try:
    while True:
        # Generate random numbers for each column
        random_number1 = random.randint(1, 100)
        random_number2 = random.randint(1, 100)
        random_number3 = random.randint(1, 100)
        random_number4 = random.randint(1, 100)

        # Insert the random numbers into the tabel
        query = """
        INSERT INTO tabel (table1, table2, table3, table4)
        VALUES (%s, %s, %s, %s)
        """
        cur.execute(query, (random_number1, random_number2, random_number3, random_number4))
        print(f"Inserted {random_number1}, {random_number2}, {random_number3}, {random_number4} into tabel")

        # Commit the transaction
        conn.commit()

        # Wait for 5 seconds before the next insertion
        time.sleep(1)

except KeyboardInterrupt:
    print("Process interrupted by user.")

finally:
    # Close the cursor and connection
    cur.close()
    conn.close()
 
