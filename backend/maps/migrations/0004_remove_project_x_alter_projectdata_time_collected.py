# Generated by Django 4.0.3 on 2022-05-06 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0003_project_x'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='x',
        ),
        migrations.AlterField(
            model_name='projectdata',
            name='time_collected',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]