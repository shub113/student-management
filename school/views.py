from django.shortcuts import render
from school.models import User

def html_view(request):
    # User.objects.filter(fulName="aadsfas").update(address="sadfsdfdsafsa")
    return render(request, 'index.html')