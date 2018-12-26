from school.serializers import UserSerializer
from school.models import User
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def login(request):
    uname = request.POST.get("uname")
    password = request.POST.get("password")

    try:
        userObj = User.objects.get(username=uname, password=password)
        return JsonResponse(UserSerializer(userObj).data)
    except:
        return JsonResponse({'status': 201})


@csrf_exempt
def signup(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    fullName = request.POST.get("fullName")
    contact = request.POST.get("contact")
    email = request.POST.get("email")
    address = request.POST.get("address")
    userType = request.POST.get("userType")
    studentIdList = request.POST.get("studentIdList", [])


    try:
        userObj = User.objects.create(username=username, password=password, fullName=fullName,
                            contact=contact, email=email, address=address, userType=userType)
        if userObj.userType ==2 :
            User.objects.filter(id__in = studentIdList).update(parentId_id=userObj.id) 

        return HttpResponse(1)
    except:
         return JsonResponse({'status': 201})
