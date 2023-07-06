from django.db import models

class invertedBooleanField(models.BooleanField):
    def to_python(self, value):
        if value in (True, 'True', 't', '1', 1):
            return False
        if value in (False, 'False', 'f', '0', 0):
            return True
        return super().to_python(value)

class Item(models.Model):
    name = models.CharField(max_length=220, blank=False, null=False)
    type = models.CharField(max_length=50, choices=(('L-l', 'Local-liquor'), ('F-l', 'Foreign-liquor'), ('D', 'Drink')), blank=False, null=False)
    quantity = models.CharField(max_length=50, choices=(('90ml', '90ml'), ('175ml', '175ml'), ('350ml', '350ml'), ('700ml', '700ml'), ('1l', '1l')), blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    stock_condition = models.BooleanField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        self.name = self.name.upper()

        if isinstance(self.price, int):
            self.price = f"{self.price}.00"
        
        if self.quantity is None:
            self.quantity = "--"

        super().save(*args, **kwargs)

    @property
    def display_status(self):
        if self.stock_condition:
            return "Out Of Stock"
        else:
            return "In Stock"
    
    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} : {self.price} | {self.stock_condition}"
    
    def json(self):
        return {
            'name': self.name,
            'type': self.type,
            'quantity': self.quantity,
            'price': self.price,
            'condition': self.stock_condition,
        }
