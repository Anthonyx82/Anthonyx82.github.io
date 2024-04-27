from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    title = forms.CharField(label='Titulo para el post',max_length=250)
    body = forms.CharField(label='Contenido', widget=forms.Textarea)
    published = forms.BooleanField(label='¿Publicar?', required=False)

    class Meta:
        model = Post
        fields = ['title', 'body', 'published']