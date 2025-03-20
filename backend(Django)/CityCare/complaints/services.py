from django.db import transaction
from .models import Complaint
from officers.models import Officer
from django.core.exceptions import ObjectDoesNotExist

def create_complaint(user, title, description, area_name, location_link):
    with transaction.atomic():
        # Attempt to retrieve the officer for the given area
        officer = Officer.objects.filter(area_of_control=area_name).first()
        
        if officer is None:
            print(f"No officer found for area '{area_name}'")
            return {"error": f"No officer found for area '{area_name}'"}
        
        print(f"Creating complaint for officer: {officer}, User: {user}")

        complaint = Complaint.objects.create(
            user=user,
            officer=officer.user,
            title=title,
            description=description,
            area_name=area_name,
            location_link=location_link
        )
        
        print(f"Complaint created: {complaint}")
        return {"complaint": complaint}