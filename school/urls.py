"""school URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from school.views import html_view
from school.api import login
from school.api import signup
from school.api import userList
from school.api import teacherMapping
from school.api import addMarks
from school.api import marksList
from school.api import addAttendance
from school.api import childList

urlpatterns = [
    url(r'^abc/', html_view),
    url(r'^loginUser/$', login),
    url(r'^signup/$', signup),
    url(r'^userList/$', userList),
    url(r'^teacher-mapping/$', teacherMapping),
    url(r'^add-marks/$', addMarks),
    url(r'^marks-list/$', marksList),
    url(r'^add-attendence/$', addAttendance),
    url(r'^childs/$', childList),
]
