from flask import Flask, render_template, request
from flask_mysqldb import MySQL
app = Flask(__name__)


app.config['MYSQL_HOST'] = 'shivanshonline.mysql.pythonanywhere-services.com'
app.config['MYSQL_USER'] = 'shivanshonline'
app.config['MYSQL_PASSWORD'] = 'Renusharma@123'
app.config['MYSQL_DB'] = 'shivanshonline$public_opinion'

mysql = MySQL(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        details = request.form
        name = details['name']
        email = details['email']
        favCart = details['favCart']
        favShow = details['favShow']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO data(name,email,favCar,favTV) VALUES (%s, %s,%s,%s)", (name,email,favCart,favShow))
        mysql.connection.commit()
        cur.close()
        return 'success'
    return render_template('home.html')


if __name__ == '__main__':
    app.run(debug='True')
