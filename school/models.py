from django.db import models
from django.utils import timezone


class User(models.Model):
    id = models.AutoField(primary_key=True)
    userType = models.IntegerField()
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=10)
    fullName = models.CharField(max_length=50)
    contact = models.CharField(max_length=10)
    email = models.EmailField(max_length=50)
    address = models.CharField(max_length=100)
    parentId = models.IntegerField(default=0)

    class Meta:
        db_table = 'User'

class Marks(models.Model):
    id = models.AutoField(primary_key=True)
    marks = models.IntegerField(null=True)
    semester = models.IntegerField()
    studentId = models.ForeignKey(User)
    subjectName = models.CharField(max_length=50)

    class Meta:
        db_table = 'Marks'

class Attendence(models.Model):
    id = models.AutoField(primary_key=True)
    studentId = models.ForeignKey(User)
    date = models.DateField(default=timezone.now())
    isPresent = models.IntegerField(default=1)

    class Meta:
        db_table = 'Attendence'

class TeacehrSubjectMapping(models.Model):
    id = models.AutoField(primary_key=True)
    teacherId = models.ForeignKey(User)
    semester = models.IntegerField()
    subject = models.CharField(max_length=50)

    class Meta:
        db_table = 'TeacehrSubjectMapping'


