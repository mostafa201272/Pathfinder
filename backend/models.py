# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class CameraFrame(models.Model):
    camera_frame_id = models.BigAutoField(primary_key=True)
    project = models.ForeignKey('Project', models.DO_NOTHING)
    frame = models.BinaryField()

    class Meta:
        managed = False
        db_table = 'Camera_Frame'


class Project(models.Model):
    project_id = models.BigAutoField(primary_key=True)
    project_name = models.CharField(max_length=100)
    project_status = models.CharField(max_length=50)
    control_type = models.CharField(max_length=50)
    last_updated = models.DateTimeField(blank=True, null=True)
    map = models.TextField(blank=True, null=True)  # This field type is a guess.
    user = models.ForeignKey('User', models.DO_NOTHING)
    robot = models.ForeignKey('Robot', models.DO_NOTHING)
    project_address = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Project'


class ProjectData(models.Model):
    project_data_id = models.BigAutoField(primary_key=True)
    project = models.ForeignKey(Project, models.DO_NOTHING)
    x_position = models.DecimalField(max_digits=10, decimal_places=5)
    y_position = models.DecimalField(max_digits=10, decimal_places=5)
    angle = models.DecimalField(max_digits=10, decimal_places=5)
    speed = models.DecimalField(max_digits=10, decimal_places=5)
    temperature = models.DecimalField(max_digits=10, decimal_places=5)
    humidity = models.DecimalField(max_digits=10, decimal_places=5)
    gas_type = models.CharField(max_length=100, blank=True, null=True)
    gas_reading = models.DecimalField(max_digits=15, decimal_places=5, blank=True, null=True)
    control_type = models.CharField(max_length=50)
    time_collected = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'Project_Data'


class Robot(models.Model):
    robot_id = models.BigAutoField(primary_key=True)
    robot_name = models.CharField(max_length=50)
    robot_status = models.CharField(max_length=50)
    robot_image = models.BinaryField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Robot'


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    f_name = models.CharField(max_length=50)
    l_name = models.CharField(max_length=50)
    email = models.CharField(max_length=500, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    username = models.CharField(max_length=50)
    password = models.TextField()
    user_image = models.BinaryField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'User'
