from django.shortcuts import render

def html_view(request):
    return render(request, 'index.html')