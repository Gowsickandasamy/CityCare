from django.db import transaction
from .models import Complaint
from officers.models import Officer
from django.core.exceptions import ObjectDoesNotExist

def create_complaint(user, title, description, area_name, location_link):
    with transaction.atomic():
        officer = Officer.objects.filter(area_of_control=area_name).first()
        
        if officer is None:
            print(f"No officer found for area '{area_name}'")
            return {"error": f"No officer found for area '{area_name}'"}
        
        admin = officer.reports_to if officer.reports_to else None

        print(f"Creating complaint for officer: {officer}, User: {user}")

        complaint = Complaint.objects.create(
            user=user,
            officer=officer.user,
            admin=admin,
            title=title,
            description=description,
            area_name=area_name,
            location_link=location_link
        )
        
        print(f"Complaint created: {complaint}")
        return {"complaint": complaint}