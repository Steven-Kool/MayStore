from django.contrib import admin
from .models import Item

class itemAdmin(admin.ModelAdmin):
    list_display = ('formatted_name', 'formatted_quantity', 'formatted_price', 'display_status')

    def formatted_name(self, obj):
        return f"{obj.name}"
    
    formatted_name.short_description = 'name'

    def formatted_quantity(self, obj):
        return f"{obj.quantity}"
    
    formatted_quantity.short_description = 'quantity'
    
    def formatted_price(self, obj):
        return f"{obj.price}Ks"
    
    formatted_price.short_description = 'price'

admin.site.register(Item, itemAdmin)
