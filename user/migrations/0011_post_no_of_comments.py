# Generated by Django 5.0.2 on 2024-03-12 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0010_alter_post_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='no_of_comments',
            field=models.IntegerField(default=0),
        ),
    ]
