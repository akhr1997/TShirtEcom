from django.http.response import JsonResponse
from django.shortcuts import render

# Create your views here.

def home(request):
    return JsonResponse({
        'info': 'Reacy Django course',
        'name': 'Ashwin Kumar'
    })
