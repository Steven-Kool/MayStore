from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
    path('', views.index, name='index'),
    path('item-lists/', views.list_view, name='list_view'),
    path('item-lists/search-result/', views.search_result, name='search_result'),
    # json file sending
    path('filter/', views.Json, name='json_response'),
]
