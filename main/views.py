from django.shortcuts import render
from .models import Item
from django.http import JsonResponse
import urllib.parse

def index(request):
    context = {'items': Item.objects.filter(stock_condition=False)}
    return render(request, 'main/index.html', context)

def list_view(request):
    return render(request, 'main/list_view.html')

def search_result(request):
    keyword = request.GET.get('keyword') if request.GET.get('keyword') != None else ''
    items = Item.objects.filter(name__icontains=keyword)
    context = {
        'keyword': keyword,
        'items': items
        }
    return render(request, 'main/search_result.html', context)

def Json(request):
    items = Item.objects.all()
    data = [item.json() for item in items]
    response = {'item': data}

    return JsonResponse(response)

