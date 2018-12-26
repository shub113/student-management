from school.serializers import UserSerializer
from school.models import User
from school.models import TeacehrSubjectMapping
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
        if userObj.userType == 2:
            User.objects.filter(id__in=studentIdList).update(
                parentId_id=userObj.id)

        return HttpResponse(1)
    except:
         return JsonResponse({'status': 201})


@csrf_exempt
def userList(request):
    userType = request.POST.get("userType")
    try:
        userObj = User.objects.filter(userType=userType)
        print userObj
        return JsonResponse({'data': UserSerializer(userObj, many=True).data})
    except:
        return JsonResponse({'status': 201})


@csrf_exempt
def teacherMapping(request):
    semester = request.POST.get("semester")
    subject = request.POST.get("subject")
    teacherId = request.POST.get("teacherId")
    # try:
    TeacehrSubjectMapping.objects.create(
        teacherId_id=teacherId, semester=semester, subject=subject)
    return HttpResponse(1)
    # except:
    #     return JsonResponse({'status': 201})


@csrf_exempt
def addMarks(request):
    marks = request.POST.get("marks")
    studentId = request.POST.get("studentId")
    subjectName = request.POST.get("subjectName")
    try:
        Marks.objects.create(marks, studentId, subjectName)
        return HttpResponse(1)
    except:
        return JsonResponse({'status': 201})
