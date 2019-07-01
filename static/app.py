from flask import Flask, render_template, request
from flask_mysqldb import MySQL
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import Email, Length, InputRequired

app = Flask(__name__)

app.config['SECRET_KEY'] = '123'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'cool_shivansh'
app.config['MYSQL_DB'] = '90skid'

mysql = MySQL(app)

class RegForm(FlaskForm):
	name = StringField('name',  validators=[InputRequired(), Length(max=30)])
	email = StringField('email',  validators=[InputRequired(), Email(message='Invalid email'), Length(max=30)])
	favCart = StringField('name',  validators=[InputRequired(), Length(max=30)])
	favShow = StringField('name',  validators=[InputRequired(), Length(max=30)])

@app.route('/', methods=['GET'])
def index():
	return render_template('home.html')

@app.route('/success', methods=['POST'])
def success():
	form = RegForm()
	if request.method == "POST":
		details = request.form
		name = details['name']
		email = details['email']
		favCart = details['favCart']
		favShow = details['favShow']
		if form.validate():
			cur = mysql.connection.cursor()
			cur.execute("INSERT INTO data(name,email,favCar,favTV) VALUES (%s, %s,%s,%s)", (name,email,favCart,favShow))
			mysql.connection.commit()
			cur.close()
		return render_template('success.html',name=name)

@app.route('/quiz', methods=['GET'])
def quiz():
	return render_template('quiz.html')

if __name__ == '__main__':
    app.run(debug='True')
