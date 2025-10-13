from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_contentblock'),
    ]

    operations = [
        migrations.CreateModel(
            name='GalleryImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('page_key', models.CharField(db_index=True, max_length=128, verbose_name='Ключ страницы')),
                ('image', models.ImageField(upload_to='gallery/', verbose_name='Изображение')),
                ('caption', models.CharField(blank=True, default='', max_length=255, verbose_name='Подпись')),
                ('order', models.PositiveIntegerField(default=0, verbose_name='Порядок')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('uploaded_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.adminuser', verbose_name='Кем загружено')),
            ],
            options={
                'verbose_name': 'Изображение галереи',
                'verbose_name_plural': 'Изображения галереи',
                'ordering': ['order', '-created_at'],
            },
        ),
        migrations.AddIndex(
            model_name='galleryimage',
            index=models.Index(fields=['page_key', 'order'], name='app_galler_page_ke_6d3b23_idx'),
        ),
    ]


