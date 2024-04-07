import json
import psycopg2

# Establish a connection to your PostgreSQL server
conn = psycopg2.connect(
    host="your_postgresql_host",
    database="your_database_name",
    user="your_username",
    password="your_password"
)

cur = conn.cursor()

def insert_json_to_postgres(table_name, json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)

    for item in data:
        query = f"INSERT INTO {table_name} (name, description, price, drink_type, ingredients) VALUES (%s, %s, %s, %s, %s)"
        values = (item['name'], item['description'], item['price'], item['drink_type'], json.dumps(item['ingredients']))
        cur.execute(query, values)

    conn.commit()
    print(f"Data from {json_file} has been inserted into the {table_name} table.")

# Call the function with your JSON file and table name
insert_json_to_postgres('your_table_name', 'path/to/your/json/file.json')

conn.close()


json_file = "drinks.json"
table_name = "drinks"
insert_json_to_postgres(table_name, json_file)
