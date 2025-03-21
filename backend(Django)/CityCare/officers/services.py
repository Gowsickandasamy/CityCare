from django.db import transaction

from authentication_app.models import User
from officers.models import Officer

def create_officer(username, email, phone_number, area_of_control, created_by):
    with transaction.atomic():
        user = User.objects.create_user(
            username = username,
            email = email,
            phone_number = phone_number,
            password = "password",
            role = 'OFFICER'
        )
        
        officer = Officer.objects.create(
            user = user,
            area_of_control = area_of_control,
            reports_to = created_by
        )
        
        return officer
    
def get_all_officer(admin_id):
    with transaction.atomic():
        officers = Officer.objects.filter(reports_to = admin_id)
        return officers
    
def delete_officer(officer_id):
    with transaction.atomic():
        officer = User.objects.get(id=officer_id)
        officer.delete()