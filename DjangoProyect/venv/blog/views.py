from django.http import Http404
from django.shortcuts import render, HttpResponse
from .models import Post
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .forms import PostForm

# Create your views here.
def post_list(request) -> render: 
    posts = Post.objects.filter(published=True)
    return render(request, 'post/list.html', {'posts': posts})

def post_detail(request, id) -> render:
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        raise Http404("No se ha encontrado la publicacion")
    
    return render(request, 'post/detail.html', {'post':post})

@login_required
def create_post(request) -> render:
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save()
            messages.success(request, "Se creo el post con exito")
            return render(request, 'post/createpost.html', {'new_post':post})
    else:
        form = PostForm()

    return render(request, 'post/createpost.html', {'form': form})

