from school.serializers import UserSerializer
from school.serializers import MarksSerializer
from school.models import User
from school.models import Marks
from school.models import Attendence
from school.models import TeacehrSubjectMapping
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
import dateutil.parser
import json

@csrf_exempt
def login(request):
    uname = request.POST.get("uname")
    password = request.POST.get("password")

    userObj = User.objects.get(username=uname, password=password)
    return JsonResponse(UserSerializer(userObj).data)


@csrf_exempt
def signup(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    fullName = request.POST.get("fullName")
    contact = request.POST.get("contact")
    email = request.POST.get("email")
    address = request.POST.get("address")
    userType = request.POST.get("userType")
    parentId = request.POST.get("parentId")

    User.objects.create(username=username, password=password, fullName=fullName,
                        contact=contact, email=email, address=address, userType=userType,
                        parentId=parentId)
    # if userObj.userType == 2:
    #     User.objects.filter(id__in=studentIdList).update(
    #         parentId_id=userObj.id)
    return HttpResponse(1)


@csrf_exempt
def userList(request):
    userType = request.POST.get("userType")
    userObj = User.objects.filter(userType=userType)
    return JsonResponse({'data': UserSerializer(userObj, many=True).data})


@csrf_exempt
def marksList(request):
    userId = request.POST.get("userId")
    userObj = Marks.objects.filter(studentId_id=userId)
    return JsonResponse({'data': MarksSerializer(userObj, many=True).data})


@csrf_exempt
def teacherMapping(request):
    semester = request.POST.get("semester")
    subject = request.POST.get("subject")
    teacherId = request.POST.get("teacherId")

    TeacehrSubjectMapping.objects.create(
        teacherId_id=teacherId, semester=semester, subject=subject)
    return HttpResponse(1)


@csrf_exempt
def addMarks(request):
    marks = request.POST.get("marks")
    studentId = request.POST.get("studentId")
    subjectName = request.POST.get("subjectName")
    semester = request.POST.get("semester")

    Marks.objects.create(
        marks=marks, studentId_id=studentId, subjectName=subjectName, semester=semester)
    return HttpResponse(1)


@csrf_exempt
def addAttendance(request):
    studentList = json.loads(request.POST.get('studentList'))
    date = dateutil.parser.parse(request.POST.get('date'))

    print studentList
    print date
    newList = []
    for items in studentList:
        # print(items['u\'studentId'])
        # Attendence.objects.create(studentId_id = items['studentId'], date = date, isPresent = items'isPresent')
        newList.append(Attendence(studentId_id=items['studentId'], isPresent=items['isPresent'], date= date.strftime('20%y-%m-%d')))
    Attendence.objects.bulk_create(newList)
    return HttpResponse(studentList)

@csrf_exempt
def childList(request):
    parentId = request.POST.get("parentId")
    userObj = User.objects.filter(parentId=parentId)
    return JsonResponse({'data': UserSerializer(userObj, many=True).data})

